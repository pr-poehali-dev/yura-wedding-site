'''
Business: Save RSVP responses to database and send Telegram notifications
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '')
        attendance = body_data.get('attendance', '')
        guests = body_data.get('guests', 1)
        alcohol = body_data.get('alcohol', '')
        message = body_data.get('message', '')
        
        if not name or not attendance:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Name and attendance are required'})
            }
        
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database not configured'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "INSERT INTO rsvp_responses (name, attendance, guests, alcohol, message) VALUES (%s, %s, %s, %s, %s) RETURNING id, created_at",
            (name, attendance, int(guests) if attendance == 'yes' else None, alcohol if attendance == 'yes' else None, message)
        )
        result = cur.fetchone()
        conn.commit()
        
        cur.close()
        conn.close()
        
        send_telegram_notification(name, attendance, guests, alcohol, message)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'id': result['id'],
                'message': 'RSVP saved successfully'
            })
        }
    
    if method == 'GET':
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database not configured'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("SELECT * FROM rsvp_responses ORDER BY created_at DESC LIMIT 100")
        responses = cur.fetchall()
        
        cur.close()
        conn.close()
        
        for response in responses:
            if response.get('created_at'):
                response['created_at'] = response['created_at'].isoformat()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'responses': responses})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }

def send_telegram_notification(name: str, attendance: str, guests: int, alcohol: str, message: str) -> None:
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return
    
    attendance_text = "✅ Придет" if attendance == 'yes' else "❌ Не сможет прийти"
    
    text = f"🎉 Новый ответ на приглашение!\n\n"
    text += f"👤 Имя: {name}\n"
    text += f"📋 Статус: {attendance_text}\n"
    
    if attendance == 'yes':
        text += f"👥 Количество гостей: {guests}\n"
        if alcohol:
            alcohol_names = {
                'red-wine': 'Красное вино',
                'white-wine': 'Белое вино',
                'champagne': 'Шампанское',
                'vodka': 'Водка',
                'whiskey': 'Виски',
                'cognac': 'Коньяк',
                'none': 'Не употребляю'
            }
            text += f"🍷 Предпочтения: {alcohol_names.get(alcohol, alcohol)}\n"
    
    if message:
        text += f"💌 Сообщение: {message}\n"
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()
    
    try:
        req = urllib.request.Request(url, data=data)
        urllib.request.urlopen(req)
    except Exception:
        pass
