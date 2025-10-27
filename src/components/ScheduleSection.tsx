import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ScheduleSection = () => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
            Расписание дня
          </h2>
          <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            План нашего особенного дня
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-scale-in">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="inline-block bg-primary/20 rounded-2xl px-6 py-4">
                    <div className="text-4xl font-serif font-bold text-primary-foreground">10:40</div>
                    <div className="text-sm text-muted-foreground mt-1">12.12.2025</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="Church" size={28} className="text-primary-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-2">
                        Торжественная роспись
                      </h3>
                      <p className="text-muted-foreground mb-3 flex items-center gap-2">
                        <Icon name="MapPin" size={18} className="flex-shrink-0" />
                        ЗАГС, проспект Ленина, 83
                      </p>
                      <p className="text-muted-foreground italic">
                        Приглашаем вас разделить вместе с нами радость создания новой семьи.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="inline-block bg-secondary/20 rounded-2xl px-6 py-4">
                    <div className="text-4xl font-serif font-bold text-primary-foreground">17:00</div>
                    <div className="text-sm text-muted-foreground mt-1">12.12.2025</div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="PartyPopper" size={28} className="text-primary-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-2">
                        Банкетный зал
                      </h3>
                      <p className="text-muted-foreground mb-3 flex items-center gap-2">
                        <Icon name="MapPin" size={18} className="flex-shrink-0" />
                        г. Томск, с. Тимирязевское, ул. Ново-Трактовая, 24
                      </p>
                      <p className="text-muted-foreground italic">
                        Именно здесь мы отметим наш незабываемый день.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
