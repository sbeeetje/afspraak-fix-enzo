import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Filter, User, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { AppointmentCard } from '@/components/AppointmentCard';
import { toast } from '@/hooks/use-toast';
import { Appointment } from '@/types/appointment';

// Mock data voor demo
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientName: 'Emma van der Berg',
    clientPhone: '06 12345678',
    clientEmail: 'emma@voorbeeld.nl',
    service: { id: '1', name: 'Knip + Was + Föhn', duration: 60, price: 35 },
    date: '2024-07-17',
    time: '10:00',
    status: 'pending',
    providerId: 'provider1',
    createdAt: '2024-07-16T14:30:00Z',
    notes: 'Graag een korte bob, net boven de schouders'
  },
  {
    id: '2',
    clientName: 'Piet Janssen',
    clientPhone: '06 87654321',
    clientEmail: 'piet.janssen@mail.nl',
    service: { id: '3', name: 'Baard trimmen', duration: 30, price: 15 },
    date: '2024-07-17',
    time: '14:30',
    status: 'confirmed',
    providerId: 'provider1',
    createdAt: '2024-07-15T09:15:00Z'
  },
  {
    id: '3',
    clientName: 'Lisa de Wit',
    clientPhone: '06 55667788',
    clientEmail: '',
    service: { id: '2', name: 'Kinderknip', duration: 30, price: 20 },
    date: '2024-07-18',
    time: '15:00',
    status: 'pending',
    providerId: 'provider1',
    createdAt: '2024-07-16T11:20:00Z',
    notes: 'Voor zoon van 8 jaar, hij is wat verlegen'
  },
  {
    id: '4',
    clientName: 'Mark Stukken',
    clientPhone: '06 99887766',
    clientEmail: 'mark@voorbeeld.com',
    service: { id: '4', name: 'Kleuren + Knip', duration: 120, price: 65 },
    date: '2024-07-16',
    time: '11:00',
    status: 'rejected',
    providerId: 'provider1',
    createdAt: '2024-07-15T16:45:00Z'
  }
];

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const handleConfirm = (id: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'confirmed' as const } : apt
    ));
    toast({
      title: "Afspraak bevestigd",
      description: "De klant ontvangt automatisch een bevestiging.",
    });
  };

  const handleReject = (id: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'rejected' as const } : apt
    ));
    toast({
      title: "Afspraak geweigerd",
      description: "De klant wordt hiervan op de hoogte gesteld.",
      variant: "destructive",
    });
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
    
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return apt.date === today;
    }
    if (dateFilter === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return apt.date === tomorrow.toISOString().split('T')[0];
    }
    if (dateFilter === 'week') {
      const today = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      const aptDate = new Date(apt.date);
      return aptDate >= today && aptDate <= weekFromNow;
    }
    
    return true;
  });

  // Statistics
  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    rejected: appointments.filter(apt => apt.status === 'rejected').length
  };

  const todaysAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today && apt.status === 'confirmed';
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Beheer uw afspraken en bekijk uw planning
              </p>
            </div>
            <Button className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Instellingen</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal afspraken</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Alle tijd</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In afwachting</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Wachten op bevestiging</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bevestigd</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">Geplande afspraken</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vandaag</CardTitle>
              <User className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todaysAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Afspraken vandaag</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter uw afspraken op status en datum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle statussen</SelectItem>
                    <SelectItem value="pending">In afwachting</SelectItem>
                    <SelectItem value="confirmed">Bevestigd</SelectItem>
                    <SelectItem value="rejected">Geweigerd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Periode</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle data</SelectItem>
                    <SelectItem value="today">Vandaag</SelectItem>
                    <SelectItem value="tomorrow">Morgen</SelectItem>
                    <SelectItem value="week">Komende week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Afspraken ({filteredAppointments.length})
            </h2>
            {stats.pending > 0 && (
              <Badge variant="secondary" className="gap-2">
                <Clock className="w-3 h-3" />
                {stats.pending} wachten op bevestiging
              </Badge>
            )}
          </div>

          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Geen afspraken gevonden</h3>
                <p className="text-muted-foreground">
                  Er zijn geen afspraken die voldoen aan de geselecteerde filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onConfirm={handleConfirm}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}