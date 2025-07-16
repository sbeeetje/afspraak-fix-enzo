import React from 'react';
import { ArrowRight, Calendar, Clock, CheckCircle, Star, Scissors, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';

const Index = () => {
  const handleBookingSubmit = (data: any) => {
    console.log('Booking submitted:', data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Professioneel afsprakenbeheer</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Maak eenvoudig uw 
                  <span className="text-primary"> afspraak</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Bij onze professionele kapsalon staat kwaliteit en persoonlijke service voorop. 
                  Plan uw bezoek online in een paar klikken.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Online planning</h3>
                    <p className="text-xs text-muted-foreground">24/7 beschikbaar</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Snelle bevestiging</h3>
                    <p className="text-xs text-muted-foreground">Binnen 24 uur</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Persoonlijke service</h3>
                    <p className="text-xs text-muted-foreground">Op maat gemaakt</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <ArrowRight className="w-5 h-5" />
                  Plan uw afspraak
                </Button>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="gap-2 text-lg">
                    <Scissors className="w-5 h-5" />
                    Voor dienstverleners
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Booking Form */}
            <div className="lg:pl-8">
              <BookingForm onSubmit={handleBookingSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Onze diensten</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Van klassieke knippen tot moderne styling - wij zorgen ervoor dat u er op uw best uitziet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Scissors className="w-8 h-8" />,
                title: "Knip + Was + Föhn",
                price: "€35",
                duration: "60 min",
                description: "Complete haarbehandeling met professionele styling"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Kleuren + Knip",
                price: "€65",
                duration: "120 min",
                description: "Vernieuw uw look met een prachtige nieuwe kleur"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Kinderknip",
                price: "€20",
                duration: "30 min",
                description: "Speciaal voor onze jongste klanten"
              }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {service.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">AfspraakPro</span>
              </div>
              <p className="text-muted-foreground">
                Professioneel afsprakenbeheer voor kappers en zorgverleners.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Hoofdstraat 123</p>
                <p>1234 AB Voorbeeld</p>
                <p>Tel: 012-3456789</p>
                <p>info@afspraakpro.nl</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Openingstijden</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Ma-Vr: 09:00 - 18:00</p>
                <p>Za: 09:00 - 17:00</p>
                <p>Zo: Gesloten</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AfspraakPro. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
