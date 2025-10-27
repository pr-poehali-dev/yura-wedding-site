import { Card, CardContent } from "@/components/ui/card";

const DressCodeSection = () => {
  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
            Дресс-код
          </h2>
          <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей палитры
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-scale-in">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">👗</div>
                <h3 className="font-serif text-3xl font-semibold text-primary-foreground mb-2">
                  Для дам
                </h3>
                <p className="text-muted-foreground mb-6">
                  Нежно-розовые, пудрово-розовые оттенки
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: '#FFC0CB' }}></div>
                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: '#FFAFBB' }}></div>
                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: '#FFA0BF' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🤵</div>
                <h3 className="font-serif text-3xl font-semibold text-primary-foreground mb-2">
                  Для мужчин
                </h3>
                <p className="text-muted-foreground mb-6">
                  Классические черно-белые цвета
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: '#080808' }}></div>
                <div className="w-16 h-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: '#F2F3F4' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
