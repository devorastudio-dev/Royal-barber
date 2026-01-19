'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { contactInfo } from '@/lib/data';
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  ArrowRight,
  Send,
  Sparkles,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (searchParams.get('agendamento') === 'sucesso') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black" />
        <div className="absolute inset-0 bg-pattern-grid opacity-10" />

        {/* Animated blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-8">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Fale Conosco
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Estamos</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Aqui
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Estamos prontos para atender você! Entre em contato por WhatsApp, 
              telefone, email ou venha nos visitar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 max-w-7xl mx-auto px-4"
        >
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-green-400">Agendamento Confirmado!</h3>
              <p className="text-gray-300 text-sm">
                Seu agendamento foi registrado. Complete o processo pelo WhatsApp.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Contact Cards */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                subtitle: 'Resposta rápida',
                value: contactInfo.phone,
                href: `https://wa.me/${contactInfo.whatsapp}`,
                color: 'green',
                gradient: 'from-green-500/20 to-green-600/10',
              },
              {
                icon: Phone,
                title: 'Telefone',
                subtitle: 'Ligação direta',
                value: contactInfo.phone,
                href: `tel:${contactInfo.phone}`,
                color: 'amber',
                gradient: 'from-amber-500/20 to-amber-600/10',
              },
              {
                icon: Mail,
                title: 'Email',
                subtitle: 'Dúvidas gerais',
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
                color: 'blue',
                gradient: 'from-blue-500/20 to-blue-600/10',
              },
              {
                icon: MapPin,
                title: 'Endereço',
                subtitle: 'Venha nos visitar',
                value: contactInfo.address,
                href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
                color: 'purple',
                gradient: 'from-purple-500/20 to-purple-600/10',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border border-gray-800/50 hover:border-${item.color}-500/50 transition-all group text-center`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-${item.color}-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-8 h-8 text-${item.color}-500`} />
                    </div>

                    <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.subtitle}</p>

                    <span
                      className={`text-${item.color}-500 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all`}
                    >
                      {item.title === 'Endereço' ? 'Ver mapa' : 'Contatar'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                Nossa{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Localização
                </span>
              </h2>

              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-2 border border-gray-800/50 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-800 rounded-2xl relative overflow-hidden">
                  {/* Map placeholder with image */}
                  <Image
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80"
                    alt="Localização da barbearia"
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                  {/* Map marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50">
                        <Scissors className="w-8 h-8 text-black" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rotate-45" />
                    </motion.div>
                  </div>
                </div>

                {/* Address card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/20 rounded-lg">
                        <MapPin className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{contactInfo.address}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-500 text-sm hover:text-amber-400 flex items-center gap-1"
                        >
                          Abrir no Google Maps
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                Horário de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Funcionamento
                </span>
              </h2>

              <div className="space-y-4">
                {/* Weekdays */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-900/80 to-gray-800/30 rounded-2xl border border-gray-800/50 hover:border-amber-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-amber-500 font-bold text-lg">Seg</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Segunda à Sexta</p>
                      <p className="text-gray-400 text-sm">Dias úteis</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-bold text-xl">
                      {contactInfo.openingHours.weekdays}
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 text-xs">Aberto</span>
                    </div>
                  </div>
                </motion.div>

                {/* Saturday */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-900/80 to-gray-800/30 rounded-2xl border border-gray-800/50 hover:border-amber-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-amber-500 font-bold text-lg">Sáb</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Sábado</p>
                      <p className="text-gray-400 text-sm">Meio de semana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-bold text-xl">
                      {contactInfo.openingHours.saturday}
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 text-xs">Aberto</span>
                    </div>
                  </div>
                </motion.div>

                {/* Sunday */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-5 bg-gray-900/50 rounded-2xl border border-gray-800/50 opacity-70"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500 font-bold text-lg">Dom</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Domingo</p>
                      <p className="text-gray-500 text-sm">Final de semana</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 font-bold text-xl">
                      {contactInfo.openingHours.sunday}
                    </p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <span className="w-2 h-2 bg-gray-600 rounded-full" />
                      <span className="text-gray-500 text-xs">Fechado</span>
                    </div>
                  </div>
                </motion.div>

                {/* Tip */}
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-500 text-sm">
                      <strong>Dica:</strong> Para garantir seu horário preferido, 
                      recomendamos agendar com antecedência, especialmente aos sábados!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 rounded-3xl p-12 border border-amber-500/20 text-center overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">Ainda tem</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  dúvidas?
                </span>
              </h2>

              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Nossa equipe está pronta para tirar todas as suas dúvidas. 
                Fale conosco agora mesmo!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold text-lg rounded-2xl hover:from-green-400 hover:to-green-500 transition-all hover:scale-105 shadow-xl shadow-green-500/30"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </a>

                <Link
                  href="/agendamento"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800/80 text-white font-bold text-lg rounded-2xl hover:bg-gray-700 transition-all border border-gray-700"
                >
                  <Calendar className="w-6 h-6" />
                  Agendar Online
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Scissors icon component
function Scissors({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ContactContent />
    </Suspense>
  );
}

