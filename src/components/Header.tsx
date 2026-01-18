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
      {/* Spacer for fixed header */}
      <div className="h-20" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl shadow-amber-500/10'
            : 'bg-transparent'
        )}
      >
        {/* Animated gradient border at bottom when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          )}
        </AnimatePresence>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group relative">
              <div className="flex items-center gap-3">
                {/* Logo Icon with glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <motion.div
                    className="relative p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Scissors className="w-7 h-7 text-black" />
                  </motion.div>
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      ROYAL
                    </span>
                    <span className="text-amber-500 group-hover:text-amber-400 transition-colors">
                      BARBER
                    </span>
                  </span>
                  <span className="text-xs text-amber-500/60 tracking-widest uppercase">
                    Premium Experience
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
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
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}

                      <Icon
                        className={cn(
                          'w-4 h-4 relative z-10',
                          active ? 'text-black' : ''
                        )}
                      />
                      <span className="relative z-10">{item.label}</span>

                      {/* Hover effect */}
                      {!active && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <Link
                href="/agendamento"
                className={cn(
                  'group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl',
                  'hover:from-amber-400 hover:to-amber-500 transition-all duration-300',
                  'hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30'
                )}
              >
                {/* Shine effect */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </span>

                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Agendar</span>

                {/* Decorative element */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
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
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>

              {/* Glow effect when open */}
              {isOpen && (
                <span className="absolute inset-0 rounded-xl bg-amber-500 blur-xl opacity-50" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="lg:hidden overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="py-6 space-y-3"
                >
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
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
                          {/* Active background */}
                          {active && (
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500" />
                          )}

                          <Icon
                            className={cn(
                              'w-5 h-5 relative z-10',
                              active ? 'text-black' : ''
                            )}
                          />
                          <span className="relative z-10">{item.label}</span>

                          <ChevronRight
                            className={cn(
                              'w-5 h-5 ml-auto relative z-10 transition-transform duration-300',
                              active ? 'text-black' : 'text-gray-500'
                            )}
                          />

                          {/* Hover glow */}
                          {!active && (
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <Link
                      href="/agendamento"
                      onClick={() => setIsOpen(false)}
                      className="relative flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-2xl overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                      <Calendar className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Agendar Agora</span>
                    </Link>
                  </motion.div>

                  {/* Rating badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 pt-4"
                  >
                    <div className="flex items-center gap-1 px-4 py-2 bg-amber-500/10 rounded-full">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-amber-500 text-sm font-medium">
                        4.9/5 Avaliação
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}

