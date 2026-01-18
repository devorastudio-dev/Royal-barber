import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o Supabase
export interface AppointmentRow {
  id: string;
  service_id: string;
  barber_id: string;
  customer_name: string;
  customer_phone: string;
  date: string;
  time: string;
  end_time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  notes?: string;
}

// Converter linha do Supabase para formato da aplicação
export function mapAppointmentRow(row: AppointmentRow) {
  return {
    id: row.id,
    serviceId: row.service_id,
    barberId: row.barber_id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    date: row.date,
    time: row.time,
    endTime: row.end_time,
    status: row.status,
    createdAt: row.created_at
  };
}

