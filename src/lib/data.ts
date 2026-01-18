// Dados mockados para a barbearia
import { Barber, Service, ContactInfo, Appointment } from '@/types';
import { supabase, AppointmentRow, mapAppointmentRow } from './supabase';

// Serviços disponíveis
export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte moderno e personalizado para valorizar seu estilo. Incluye lavagem e finalização.',
    duration: 45,
    price: 50,
    icon: '✂️',
    features: ['Lavagem', 'Corte personalizado', 'Finalização', 'Toalha quente']
  },
  {
    id: '2',
    name: 'Barba Completa',
    description: 'Modelagem e acabamento perfeito para sua barba. Incluye navalhado ou máquina.',
    duration: 30,
    price: 35,
    icon: '🧔',
    features: ['Modelagem', 'Acabamento', 'Hot towel', 'Gel after shave']
  },
  {
    id: '3',
    name: 'Corte + Barba',
    description: 'Combo completo para quem quer cuidar do visual. Economia de tempo e preço especial.',
    duration: 60,
    price: 75,
    icon: '💈',
    features: ['Lavagem', 'Corte completo', 'Barba modelada', 'Massagem facial']
  },
  {
    id: '4',
    name: 'Degradê',
    description: 'Corte degradê com navalha ou máquina, o estilo que está na moda.',
    duration: 30,
    price: 40,
    icon: '🎯',
    features: ['Máquina 0 a 3', 'Navalha', 'Acabamento', 'Finalização']
  },
  {
    id: '5',
    name: 'Coloração',
    description: 'Coloração profissional para cobrir brancos ou mudar o visual.',
    duration: 90,
    price: 80,
    icon: '🎨',
    features: ['Aconsulta de cor', 'Aplicação', 'Tempo de ação', 'Lavagem']
  },
  {
    id: '6',
    name: 'Tratamento Capilar',
    description: 'Hidratação profunda e tratamento para cabelos danificados.',
    duration: 45,
    price: 60,
    icon: '💆',
    features: ['Diagnóstico', 'Máscara de tratamento', 'Massagem', 'Secagem']
  }
];

// Barbeiros disponíveis
export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    specialty: 'Cortes Modernos',
    photo: '/barbers/carlos.jpg',
    bio: 'Especialista em degradês e cortes contemporâneos. 10 anos de experiência.',
    active: true,
    schedule: {
      monday: { enabled: true, start: '09:00', end: '18:00' },
      tuesday: { enabled: true, start: '09:00', end: '18:00' },
      wednesday: { enabled: true, start: '09:00', end: '18:00' },
      thursday: { enabled: true, start: '09:00', end: '18:00' },
      friday: { enabled: true, start: '09:00', end: '20:00' },
      saturday: { enabled: true, start: '09:00', end: '17:00' },
      sunday: { enabled: false, start: '', end: '' }
    }
  },
  {
    id: '2',
    name: 'Roberto Santos',
    specialty: 'Barba e Estilo Clássico',
    photo: '/barbers/roberto.jpg',
    bio: 'Mestre em modelagem de barba e cortes clássicos. 15 anos de profissão.',
    active: true,
    schedule: {
      monday: { enabled: true, start: '10:00', end: '19:00' },
      tuesday: { enabled: true, start: '10:00', end: '19:00' },
      wednesday: { enabled: true, start: '10:00', end: '19:00' },
      thursday: { enabled: true, start: '10:00', end: '19:00' },
      friday: { enabled: true, start: '10:00', end: '19:00' },
      saturday: { enabled: true, start: '08:00', end: '14:00' },
      sunday: { enabled: false, start: '', end: '' }
    }
  },
  {
    id: '3',
    name: 'Marcos Oliveira',
    specialty: 'Coloração e Tratamentos',
    photo: '/barbers/marcos.jpg',
    bio: 'Especialista em coloração, luzes e tratamentos capilares masculinos.',
    active: true,
    schedule: {
      monday: { enabled: false, start: '', end: '' },
      tuesday: { enabled: true, start: '09:00', end: '17:00' },
      wednesday: { enabled: true, start: '09:00', end: '17:00' },
      thursday: { enabled: true, start: '09:00', end: '17:00' },
      friday: { enabled: true, start: '09:00', end: '17:00' },
      saturday: { enabled: true, start: '09:00', end: '15:00' },
      sunday: { enabled: false, start: '', end: '' }
    }
  }
];

// Informações de contato
export const contactInfo: ContactInfo = {
  address: 'Av. Principal, 1234 - Centro',
  phone: '(11) 99999-9999',
  whatsapp: '5511999999999',
  email: 'contato@royalbarber.com.br',
  openingHours: {
    weekdays: '09:00 - 20:00',
    saturday: '09:00 - 18:00',
    sunday: 'Fechado'
  }
};

// Cache local para agendamentos
let appointmentsCache: Appointment[] = [];
let cacheLoaded = false;

// Carregar agendamentos do Supabase
export async function loadAppointmentsFromSupabase(): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar agendamentos do Supabase:', error);
      return [];
    }

    if (data) {
      return data.map((row: AppointmentRow) => mapAppointmentRow(row));
    }

    return [];
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
    return [];
  }
}

// Obter agendamentos do barbeiro para uma data específica
export async function getBarberAppointments(barberId: string, date: string): Promise<Appointment[]> {
  if (!cacheLoaded) {
    appointmentsCache = await loadAppointmentsFromSupabase();
    cacheLoaded = true;
  }

  return appointmentsCache.filter(
    a => a.barberId === barberId && a.date === date && a.status !== 'cancelled'
  );
}

// Criar agendamento no Supabase
export async function createAppointment(
  serviceId: string,
  barberId: string,
  customerName: string,
  customerPhone: string,
  date: string,
  time: string,
  endTime: string
): Promise<Appointment> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        service_id: serviceId,
        barber_id: barberId,
        customer_name: customerName,
        customer_phone: customerPhone,
        date: date,
        time: time,
        end_time: endTime,
        status: 'confirmed'
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar agendamento no Supabase:', error);
      // Fallback: criar localmente se o Supabase falhar
      const appointment: Appointment = {
        id: Date.now().toString(),
        serviceId,
        barberId,
        customerName,
        customerPhone,
        date,
        time,
        endTime,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      appointmentsCache.push(appointment);
      return appointment;
    }

    if (data) {
      const appointment = mapAppointmentRow(data);
      appointmentsCache.push(appointment);
      return appointment;
    }

    throw new Error('Nenhum dado retornado');
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    // Fallback local
    const appointment: Appointment = {
      id: Date.now().toString(),
      serviceId,
      barberId,
      customerName,
      customerPhone,
      date,
      time,
      endTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    appointmentsCache.push(appointment);
    return appointment;
  }
}

// Funções auxiliares
export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function getBarberById(id: string): Barber | undefined {
  return barbers.find(b => b.id === id);
}

export function formatWhatsAppMessage(
  service: Service,
  barber: Barber,
  date: string,
  time: string,
  customerName: string
): string {
  return `Olá! Meu nome é ${customerName}. Gostaria de confirmar meu agendamento:
  
📅 Data: ${date}
⏰ Horário: ${time}
💇 Serviço: ${service.name}
👨‍🎨 Barbeiro: ${barber.name}

Aguardo confirmação!`;
}

