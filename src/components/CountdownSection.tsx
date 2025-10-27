import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownSectionProps {
  timeLeft: TimeLeft;
}

const CountdownSection = ({ timeLeft }: CountdownSectionProps) => {
  return (
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
  );
};

export default CountdownSection;
