import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";


export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; 
  price?: number;
  icon?: LucideIcon; 
  features: string[];
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  bio: string;
  active: boolean;
  schedule: WeeklySchedule;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  enabled: boolean;
  start: string; // "09:00"
  end: string; // "18:
  breaks?: Break[];
}

export interface Break {
  start: string;
  end: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  barberId: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  endTime: string; // HH:mm
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface BookingStep {
  step: 'service' | 'barber' | 'date' | 'time' | 'customer' | 'confirmation';
  service?: Service;
  barber?: Barber;
  date?: Date;
  time?: string;
  customerName?: string;
  customerPhone?: string;
}

export const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
] as const;

export type Weekday = typeof WEEKDAYS[number];

