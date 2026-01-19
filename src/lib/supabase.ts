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

// Função para salvar agendamento
export async function saveAppointment(appointmentData: {
  service_id: string;
  service_name: string;
  barber_id: string;
  barber_name: string;
  customer_name: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    return { success: false, error };
  }
}

// Função para buscar agendamentos de um barbeiro em uma data
export async function getBarberAppointmentsForDate(
  barberId: string,
  date: string
) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('barber_id', barberId)
      .eq('appointment_date', date)
      .eq('status', 'confirmed');

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
}

// Função para buscar todos os agendamentos
export async function getAllAppointments() {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
}

// Função para cancelar agendamento
export async function cancelAppointment(id: string) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    return { success: false, error };
  }
}

