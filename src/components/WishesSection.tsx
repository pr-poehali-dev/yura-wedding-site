import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Guest {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

interface WishesSectionProps {
  guests: Guest[];
  handleAddWish: (e: React.FormEvent) => void;
}

const WishesSection = ({ guests, handleAddWish }: WishesSectionProps) => {
  return (
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
  );
};

export default WishesSection;
