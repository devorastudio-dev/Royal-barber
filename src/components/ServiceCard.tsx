'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Timer,
  Scissors,
  User,
  TrendingUp,
  Palette,
  Crown,
} from 'lucide-react';
import { Service } from '@/types';
import { cn, formatPrice } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  showBookButton?: boolean;
  index?: number;
}

export default function ServiceCard({
  service,
  showBookButton = false,
  index = 0,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  
  const getServiceIcon = (name: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Corte': <Scissors className="w-10 h-10 text-amber-500" />,
      'Barba': <User className="w-10 h-10 text-amber-500" />,
      'Degradê': <TrendingUp className="w-10 h-10 text-amber-500" />,
      'Coloração': <Palette className="w-10 h-10 text-amber-500" />,
      'Tratamento': <Sparkles className="w-10 h-10 text-amber-500" />,
      'Combo': <Crown className="w-10 h-10 text-amber-500" />,
    };
    
    for (const [key, icon] of Object.entries(icons)) {
      if (name.includes(key)) return icon;
    }
    return <Sparkles className="w-10 h-10 text-amber-500" />;
  };

  const serviceIcon = getServiceIcon(service.name);

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
          'relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 rounded-3xl p-8',
          'border border-gray-800/50 transition-all duration-500',
          'hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10',
          'overflow-hidden'
        )}
      >
        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none"
        />

        {/* Floating blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl transition-opacity duration-500" />

        {/* Glow effect on hover */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-[60px] pointer-events-none"
        />

        {/* Badge */}
        {service.price && service.price < 60 && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-full">
            <span className="text-green-400 text-xs font-medium">Popular</span>
          </div>
        )}

        {/* Icon Section */}
        <div className="relative mb-6">
          <motion.div
            animate={{
              rotate: isHovered ? 10 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-20 h-20 mx-auto"
          >
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-30 rounded-2xl" />
            
            {/* Icon container */}
            <div className="relative w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
              {serviceIcon}
            </div>

            {/* Sparkle effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-amber-500 transition-colors">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {service.features.slice(0, 4).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-amber-500" />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </motion.div>
            ))}
            {service.features.length > 4 && (
              <div className="text-gray-500 text-sm pl-8">
                +{service.features.length - 4} mais benefícios
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

          {/* Price and Duration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400 text-sm">{service.duration} min</span>
            </div>
            {service.price && (
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                className="text-right"
              >
                <div className="text-3xl font-bold text-gradient-gold">
                  {formatPrice(service.price)}
                </div>
                <div className="text-gray-500 text-xs">ou mais</div>
              </motion.div>
            )}
          </div>

          {/* Book Button */}
          {showBookButton && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Link
                href="/agendamento"
                className={cn(
                  'relative flex items-center justify-center gap-2 w-full py-4',
                  'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-2xl',
                  'overflow-hidden transition-all duration-300',
                  'hover:from-amber-400 hover:to-amber-500',
                  'hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30'
                )}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                </span>

                <Clock className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Agendar Serviço</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
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
          rotate: isHovered ? 45 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-500/10 rounded-xl rotate-12 blur-xl"
      />
    </motion.div>
  );
}

