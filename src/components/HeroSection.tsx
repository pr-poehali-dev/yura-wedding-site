import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
