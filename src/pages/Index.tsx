import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Guest {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Index = () => {
  const { toast } = useToast();
  const [showRSVP, setShowRSVP] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: "Мария и Александр", message: "Поздравляем с предстоящим торжеством! Желаем вам бесконечного счастья!", timestamp: "2025-10-20" },
    { id: 2, name: "Ольга", message: "Любите друг друга и берегите вашу любовь! Совет да любовь! ❤️", timestamp: "2025-10-21" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    guests: "1",
    dietary: "",
    message: "",
  });

  const weddingDate = new Date("2025-12-12T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, укажите ваше имя и ответ о присутствии",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Спасибо за ответ!",
      description: "Мы получили ваше подтверждение ❤️",
    });

    setFormData({
      name: "",
      attendance: "",
      guests: "1",
      dietary: "",
      message: "",
    });
    setShowRSVP(false);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("wishName") as HTMLInputElement;
    const messageInput = form.elements.namedItem("wishMessage") as HTMLTextAreaElement;

    if (!nameInput.value || !messageInput.value) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, укажите имя и поздравление",
        variant: "destructive",
      });
      return;
    }

    const newGuest: Guest = {
      id: Date.now(),
      name: nameInput.value,
      message: messageInput.value,
      timestamp: new Date().toISOString().split('T')[0],
    };

    setGuests([newGuest, ...guests]);
    
    toast({
      title: "Спасибо за поздравление!",
      description: "Ваши теплые слова очень важны для нас ❤️",
    });

    nameInput.value = "";
    messageInput.value = "";
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ 
        backgroundImage: 'url(https://cdn.poehali.dev/files/48c8597e-7100-451d-9557-07b5ccdf230f.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.15
      }}></div>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 z-10">
        
        <div className="text-center relative z-10 animate-fade-in">
          <div className="mb-6 animate-float">
            <span className="text-6xl">💕</span>
          </div>
          <h1 className="font-serif text-7xl md:text-9xl mb-4 text-zinc-900 font-light">
            Юрий & Елена
          </h1>
          <div className="h-px w-32 bg-primary-foreground/30 mx-auto mb-6"></div>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-8">
            12 декабря 2025
          </p>
          <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto mb-12">
            "Любовь долготерпелива, милосердна, любовь не завидует, не превозносится, не гордится"
          </p>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Узнать подробности
            <Icon name="ChevronDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-center mb-4 text-primary-foreground">
            До торжества осталось
          </h2>
          <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Дней", value: timeLeft.days },
              { label: "Часов", value: timeLeft.hours },
              { label: "Минут", value: timeLeft.minutes },
              { label: "Секунд", value: timeLeft.seconds },
            ].map((item, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-2">
                    {item.value}
                  </div>
                  <div className="text-lg text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
              Подтверждение
            </h2>
            <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Будем рады видеть вас на нашем празднике!
            </p>
          </div>

          {!showRSVP ? (
            <div className="text-center animate-scale-in">
              <Button 
                size="lg" 
                className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => setShowRSVP(true)}
              >
                <Icon name="Heart" className="mr-2" size={20} />
                Подтвердить присутствие
              </Button>
            </div>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-xl animate-fade-in">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-lg">Ваше имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-lg mb-3 block">Сможете ли вы присутствовать? *</Label>
                    <RadioGroup value={formData.attendance} onValueChange={(value) => setFormData({ ...formData, attendance: value })}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="cursor-pointer">Да, обязательно буду!</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="cursor-pointer">К сожалению, не смогу</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.attendance === "yes" && (
                    <>
                      <div>
                        <Label htmlFor="guests" className="text-lg">Количество гостей</Label>
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dietary" className="text-lg">Пожелания по меню</Label>
                        <Input
                          id="dietary"
                          value={formData.dietary}
                          onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                          placeholder="Вегетарианское меню, аллергии и т.д."
                          className="mt-2"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="message" className="text-lg">Пожелания или комментарии</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ваши пожелания..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" size="lg">
                      Отправить
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowRSVP(false)}
                      size="lg"
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
              Поздравления
            </h2>
            <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Ваши теплые слова очень важны для нас
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg mb-12">
            <CardContent className="p-8">
              <form onSubmit={handleAddWish} className="space-y-4">
                <div>
                  <Label htmlFor="wishName" className="text-lg">Ваше имя</Label>
                  <Input
                    id="wishName"
                    name="wishName"
                    placeholder="Иван Иванов"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="wishMessage" className="text-lg">Ваше поздравление</Label>
                  <Textarea
                    id="wishMessage"
                    name="wishMessage"
                    placeholder="Поделитесь вашими теплыми словами..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить поздравление
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {guests.map((guest, index) => (
              <Card 
                key={guest.id} 
                className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Heart" size={24} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                          {guest.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(guest.timestamp).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{guest.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
              Место проведения
            </h2>
            <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground mb-2">
              Ждем вас по адресу:
            </p>
            <p className="text-xl font-serif text-primary-foreground">
              г. Томск, с. Тимирязевское<br />
              ул. Ново-Трактовая, 24
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=84.883257%2C56.480848&z=15&l=map&pt=84.883257,56.480848,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-b-lg"
                ></iframe>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start gap-4 mb-4">
                  <Icon name="MapPin" size={24} className="text-primary-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                      Адрес
                    </h3>
                    <p className="text-muted-foreground">
                      г. Томск, с. Тимирязевское, ул. Ново-Трактовая, 24
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open(`https://yandex.ru/maps/?pt=84.883257,56.480848&z=15&l=map`, '_blank')}
                >
                  <Icon name="Navigation" className="mr-2" size={20} />
                  Построить маршрут
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-primary/10 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 animate-float">
            <span className="text-4xl">💐</span>
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            С любовью, Юрий и Елена
          </p>
          <p className="text-sm text-muted-foreground">
            12 декабря 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;