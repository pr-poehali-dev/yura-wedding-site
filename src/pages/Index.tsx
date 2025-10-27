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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save RSVP');
      }

      toast({
        title: "Спасибо за ответ!",
        description: "Мы получили ваше подтверждение ❤️",
      });

      setFormData({
        name: "",
        attendance: "",
        guests: "1",
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