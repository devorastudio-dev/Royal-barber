'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import {
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
  Scissors,
  Sparkle,
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'corte', label: 'Cortes' },
    { id: 'barba', label: 'Barba' },
    { id: 'tratamento', label: 'Tratamentos' },
    { id: 'combo', label: 'Combos' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => {
          if (selectedCategory === 'corte') {
            return s.name.includes('Corte') || s.name.includes('Degradê');
          }
          if (selectedCategory === 'barba') {
            return s.name.includes('Barba');
          }
          if (selectedCategory === 'tratamento') {
            return s.name.includes('Coloração') || s.name.includes('Tratamento');
          }
          if (selectedCategory === 'combo') {
            return s.name.includes('Combo');
          }
          return true;
        });

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
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-8">
              <Sparkles className="w-5 h-5 animate-pulse" />
              ✂️ Serviços Premium
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Nossos</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Serviços
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Oferecemos uma ampla variedade de serviços para cuidar do seu visual. 
              Cada serviço é realizado com produtos de alta qualidade e atenção aos detalhes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceCard service={service} showBookButton index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-8 border border-gray-800/50 overflow-hidden"
            >
              {/* Background effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Sparkle className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    💡 <span className="text-amber-500">Dicas</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Chegue com antecedência</h3>
                      <p className="text-gray-400 text-sm">
                        Recomendamos chegar 10 minutosado para relaxar antes do horário agend 
                        e aproveitar ao máximo sua experiência.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Scissors className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Traga referências</h3>
                      <p className="text-gray-400 text-sm">
                        Se tiver um estilo específico em mente, leve uma foto de referência. 
                        Nossos barbeiros vão adorar ver suas ideias!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Promo Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-3xl p-8 border border-amber-500/20 overflow-hidden"
            >
              {/* Background effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    🎁 <span className="text-amber-500">Promoções</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-black/30 rounded-2xl border border-amber-500/20">
                    <h3 className="font-bold text-white mb-2">✨ Combo Corte + Barba</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Economize tempo e dinheiro! O combo sai por{' '}
                      <span className="text-amber-500 font-bold">R$ 75</span> (valor individual: R$ 85)
                    </p>
                    <Link
                      href="/agendamento"
                      className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold text-sm"
                    >
                      Agendar combo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-4 bg-black/30 rounded-2xl border border-amber-500/20">
                    <h3 className="font-bold text-white mb-2">🎯 Segunda é dia de Barba</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Barba completa com 20% de desconto às segundas-feiras!
                    </p>
                    <Link
                      href="/agendamento"
                      className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold text-sm"
                    >
                      Agendar
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
                <span className="text-white">Pronto para</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  cuidar do seu visual?
                </span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Agende agora mesmo seu horário e experimente uma experiência única 
                de cuidado pessoal com profissionais especializados.
              </p>

              <Link
                href="/agendamento"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 shadow-xl shadow-amber-500/30"
              >
                <Calendar className="w-6 h-6" />
                Agendar Agora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

