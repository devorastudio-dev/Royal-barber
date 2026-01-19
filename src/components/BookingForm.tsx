'use client';

import { useState, useEffect, useState as useReactState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Scissors, 
  User, 
  Calendar, 
  Clock, 
  User as UserIcon, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Clock3,
  ScissorsIcon,
  Paintbrush,
  Palette,
  Icon,
  
  
} from 'lucide-react';
import { services, barbers, createAppointment, getBarberAppointments, formatWhatsAppMessage } from '@/lib/data';
import { saveAppointment, getBarberAppointmentsForDate } from '@/lib/supabase';
import { Service, Barber, TimeSlot } from '@/types';


function BarberAvatar({ barber, size = 80 }: { barber: Barber; size?: number }) {
  const [imageError, setImageError] = useReactState(false);
  const [imageLoaded, setImageLoaded] = useReactState(false);
  
    const initials = barber.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const photoPath = `/barbers/${barber.photo.includes('carlos') ? 'carlos' : barber.photo.includes('roberto') ? 'roberto' : 'marcos'}.svg`;

  return (
    <div 
      className="rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size }}
    >
      {!imageError && barber.photo ? (
        <div className={`relative ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <Image
            src={photoPath}
            alt={barber.name}
            width={size}
            height={size}
            className="object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      ) : null}
      <span 
        className={`absolute ${!imageError && barber.photo && imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ fontSize: size * 0.4 }}
      >
        {initials}
      </span>
    </div>
  );
}

type Step = 'service' | 'barber' | 'date' | 'time' | 'customer' | 'confirmation';

interface BookingData {
  service: Service | null;
  barber: Barber | null;
  date: Date | null;
  time: string | null;
  customerName: string;
  customerPhone: string;
}

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState<Step>('service');
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    barber: null,
    date: null,
    time: null,
    customerName: '',
    customerPhone: '',
  });
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const barberId = searchParams.get('barbeiro');
    if (barberId) {
      const barber = barbers.find(b => b.id === barberId);
      if (barber) {
        setBookingData(prev => ({ ...prev, barber }));
        setCurrentStep('service');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (bookingData.barber && bookingData.date) {
      const loadAvailableSlots = async () => {
        setLoadingSlots(true);
        try {
          const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
          const dayName = dayNames[bookingData.date!.getDay()] as keyof Barber['schedule'];
          const daySchedule = bookingData.barber!.schedule[dayName];

          if (!daySchedule.enabled || !daySchedule.start) {
            setAvailableSlots([]);
            return;
          }

          const appointments = await getBarberAppointments(bookingData.barber!.id, bookingData.date!.toISOString().split('T')[0]);
          const slots: TimeSlot[] = [];
          const duration = bookingData.service?.duration || 30;
          const slotInterval = 30;

          let currentTime = daySchedule.start;
          const endTime = daySchedule.end;

          while (currentTime < endTime) {
            const [hours, minutes] = currentTime.split(':').map(Number);
            const endHour = hours + Math.floor((minutes + duration) / 60);
            const endMinute = (minutes + duration) % 60;
            const slotEnd = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

            const isAvailable = !appointments.some(apt => {
              const aptStart = apt.time;
              const aptEnd = apt.endTime;
              return (currentTime < aptEnd && slotEnd > aptStart);
            });

            const now = new Date();
            const isToday = bookingData.date!.toDateString() === now.toDateString();
            const [slotHours, slotMinutes] = currentTime.split(':').map(Number);
            const slotDate = new Date(bookingData.date!);
            slotDate.setHours(slotHours, slotMinutes);
            
            if (isToday && slotDate < now) {
              slots.push({ time: currentTime, available: false });
            } else {
              slots.push({ time: currentTime, available: isAvailable });
            }

            const nextMinutes = minutes + slotInterval;
            currentTime = `${String(hours + Math.floor(nextMinutes / 60)).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
          }

          setAvailableSlots(slots);
        } finally {
          setLoadingSlots(false);
        }
      };

      loadAvailableSlots();
    }
  }, [bookingData.barber, bookingData.date, bookingData.service]);

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: 'service', label: 'Serviço', icon: <Scissors className="w-5 h-5" /> },
    { key: 'barber', label: 'Barbeiro', icon: <User className="w-5 h-5" /> },
    { key: 'date', label: 'Data', icon: <Calendar className="w-5 h-5" /> },
    { key: 'time', label: 'Horário', icon: <Clock className="w-5 h-5" /> },
    { key: 'customer', label: 'Dados', icon: <UserIcon className="w-5 h-5" /> },
    { key: 'confirmation', label: 'Confirmar', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.key === currentStep);

  const handleServiceSelect = (service: Service) => {
    setBookingData(prev => ({ ...prev, service }));
    setCurrentStep('barber');
  };

  const handleBarberSelect = (barber: Barber) => {
    setBookingData(prev => ({ ...prev, barber }));
    setCurrentStep('date');
  };

  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({ ...prev, date, time: null }));
    setCurrentStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }));
    setCurrentStep('customer');
  };

  const validateCustomerData = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bookingData.customerName.trim()) {
      newErrors.customerName = 'Nome é obrigatório';
    }
    
    if (!bookingData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefone é obrigatório';
    } else if (bookingData.customerPhone.replace(/\D/g, '').length < 10) {
      newErrors.customerPhone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCustomerData()) {
      setCurrentStep('confirmation');
    }
  };

  const handleConfirmAppointment = async () => {
    if (!bookingData.service || !bookingData.barber || !bookingData.date || !bookingData.time) return;

    setIsSubmitting(true);

    try {
      const [hours, minutes] = bookingData.time.split(':').map(Number);
      const endHours = hours + Math.floor((minutes + bookingData.service.duration) / 60);
      const endMinutes = (minutes + bookingData.service.duration) % 60;
      const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

      const dateStr = bookingData.date.toISOString().split('T')[0];

      // Salvar no Supabase
      const result = await saveAppointment({
        service_id: bookingData.service.id,
        service_name: bookingData.service.name,
        barber_id: bookingData.barber.id,
        barber_name: bookingData.barber.name,
        customer_name: bookingData.customerName,
        customer_phone: bookingData.customerPhone,
        appointment_date: dateStr,
        appointment_time: bookingData.time,
        notes: `Duração: ${bookingData.service.duration}min. Horário final: ${endTime}`
      });

      if (!result.success) {
        throw new Error('Erro ao salvar agendamento no banco de dados');
      }

      // Manter o localStorage para compatibilidade
      await createAppointment(
        bookingData.service.id,
        bookingData.barber.id,
        bookingData.customerName,
        bookingData.customerPhone,
        dateStr,
        bookingData.time,
        endTime
      );

      const message = formatWhatsAppMessage(
        bookingData.service,
        bookingData.barber,
        dateStr,
        bookingData.time,
        bookingData.customerName
      );
      
      const whatsappUrl = `https://wa.me/5531990855251?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        router.push('/contato?agendamento=sucesso');
      }, 2000);

    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Erro ao criar agendamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep = (step: Step) => {
    const currentIndex = getCurrentStepIndex();
    const targetIndex = steps.findIndex(s => s.key === step);
    
    if (targetIndex < currentIndex) {
      setCurrentStep(step);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-800 -z-10" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-amber-500 -z-10 transition-all duration-500"
          style={{ width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((step, index) => {
          const stepIndex = steps.findIndex(s => s.key === step.key);
          const isActive = step.key === currentStep;
          const isCompleted = stepIndex < getCurrentStepIndex();
          const canNavigate = stepIndex < getCurrentStepIndex();

          return (
            <button
              key={step.key}
              onClick={() => canNavigate && goToStep(step.key)}
              disabled={!canNavigate}
              className={`flex flex-col items-center gap-2 ${canNavigate ? 'cursor-pointer' : 'cursor-default'} bg-black px-2`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black ring-4 ring-amber-500/20'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.icon}
              </div>
              <span className={`text-xs hidden md:block ${isActive ? 'text-amber-500 font-medium' : isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderServiceSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Selecione o Serviço</h2>
        <p className="text-gray-400 text-sm">Escolha o que você precisa hoje</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] ${
              bookingData.service?.id === service.id
                ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-gray-900/80 border-gray-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${bookingData.service?.id === service.id ? 'bg-amber-500' : 'bg-gray-800'}`}>
                
                <span className="text-2xl">
                 {service.icon && <service.icon size={28} />}
                </span>

              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{service.name}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-amber-500 font-bold text-lg">
                    {service.price ? `R$ ${service.price}` : 'Consulte'}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {service.duration} min
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBarberSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Selecione o Barbeiro</h2>
        <p className="text-gray-400 text-sm">Escolha quem vai te atender</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbers.filter(b => b.active).map((barber) => (
          <button
            key={barber.id}
            onClick={() => handleBarberSelect(barber)}
            className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] ${
              bookingData.barber?.id === barber.id
                ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-gray-900/80 border-gray-800 hover:border-amber-500/50'
            }`}
          >
            <div className="w-20 h-20 mx-auto mb-4">
              <BarberAvatar barber={barber} size={80} />
            </div>
            <h3 className="font-bold text-white text-lg">{barber.name}</h3>
            <p className="text-amber-500 text-sm mt-1">{barber.specialty}</p>
            <div className="flex items-center justify-center gap-1 mt-3 text-green-500 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Disponível
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDateSelection = () => {
    const today = new Date();
    
    const generateDates = () => {
      const dates: Date[] = [];
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      return dates;
    };

    const dates = generateDates();
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const isDateAvailable = (date: Date) => {
      if (!bookingData.barber) return false;
      const dayNamesArr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayName = dayNamesArr[date.getDay()] as keyof typeof bookingData.barber.schedule;
      return bookingData.barber?.schedule[dayName]?.enabled ?? false;
    };

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Selecione a Data</h2>
          <p className="text-gray-400 text-sm">Escolha o melhor dia para você</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {dates.map((date) => {
            const isAvailable = isDateAvailable(date);
            const isSelected = bookingData.date?.toDateString() === date.toDateString();
            const isPast = date < today;

            return (
              <button
                key={date.toISOString()}
                onClick={() => isAvailable && !isPast && handleDateSelect(date)}
                disabled={!isAvailable || isPast}
                className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                  !isAvailable || isPast
                    ? 'bg-gray-900/30 text-gray-600 cursor-not-allowed'
                    : isSelected
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-gray-900/80 border border-gray-800 hover:border-amber-500/50'
                }`}
              >
                <div className={`text-xs font-medium ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>{dayNames[date.getDay()]}</div>
                <div className="text-xl font-bold my-1">{date.getDate()}</div>
                <div className={`text-xs ${isSelected ? 'text-black/70' : 'text-gray-600'}`}>
                  {date.toLocaleDateString('pt-BR', { month: 'short' })}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSelection = () => {
    const morningSlots = availableSlots.filter(s => {
      const hour = parseInt(s.time.split(':')[0]);
      return hour < 12;
    });
    const afternoonSlots = availableSlots.filter(s => {
      const hour = parseInt(s.time.split(':')[0]);
      return hour >= 12;
    });

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Selecione o Horário</h2>
          <p className="text-gray-400 text-sm">Horários disponíveis para esta data</p>
        </div>
        
        {loadingSlots ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-lg">Carregando horários...</p>
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="text-center py-12">
            <Clock3 className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Não há horários disponíveis</p>
            <p className="text-gray-500 text-sm mt-2">Por favor, selecione outra data</p>
          </div>
        ) : (
          <>
            {morningSlots.length > 0 && (
              <div>
                <h3 className="text-amber-500 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Manhã
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        !slot.available
                          ? 'bg-gray-900/30 text-gray-600 cursor-not-allowed'
                          : bookingData.time === slot.time
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                          : 'bg-gray-900/80 border border-gray-800 hover:border-amber-500/50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {afternoonSlots.length > 0 && (
              <div className="mt-6">
                <h3 className="text-amber-500 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Tarde
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        !slot.available
                          ? 'bg-gray-900/30 text-gray-600 cursor-not-allowed'
                          : bookingData.time === slot.time
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                          : 'bg-gray-900/80 border border-gray-800 hover:border-amber-500/50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderCustomerForm = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Seus Dados</h2>
        <p className="text-gray-400 text-sm">Como podemos te chamar?</p>
      </div>
      <form onSubmit={handleCustomerSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2 ml-1">Nome Completo</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={bookingData.customerName}
              onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
              className="w-full p-4 pl-12 bg-gray-900/80 border border-gray-800 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-all"
              placeholder="Seu nome completo"
            />
          </div>
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.customerName}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2 ml-1">WhatsApp</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="tel"
              value={bookingData.customerPhone}
              onChange={(e) => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
              className="w-full p-4 pl-12 bg-gray-900/80 border border-gray-800 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-all"
              placeholder="(11) 99999-9999"
            />
          </div>
          {errors.customerPhone && (
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.customerPhone}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all duration-300 hover:scale-[1.02] mt-6"
        >
          Continuar
        </button>
      </form>
    </div>
  );

  const renderConfirmation = () => {
    if (!bookingData.service || !bookingData.barber || !bookingData.date || !bookingData.time) {
      return null;
    }

    const dateStr = bookingData.date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Confirme seu Agendamento</h2>
          <p className="text-gray-400 text-sm">Revise as informações antes de confirmar</p>
        </div>
        
        <div className="bg-gray-900/80 rounded-2xl p-6 space-y-4 border border-gray-800">
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <span className="text-2xl">
                {bookingData.service.icon && <bookingData.service.icon size={28} />}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">Serviço</p>
              <p className="font-bold text-white">{bookingData.service.name}</p>
              <p className="text-amber-500 text-sm">{bookingData.service.price ? `R$ ${bookingData.service.price}` : ''}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
            <BarberAvatar barber={bookingData.barber} size={48} />
            <div className="flex-1">
              <p className="text-gray-400 text-xs">Barbeiro</p>
              <p className="font-bold text-white">{bookingData.barber.name}</p>
              <p className="text-amber-500 text-sm">{bookingData.barber.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-gray-400 text-xs">Data</p>
                <p className="font-bold text-white text-sm">{dateStr.split(',')[0]}, {bookingData.date.getDate()} de {dateStr.split(' de ')[1]?.split(' de ')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-gray-400 text-xs">Horário</p>
                <p className="font-bold text-white">{bookingData.time}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
            <UserIcon className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-gray-400 text-xs">Cliente</p>
              <p className="font-bold text-white">{bookingData.customerName}</p>
              <p className="text-gray-400 text-sm">{bookingData.customerPhone}</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-500 text-sm flex items-start gap-2">
            <span className="text-lg">💡</span>
            Após confirmar, você será direcionado para o WhatsApp para finalizar o agendamento com nossa equipe.
          </p>
        </div>

        <button
          onClick={handleConfirmAppointment}
          disabled={isSubmitting}
          className="w-full py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Confirmar Agendamento
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {renderStepIndicator()}
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-6 md:p-8 border border-gray-800 shadow-2xl">
        {currentStep === 'service' && renderServiceSelection()}
        {currentStep === 'barber' && renderBarberSelection()}
        {currentStep === 'date' && renderDateSelection()}
        {currentStep === 'time' && renderTimeSelection()}
        {currentStep === 'customer' && renderCustomerForm()}
        {currentStep === 'confirmation' && renderConfirmation()}
      </div>

      {currentStep !== 'service' && (
        <button
          onClick={() => {
            const currentIndex = getCurrentStepIndex();
            if (currentIndex > 0) {
              setCurrentStep(steps[currentIndex - 1].key);
            }
          }}
          className="mt-6 px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>
      )}
    </div>
  );
}

