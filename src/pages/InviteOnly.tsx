import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import CountdownSection from "@/components/CountdownSection";
import ScheduleSection from "@/components/ScheduleSection";
import DressCodeSection from "@/components/DressCodeSection";
import RSVPSection from "@/components/RSVPSection";
import WishesSection from "@/components/WishesSection";
import LocationSection from "@/components/LocationSection";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface InvitationData {
  guest_name: string;
  max_guests: number;
  invite_code: string;
}

const InviteOnly = () => {
  const { toast } = useToast();
  const [isValidated, setIsValidated] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [guests, setGuests] = useState<Guest[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    guests: "1",
    alcohol: "",
    message: "",
  });

  const weddingDate = new Date("2025-12-12T00:00:00");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('invite');
    
    if (code) {
      validateInviteCode(code);
    } else {
      setIsChecking(false);
    }
  }, []);

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

  const validateInviteCode = async (code: string) => {
    setIsChecking(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/b028e416-3320-4950-9adc-c16740e4743c?code=${code}`);
      const data = await response.json();
      
      if (data.valid) {
        setIsValidated(true);
        setInvitationData(data);
        setFormData(prev => ({ 
          ...prev, 
          name: data.guest_name,
          guests: data.max_guests.toString()
        }));
        localStorage.setItem('wedding_invite_code', code);
      } else {
        setIsValidated(false);
      }
    } catch (error) {
      setIsValidated(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      validateInviteCode(inviteCode.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, укажите ваше имя и ответ о присутствии",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/a28889fc-bb0f-479d-bb0a-8a4cb788060f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          invite_code: invitationData?.invite_code
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save RSVP');
      }

      toast({
        title: "Спасибо за ответ!",
        description: "Мы получили ваше подтверждение ❤️",
      });

      setFormData({
        name: invitationData?.guest_name || "",
        attendance: "",
        guests: invitationData?.max_guests.toString() || "1",
        alcohol: "",
        message: "",
      });
      setShowRSVP(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить ответ. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  const handleAddWish = async (e: React.FormEvent) => {
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

    try {
      const response = await fetch('https://functions.poehali.dev/e2c9db26-f730-42c4-b413-1d4edbc6a504', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput.value,
          message: messageInput.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save wish');
      }

      const data = await response.json();

      const newGuest: Guest = {
        id: data.id,
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
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить поздравление. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Проверка приглашения...</p>
        </div>
      </div>
    );
  }

  if (!isValidated) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0" style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/files/48c8597e-7100-451d-9557-07b5ccdf230f.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.45
        }}></div>
        
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <Card className="max-w-md w-full bg-white/80 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="font-serif text-4xl md:text-5xl mb-4 text-primary-foreground">
                  Добро пожаловать
                </h1>
                <p className="text-muted-foreground">
                  Для просмотра приглашения введите код из вашего приглашения
                </p>
              </div>
              
              <form onSubmit={handleSubmitCode} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Введите код приглашения"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="text-center text-lg tracking-wider"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Войти
                </Button>
              </form>
              
              <p className="text-sm text-muted-foreground text-center mt-6">
                Код приглашения отправлен вам вместе с приглашением
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ 
        backgroundImage: 'url(https://cdn.poehali.dev/files/48c8597e-7100-451d-9557-07b5ccdf230f.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.45
      }}></div>

      <HeroSection />
      <WelcomeSection />
      <CountdownSection timeLeft={timeLeft} />
      <ScheduleSection />
      <DressCodeSection />
      <RSVPSection 
        showRSVP={showRSVP}
        setShowRSVP={setShowRSVP}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      <WishesSection guests={guests} handleAddWish={handleAddWish} />
      <LocationSection />

      <footer className="py-12 px-4 bg-primary/10 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            С любовью, Юрий и Елена ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InviteOnly;
