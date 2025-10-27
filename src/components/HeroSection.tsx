import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 z-10">
      <div className="text-center relative z-10 animate-fade-in max-w-3xl mx-auto">
        <p className="text-sm md:text-base font-light text-primary-foreground mb-6 tracking-widest uppercase">
          Вместе и навсегда
        </p>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 text-primary-foreground font-light italic">
          Юрий & Елена
        </h1>
        <p className="text-3xl md:text-4xl font-light text-primary-foreground mb-6">
          10:40
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-6">
          <div className="text-center">
            <div className="h-px w-16 md:w-24 bg-primary-foreground/30 mb-1.5"></div>
            <p className="text-sm md:text-base text-primary-foreground mb-1.5">декабрь</p>
            <div className="h-px w-16 md:w-24 bg-primary-foreground/30"></div>
          </div>
          <p className="text-6xl md:text-8xl font-light text-primary-foreground">12</p>
          <div className="text-center">
            <div className="h-px w-16 md:w-24 bg-primary-foreground/30 mb-1.5"></div>
            <p className="text-sm md:text-base text-primary-foreground mb-1.5">пятница</p>
            <div className="h-px w-16 md:w-24 bg-primary-foreground/30"></div>
          </div>
        </div>
        <p className="text-3xl md:text-4xl font-light text-primary-foreground mb-12">
          2025
        </p>
        <p className="font-serif text-3xl md:text-5xl text-primary-foreground italic font-light">
          Ждем Вас
        </p>
      </div>
    </section>
  );
};

export default HeroSection;