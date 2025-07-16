import React from 'react';
import { Check, X, Clock, User, Phone, Mail, Calendar, Scissors } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
}

export function AppointmentCard({ appointment, onConfirm, onReject }: AppointmentCardProps) {
  const statusConfig = {
    pending: { 
      label: 'In afwachting', 
      variant: 'secondary' as const,
      bgColor: 'bg-yellow-50 border-yellow-200',
      icon: <Clock className="w-4 h-4 text-yellow-600" />
    },
    confirmed: { 
      label: 'Bevestigd', 
      variant: 'default' as const,
      bgColor: 'bg-green-50 border-green-200',
      icon: <Check className="w-4 h-4 text-green-600" />
    },
    rejected: { 
      label: 'Geweigerd', 
      variant: 'destructive' as const,
      bgColor: 'bg-red-50 border-red-200',
      icon: <X className="w-4 h-4 text-red-600" />
    }
  };

  const config = statusConfig[appointment.status];
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`transition-all hover:shadow-md ${config.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Scissors className="w-4 h-4" />
                {appointment.service.name}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {config.icon}
            <Badge variant={config.variant}>
              {config.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{appointment.time}</span>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-background/60 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Behandeling:</span>
              <p className="font-medium">{appointment.service.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duur:</span>
              <p className="font-medium">{appointment.service.duration} minuten</p>
            </div>
          </div>
          {appointment.service.price && (
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Prijs:</span>
              <span className="font-medium ml-2">€{appointment.service.price}</span>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <a href={`tel:${appointment.clientPhone}`} className="text-primary hover:underline">
              {appointment.clientPhone}
            </a>
          </div>
          {appointment.clientEmail && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href={`mailto:${appointment.clientEmail}`} className="text-primary hover:underline">
                {appointment.clientEmail}
              </a>
            </div>
          )}
        </div>

        {/* Notes */}
        {appointment.notes && (
          <div className="bg-background/60 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Opmerkingen:</p>
            <p className="text-sm">{appointment.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        {appointment.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onConfirm(appointment.id)}
              className="flex-1 gap-2"
              size="sm"
            >
              <Check className="w-4 h-4" />
              Bevestigen
            </Button>
            <Button
              onClick={() => onReject(appointment.id)}
              variant="outline"
              className="flex-1 gap-2"
              size="sm"
            >
              <X className="w-4 h-4" />
              Weigeren
            </Button>
          </div>
        )}

        {/* Created timestamp */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Aangevraagd op {new Date(appointment.createdAt).toLocaleString('nl-NL')}
        </div>
      </CardContent>
    </Card>
  );
}