'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Scissors,
  Calendar,
  User,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Star,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Início', icon: Scissors },
  { href: '/servicos', label: 'Serviços', icon: Calendar },
  { href: '/barbeiros', label: 'Barbeiros', icon: User },
  { href: '/agendamento', label: 'Agendamento', icon: Calendar },
  { href: '/contato', label: 'Contato', icon: MapPin },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="h-20" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-amber-500/20'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-xl opacity-40" />
                  <motion.div
                    className="relative p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Scissors className="w-7 h-7 text-black" />
                  </motion.div>
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      ROYAL
                    </span>
                    <span className="text-amber-500">BARBER</span>
                  </span>
                  <span className="text-xs text-amber-500/60 tracking-widest uppercase">
                    Premium Experience
                  </span>
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                        active
                          ? 'text-black bg-amber-500'
                          : 'text-gray-300 hover:text-amber-500 hover:bg-white/5'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4',
                          active ? 'text-black' : ''
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <Link
                href="/agendamento"
                className={cn(
                  'group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl',
                  'hover:from-amber-400 hover:to-amber-500 transition-all duration-300',
                  'hover:scale-105'
                )}
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full" />
              </Link>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden relative p-3 rounded-xl transition-all duration-300',
                isOpen
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-300 hover:text-amber-500 hover:bg-white/5'
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-6 space-y-3">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'relative flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300',
                            active
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                              : 'text-gray-300 hover:text-amber-500 hover:bg-white/5'
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                          <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4"
                  >
                    <Link
                      href="/agendamento"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-2xl"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Agendar Agora</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center justify-center gap-2 pt-4"
                  >
                    <div className="flex items-center gap-1 px-4 py-2 bg-amber-500/10 rounded-full">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-amber-500 text-sm font-medium">
                        4.9/5 Avaliação
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}

