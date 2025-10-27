'''
Business: Manage wedding invitations - create, validate, and track invite codes
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import secrets
import string

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
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        guest_name = body_data.get('guest_name', '')
        max_guests = body_data.get('max_guests', 1)
        
        if not guest_name:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Guest name is required'})
            }
        
        invite_code = generate_invite_code()
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "INSERT INTO invitations (guest_name, invite_code, max_guests) VALUES (%s, %s, %s) RETURNING id, invite_code, created_at",
            (guest_name, invite_code, int(max_guests))
        )
        result = cur.fetchone()
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'id': result['id'],
                'invite_code': result['invite_code'],
                'guest_name': guest_name,
                'max_guests': max_guests,
                'invite_url': f'https://yoursite.com/?invite={result["invite_code"]}',
                'created_at': result['created_at'].isoformat()
            })
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        invite_code = params.get('code', '')
        
        if not invite_code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invite code is required'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT * FROM invitations WHERE invite_code = %s AND is_active = true",
            (invite_code,)
        )
        invitation = cur.fetchone()
        
        if not invitation:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid or inactive invitation code', 'valid': False})
            }
        
        cur.execute(
            "UPDATE invitations SET last_accessed_at = CURRENT_TIMESTAMP WHERE invite_code = %s",
            (invite_code,)
        )
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'valid': True,
                'guest_name': invitation['guest_name'],
                'max_guests': invitation['max_guests'],
                'invite_code': invitation['invite_code']
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }

def generate_invite_code(length: int = 12) -> str:
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))
