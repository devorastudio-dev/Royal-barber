'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { barbers } from '@/lib/data';
import BarberCard from '@/components/BarberCard';
import {
  Users,
  Award,
  Target,
  BookOpen,
  Handshake,
  Mail,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function BarbersPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', label: 'Todos' },
    { id: 'corte', label: 'Cortes' },
    { id: 'barba', label: 'Barba' },
    { id: 'tratamento', label: 'Tratamentos' },
  ];

  const activeBarbers = barbers.filter((b) => b.active);
  const inactiveBarbers = barbers.filter((b) => !b.active);

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
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-8">
              <Users className="w-5 h-5 animate-pulse" />
              ✂️ Equipe Profissional
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Nossa</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Equipe
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Profissionais talentosos e experientes, prontos para transformar seu visual 
              com habilidade, criatividade e atenção aos detalhes.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: '15+', label: 'Anos de experiência', icon: Award },
                { value: '5', label: 'Barbeiros especializados', icon: Users },
                { value: '10k+', label: 'Clientes atendidos', icon: Target },
                { value: '4.9', label: 'Avaliação média', icon: Star },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-xl mb-3">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Barbers */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Barbeiros Disponíveis
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Profissionais</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Ativos
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeBarbers.map((barber, index) => (
              <BarberCard key={barber.id} barber={barber} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Inactive Barbers (if any) */}
      {inactiveBarbers.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 border border-gray-500/30 rounded-full text-gray-400 text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                Em Breve
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-white">Novidades</span>{' '}
                <span className="text-gray-400">em breve</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
              {inactiveBarbers.map((barber, index) => (
                <BarberCard key={barber.id} barber={barber} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Valores da Equipe
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">O que nos</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                move
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Dedicação',
                description:
                  'Cada atendimento é tratado com atenção e cuidado, garantindo resultados que superam expectativas.',
                color: 'from-amber-500 to-orange-600',
              },
              {
                icon: BookOpen,
                title: 'Atualização',
                description:
                  'Nossa equipe participa de cursos e eventos para manter-se atualizada com as tendências do mercado.',
                color: 'from-blue-500 to-indigo-600',
              },
              {
                icon: Handshake,
                title: 'Atendimento',
                description:
                  'Criamos um ambiente acolhedor onde cada cliente se sente especial e bem atendido.',
                color: 'from-green-500 to-emerald-600',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-8 border border-gray-800/50 hover:border-amber-500/30 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {value.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Team */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Junte-se a Nós
              </div>

              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">Quer fazer parte da</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  nossa equipe?
                </span>
              </h2>

              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Estamos sempre em busca de profissionais talentosos. Se você é 
                apaixonado pelo que faz e quer crescer conosco, mande seu currículo!
              </p>

              <a
                href="mailto:rh@royalbarber.com.br"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 shadow-xl shadow-amber-500/30"
              >
                <Mail className="w-6 h-6" />
                Enviar Currículo
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

