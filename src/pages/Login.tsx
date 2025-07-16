import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Scissors } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login (replace with real authentication later)
    setTimeout(() => {
      if (formData.email && formData.password) {
        toast({
          title: "Succesvol ingelogd!",
          description: "Welkom terug in uw dashboard.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Inloggen mislukt",
          description: "Controleer uw e-mailadres en wachtwoord.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welkom terug</CardTitle>
            <CardDescription>
              Log in om uw afspraken te beheren
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-mailadres
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="uw.email@voorbeeld.nl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Wachtwoord
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2" 
                size="lg"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4" />
                {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Geen account? Neem contact op voor toegang.
              </p>
              <Button variant="link" className="text-sm p-0 h-auto mt-2">
                Wachtwoord vergeten?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}