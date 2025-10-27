import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Invitation {
  id: number;
  guest_name: string;
  invite_code: string;
  max_guests: number;
  invite_url: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [guestName, setGuestName] = useState("");
  const [maxGuests, setMaxGuests] = useState("2");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guestName.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите имя гостя",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/b028e416-3320-4950-9adc-c16740e4743c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_name: guestName,
          max_guests: parseInt(maxGuests)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invitation');
      }

      const data = await response.json();
      
      const currentUrl = window.location.origin;
      const inviteUrl = `${currentUrl}/?invite=${data.invite_code}`;
      
      setInvitations([{ ...data, invite_url: inviteUrl }, ...invitations]);
      
      toast({
        title: "Приглашение создано!",
        description: `Код: ${data.invite_code}`,
      });

      setGuestName("");
      setMaxGuests("2");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать приглашение",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: "Ссылка скопирована в буфер обмена",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center text-primary-foreground">
          Управление приглашениями
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Создать новое приглашение</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createInvitation} className="space-y-4">
              <div>
                <Label htmlFor="guestName">Имя гостя (гостей)</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Иван и Мария"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="maxGuests">Максимум гостей</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  min="1"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Создание..." : "Создать приглашение"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl text-primary-foreground">
            Созданные приглашения
          </h2>
          
          {invitations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Приглашения пока не созданы
              </CardContent>
            </Card>
          ) : (
            invitations.map((inv) => (
              <Card key={inv.id}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{inv.guest_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Макс. гостей: {inv.max_guests}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Код:</p>
                        <p className="font-mono font-semibold text-primary-foreground">
                          {inv.invite_code}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={inv.invite_url}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        onClick={() => copyToClipboard(inv.invite_url)}
                        variant="outline"
                      >
                        Копировать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
