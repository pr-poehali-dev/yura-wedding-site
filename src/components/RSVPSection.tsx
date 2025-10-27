import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";

interface RSVPSectionProps {
  showRSVP: boolean;
  setShowRSVP: (show: boolean) => void;
  formData: {
    name: string;
    attendance: string;
    guests: string;
    dietary: string;
    alcohol: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const RSVPSection = ({ showRSVP, setShowRSVP, formData, setFormData, handleSubmit }: RSVPSectionProps) => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl md:text-6xl mb-4 text-primary-foreground">
            Подтверждение
          </h2>
          <div className="h-px w-24 bg-primary-foreground/30 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Будем рады видеть вас на нашем празднике!
          </p>
        </div>

        {!showRSVP ? (
          <div className="text-center animate-scale-in">
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowRSVP(true)}
            >
              <Icon name="Heart" className="mr-2" size={20} />
              Подтвердить присутствие
            </Button>
          </div>
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 shadow-xl animate-fade-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg">Ваше имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-lg mb-3 block">Сможете ли вы присутствовать? *</Label>
                  <RadioGroup value={formData.attendance} onValueChange={(value) => setFormData({ ...formData, attendance: value })}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="cursor-pointer">Да, обязательно буду!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="cursor-pointer">К сожалению, не смогу</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attendance === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="guests" className="text-lg">Количество гостей</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dietary" className="text-lg">Пожелания по меню</Label>
                      <Input
                        id="dietary"
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        placeholder="Вегетарианское меню, аллергии и т.д."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-lg mb-3 block">Какой алкоголь вы предпочитаете?</Label>
                      <RadioGroup value={formData.alcohol} onValueChange={(value) => setFormData({ ...formData, alcohol: value })}>
                        <div className="grid gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="red-wine" id="red-wine" />
                            <Label htmlFor="red-wine" className="cursor-pointer">Красное вино</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="white-wine" id="white-wine" />
                            <Label htmlFor="white-wine" className="cursor-pointer">Белое вино</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="champagne" id="champagne" />
                            <Label htmlFor="champagne" className="cursor-pointer">Шампанское</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="whiskey-cognac" id="whiskey-cognac" />
                            <Label htmlFor="whiskey-cognac" className="cursor-pointer">Виски/коньяк</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vodka" id="vodka" />
                            <Label htmlFor="vodka" className="cursor-pointer">Водка</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beer" id="beer" />
                            <Label htmlFor="beer" className="cursor-pointer">Пиво</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no-alcohol" id="no-alcohol" />
                            <Label htmlFor="no-alcohol" className="cursor-pointer">Не буду пить алкоголь</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message" className="text-lg">Пожелания или комментарии</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ваши пожелания..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" size="lg">
                    Отправить
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRSVP(false)}
                    size="lg"
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
