import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const LocationSection = () => {
  return (
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
  );
};

export default LocationSection;
