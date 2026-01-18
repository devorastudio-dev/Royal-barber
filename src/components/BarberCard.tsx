'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  Star,
  Calendar,
  ChevronRight,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Barber } from '@/types';
import { cn } from '@/lib/utils';

// Professional barber images from Unsplash
const barberImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
];

interface BarberCardProps {
  barber: Barber;
  index?: number;
}

export default function BarberCard({ barber, index = 0 }: BarberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get consistent image based on barber ID
  const getBarberImage = (id: string) => {
    const index = parseInt(id) % barberImages.length;
    return barberImages[index];
  };

  // Get avatar gradient based on name
  const getAvatarGradient = (name: string) => {
    const gradients = [
      'from-amber-500 to-orange-600',
      'from-blue-500 to-indigo-600',
      'from-green-500 to-emerald-600',
      'from-purple-500 to-pink-600',
      'from-red-500 to-rose-600',
      'from-cyan-500 to-blue-600',
    ];
    const idx = name.charCodeAt(0) % gradients.length;
    return gradients[idx];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card Background */}
      <div
        className={cn(
          'relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 rounded-3xl overflow-hidden',
          'border border-gray-800/50 transition-all duration-500',
          'hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10'
        )}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <motion.div
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.2 : 0.05,
            }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px]"
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-pattern-dots opacity-10" />
        </div>

        {/* Photo Section */}
        <div className="relative h-72 overflow-hidden">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />

          {/* Image */}
          <div className="absolute inset-0">
            {!imageError && barber.photo ? (
              <Image
                src={getBarberImage(barber.id)}
                alt={barber.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={cn(
                  'w-full h-full bg-gradient-to-br',
                  getAvatarGradient(barber.name)
                )}
              />
            )}
          </div>

          {/* Avatar fallback */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {!imageError && barber.photo ? null : (
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={cn(
                  'w-28 h-28 rounded-full bg-gradient-to-br flex items-center justify-center text-5xl font-bold text-white shadow-2xl',
                  getAvatarGradient(barber.name)
                )}
              >
                {getInitials(barber.name)}
              </motion.div>
            )}
          </div>

          {/* Status Badge */}
          {barber.active && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 text-xs font-medium rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online Agora
              </div>
            </motion.div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-full">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-amber-500 text-sm font-bold">5.0</span>
            </div>
          </div>

          {/* Hover overlay with CTA */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <Link
              href={`/agendamento?barbeiro=${barber.id}`}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3',
                'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl',
                'hover:from-amber-400 hover:to-amber-500 transition-all duration-300',
                'hover:scale-105 shadow-lg shadow-amber-500/30'
              )}
            >
              <Calendar className="w-5 h-5" />
              Agendar com {barber.name.split(' ')[0]}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Name and Specialty */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
              {barber.name}
            </h3>
            <p className="text-amber-500 text-sm font-medium flex items-center justify-center gap-2">
              <Award className="w-4 h-4" />
              {barber.specialty}
            </p>
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-sm text-center mb-6 line-clamp-2 leading-relaxed">
            {barber.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-xl">
              <div className="p-1.5 bg-amber-500/20 rounded-lg">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="text-gray-400 text-xs">Exp.</div>
                <div className="text-white text-sm font-medium">10+ anos</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-xl">
              <div className="p-1.5 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-gray-400 text-xs">Atend.</div>
                <div className="text-white text-sm font-medium">2.5k+</div>
              </div>
            </div>
          </div>

          {/* Schedule Preview */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Seg-Sex</span>
              </div>
              <span className="text-white font-medium">
                {barber.schedule.monday.enabled
                  ? barber.schedule.monday.start
                  : 'Fechado'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Sábado</span>
              </div>
              <span className="text-white font-medium">
                {barber.schedule.saturday.enabled
                  ? barber.schedule.saturday.start
                  : 'Fechado'}
              </span>
            </div>
          </div>

          {/* Action Button (shown on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Link
              href={`/agendamento?barbeiro=${barber.id}`}
              className={cn(
                'relative flex items-center justify-center gap-2 w-full py-3',
                'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl',
                'overflow-hidden transition-all duration-300',
                'hover:from-amber-400 hover:to-amber-500',
                'hover:scale-[1.02]'
              )}
            >
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
              </span>
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Agendar horário</span>
            </Link>
          </motion.div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)',
          }}
        />
      </div>

      {/* Decorative element */}
      <motion.div
        animate={{
          rotate: isHovered ? -45 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/10 rounded-2xl rotate-12 blur-xl"
      />
    </motion.div>
  );
}

