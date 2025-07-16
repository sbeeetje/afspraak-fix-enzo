import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Scissors } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Service, TimeSlot } from '@/types/appointment';

interface BookingFormProps {
  onSubmit: (data: any) => void;
}

const SERVICES: Service[] = [
  { id: '1', name: 'Knip + Was + Föhn', duration: 60, price: 35 },
  { id: '2', name: 'Kinderknip', duration: 30, price: 20 },
  { id: '3', name: 'Baard trimmen', duration: 30, price: 15 },
  { id: '4', name: 'Kleuren + Knip', duration: 120, price: 65 },
  { id: '5', name: 'Wassen + Föhn', duration: 45, price: 25 },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
];

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.clientPhone || !formData.service || !formData.date || !formData.time) {
      toast({
        title: "Vereiste velden ontbreken",
        description: "Vul alstublieft alle verplichte velden in.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Afspraak aangevraagd!",
      description: "Uw afspraakaanvraag is ingediend. U hoort binnen 24 uur van ons.",
    });
    
    // Reset form
    setFormData({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const selectedService = SERVICES.find(s => s.id === formData.service);

  return (
    <Card className="max-w-lg mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="text-center pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Afspraak maken</CardTitle>
        <CardDescription className="text-muted-foreground">
          Plan uw bezoek in enkele eenvoudige stappen
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service" className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Gewenste dienst *
            </Label>
            <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Kies een dienst" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{service.name}</span>
                      <span className="text-sm text-muted-foreground ml-4">
                        €{service.price} • {service.duration}min
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Gewenste datum *
            </Label>
            <Input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Gewenste tijd *
            </Label>
            <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Kies een tijdstip" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem 
                    key={slot.time} 
                    value={slot.time}
                    disabled={!slot.available}
                  >
                    <div className="flex items-center gap-2">
                      <span>{slot.time}</span>
                      {!slot.available && (
                        <span className="text-xs text-muted-foreground">(Bezet)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personal Information */}
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Volledige naam *
              </Label>
              <Input
                id="name"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                placeholder="Uw voor- en achternaam"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefoonnummer *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                placeholder="06 12345678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mailadres
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                placeholder="uw.email@voorbeeld.nl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                Opmerkingen
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Bijzondere wensen of opmerkingen..."
                rows={3}
              />
            </div>
          </div>

          {selectedService && (
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-2">Overzicht van uw afspraak</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium">Dienst:</span> {selectedService.name}</p>
                <p><span className="font-medium">Duur:</span> {selectedService.duration} minuten</p>
                <p><span className="font-medium">Prijs:</span> €{selectedService.price}</p>
                {formData.date && <p><span className="font-medium">Datum:</span> {new Date(formData.date).toLocaleDateString('nl-NL')}</p>}
                {formData.time && <p><span className="font-medium">Tijd:</span> {formData.time}</p>}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Afspraak aanvragen
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          * Verplichte velden. Uw afspraak wordt binnen 24 uur bevestigd.
        </p>
      </CardContent>
    </Card>
  );
}