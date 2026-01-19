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
      <div
        className={cn(
          'relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/90 rounded-3xl p-8',
          'border border-gray-800/50 transition-all duration-300',
          'hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10',
          'overflow-hidden'
        )}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px]" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full blur-[30px]" />

        {service.price && service.price < 60 && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-full">
            <span className="text-green-400 text-xs font-medium">Popular</span>
          </div>
        )}

        <div className="relative mb-6">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-2xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
              {serviceIcon}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-amber-500 transition-colors">
            {service.name}
          </h3>

          <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed">
            {service.description}
          </p>

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

          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400 text-sm">{service.duration} min</span>
            </div>
            {service.price && (
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient-gold">
                  {formatPrice(service.price)}
                </div>
                <div className="text-gray-500 text-xs">ou mais</div>
              </div>
            )}
          </div>

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
                  'hover:scale-[1.02]'
                )}
              >
                <Clock className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Agendar Serviço</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

