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
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12 text-primary-foreground">
          До торжества осталось
        </h2>
        
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 mx-auto max-w-4xl">
          <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
            {[
              { label: "Дней", value: timeLeft.days },
              { label: "Часов", value: timeLeft.hours },
              { label: "Минут", value: timeLeft.minutes },
              { label: "Секунд", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-1">
                  {item.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;