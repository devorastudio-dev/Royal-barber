'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  User,
  Calendar,
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';
import { contactInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

const footerLinks = {
  servicos: [
    { label: 'Corte Masculino', href: '/servicos#corte' },
    { label: 'Barba Completa', href: '/servicos#barba' },
    { label: 'Corte + Barba', href: '/servicos#combo' },
    { label: 'Degradê', href: '/servicos#degrade' },
    { label: 'Coloração', href: '/servicos#coloracao' },
    { label: 'Tratamentos', href: '/servicos#tratamentos' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/#sobre' },
    { label: 'Nossos Barbeiros', href: '/barbeiros' },
    { label: 'Galeria', href: '/#galeria' },
    { label: 'Depoimentos', href: '/#depoimentos' },
    { label: 'Trabalhe Conosco', href: '/#carreiras' },
  ],
  suporte: [
    { label: 'Agendar Online', href: '/agendamento' },
    { label: 'Fale Conosco', href: '/contato' },
    { label: 'Perguntas Frequentes', href: '/contato#faq' },
    { label: 'Política de Privacidade', href: '/#privacidade' },
    { label: 'Termos de Uso', href: '/#termos' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: '#',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/${contactInfo.whatsapp}`,
    gradient: 'from-green-500 via-green-400 to-green-600',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900/90 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl">
                    <Scissors className="w-8 h-8 text-black" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">
                    ROYAL
                    <span className="text-amber-500">BARBER</span>
                  </span>
                  <p className="text-amber-500/60 text-xs tracking-widest uppercase">
                    Premium Experience
                  </p>
                </div>
              </Link>

              {/* Description */}
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                A barbearia mais premium da região. Combinamos tradição e
                modernidade para oferecer a melhor experiência de cuidado
                masculino. Qualidade, profissionalismo e estilo em cada detalhe.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1 px-4 py-2 bg-amber-500/10 rounded-full">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold">4.9/5</div>
                  <div className="text-gray-500 text-sm">+2.500 avaliações</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, type: 'spring' }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={cn(
                        'relative p-3 bg-gray-800/50 rounded-xl transition-all duration-300',
                        'hover:shadow-lg hover:shadow-amber-500/20'
                      )}
                      aria-label={social.name}
                    >
                      {/* Gradient background on hover */}
                      <span
                        className={cn(
                          'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
                          'bg-gradient-to-br',
                          social.gradient
                        )}
                      />
                      <Icon
                        className={cn(
                          'w-5 h-5 relative z-10 transition-colors duration-300',
                          'text-gray-400 group-hover:text-white'
                        )}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
                  Serviços
                </h3>
                <ul className="space-y-3">
                  {footerLinks.servicos.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
                  Empresa
                </h3>
                <ul className="space-y-3">
                  {footerLinks.empresa.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
                  Suporte
                </h3>
                <ul className="space-y-3">
                  {footerLinks.suporte.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contact Info & Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-8 border border-gray-800/50">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                Fale Conosco
              </h3>
              <div className="space-y-4">
                <Link
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-2xl hover:bg-black/50 transition-colors group"
                >
                  <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">WhatsApp</div>
                    <div className="text-white font-medium">
                      {contactInfo.phone}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-500 group-hover:text-amber-500 transition-colors" />
                </Link>

                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-2xl hover:bg-black/50 transition-colors group"
                >
                  <div className="p-3 bg-amber-500/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Telefone</div>
                    <div className="text-white font-medium">
                      {contactInfo.phone}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-500 group-hover:text-amber-500 transition-colors" />
                </Link>

                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-black/30 rounded-2xl hover:bg-black/50 transition-colors group"
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">E-mail</div>
                    <div className="text-white font-medium">
                      {contactInfo.email}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-gray-500 group-hover:text-amber-500 transition-colors" />
                </Link>

                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-2xl">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Endereço</div>
                    <div className="text-white font-medium">
                      {contactInfo.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-8 border border-gray-800/50">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                Horário de Funcionamento
              </h3>
              <div className="space-y-4">
                {/* Weekdays */}
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-amber-500 font-bold">Seg</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Segunda à Sexta</div>
                      <div className="text-white font-medium">
                        {contactInfo.openingHours.weekdays}
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Saturday */}
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-amber-500 font-bold">Sáb</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Sábado</div>
                      <div className="text-white font-medium">
                        {contactInfo.openingHours.saturday}
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Sunday */}
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500 font-bold">Dom</span>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Domingo</div>
                      <div className="text-gray-500 font-medium">
                        {contactInfo.openingHours.sunday}
                      </div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full" />
                </div>

                {/* CTA */}
                <Link
                  href="/agendamento"
                  className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-2xl hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/25"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Agora
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm">
              © {currentYear}{' '}
              <span className="text-amber-500 font-medium">Royal Barber</span>.
              Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/#privacidade"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/#termos"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/contato"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors"
              >
                Contato
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-xs">
              Desenvolvido com ❤️ para homens de estilo
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

