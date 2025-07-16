export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price?: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: Service;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'rejected';
  providerId: string;
  createdAt: string;
  notes?: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone?: string;
  services: Service[];
  businessName?: string;
}

export interface AvailabilitySlot {
  date: string;
  timeSlots: TimeSlot[];
}