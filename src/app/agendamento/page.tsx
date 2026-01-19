import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

function BookingContent() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Agendamento</span>{' '}
            <span className="text-amber-500">Online</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Escolha o serviço, barbeiro e horário que melhor se encaixa na sua agenda. 
            Agendamento rápido e sem complicação!
          </p>
        </div>

        {/* Booking Form */}
        <BookingForm />

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-white mb-2">Pelo WhatsApp</h3>
            <p className="text-gray-400 text-sm mb-3">
              Prefere agendar pelo WhatsApp? Sem problemas!
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 font-semibold hover:text-amber-400"
            >
              Chamar no WhatsApp →
            </a>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl mb-3">❓</div>
            <h3 className="font-bold text-white mb-2">Dúvidas?</h3>
            <p className="text-gray-400 text-sm mb-3">
              Tire suas dúvidas sobre nossos serviços e horários.
            </p>
            <a
              href="/contato"
              className="text-amber-500 font-semibold hover:text-amber-400"
            >
              Fale Conosco →
            </a>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-bold text-white mb-2">Cancelamento</h3>
            <p className="text-gray-400 text-sm mb-3">
              Não pôde comparecer? Cancele ou remarque com antecedência.
            </p>
            <a
              href="tel:11999999999"
              className="text-amber-500 font-semibold hover:text-amber-400"
            >
              Ligar para Nós →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <BookingContent />
    </Suspense>
  );
}

