'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Scissors,
  Calendar,
  Clock,
  Award,
  Users,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { services, barbers, contactInfo } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import BarberCard from '@/components/BarberCard';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80',
    title: 'Transforme seu Visual',
    subtitle: 'Experimente a excelência em cuidados masculinos',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80',
    title: 'Tradição e Modernidade',
    subtitle: 'Onde o clássico encontra o contemporâneo',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=80',
    title: 'Corte Perfeito',
    subtitle: 'Porque você merece o melhor',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Roberto M.',
    occupation: 'Empresário',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'O melhor atendimento que já experimentei. Os profissionais são altamente qualificados e o ambiente é excepcional.',
  },
  {
    id: 2,
    name: 'André S.',
    occupation: 'Advogado',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Sou cliente há 3 anos e sempre saio satisfeito. A atenção aos detalhes é impressionante.',
  },
  {
    id: 3,
    name: 'Thiago R.',
    occupation: 'Engenheiro',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Ambiente premium, profissionais talentosos. Recomendo para todos que buscam qualidade.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const featuredServices = services.slice(0, 3);
  const featuredBarbers = barbers.slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          </div>
        ))}

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index
                  ? 'bg-amber-500 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-8"
            >
              <Sparkles className="w-5 h-5" />
              Barbearia Premium desde 2008
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">{slides[currentSlide].title}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                com Estilo
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/agendamento"
                  className={cn(
                    'inline-flex items-center gap-3 px-8 py-4',
                    'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-2xl',
                    'hover:from-amber-400 hover:to-amber-500 transition-all duration-300',
                    'hover:scale-105'
                  )}
                >
                  <Calendar className="w-6 h-6" />
                  <span>Agendar Horário</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  Ver Serviços
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Award, value: '15+', label: 'Anos de experiência' },
                { icon: Users, value: '10k+', label: 'Clientes satisfeitos' },
                { icon: Star, value: '4.9', label: 'Avaliação média' },
                { icon: Scissors, value: '5', label: 'Barbeiros especializados' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/10 rounded-2xl mb-3">
                      <Icon className="w-7 h-7 text-amber-500" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute inset-0 bg-pattern-dots opacity-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Nossos Serviços Premium
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Cuidamos do</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                seu visual
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Oferecemos uma ampla variedade de serviços para transformar seu estilo, 
              desde cortes modernos até tratamentos capilares especializados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} showBookButton />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 border border-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-800 hover:border-amber-500/50 transition-all group"
            >
              Ver Todos os Serviços
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  Por Que Nos Escolher
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">A melhor experiência</span>{' '}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    masculina
                  </span>
                </h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  Nossa missão é proporcionar uma experiência única de cuidado pessoal, 
                  combinando técnicas tradicionais com as tendências mais modernas do mercado.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Scissors, title: 'Atendimento Personalizado', desc: 'Cada cliente é único e recebe atenção especial' },
                    { icon: Star, title: 'Profissionais Qualificados', desc: 'Equipe experiente e constantemente atualizada' },
                    { icon: Award, title: 'Ambiente Premium', desc: 'Higiene, conforto e tecnologia de ponta' },
                    { icon: Clock, title: 'Agendamento Online', desc: 'Praticidade para agendar seu horário' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-5 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-amber-500/30 hover:bg-gray-900/80 transition-all"
                      >
                        <div className="p-3 bg-amber-500/20 rounded-xl">
                          <Icon className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{item.title}</h3>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-black rounded-3xl overflow-hidden border border-amber-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800"
                    alt="Barber shop interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute -top-4 -right-2 p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl">
                  <div className="text-4xl">
                    <Scissors className="w-8 h-8 text-black" />
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 p-4 bg-gray-800 rounded-2xl border-2 border-amber-500/30 shadow-xl">
                  <div className="text-3xl">
                    <PhoneCall className="w-7 h-7 text-amber-500" />
                  </div>
                </div>

                <div className="absolute top-1/2 -right-3 p-3 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-500/30">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold">5.0 ★★★★★</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute inset-0 bg-pattern-grid opacity-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Nossa Equipe Elite
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Barbeiros</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Especializados
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Profissionais talentosos e experientes prontos para transformar seu visual 
              com habilidade e criatividade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBarbers.map((barber, index) => (
              <BarberCard key={barber.id} barber={barber} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/barbeiros"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 border border-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-800 hover:border-amber-500/50 transition-all group"
            >
              Ver Todos os Barbeiros
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              O Que Nossos Clientes Dizem
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Depoimentos</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Reais
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl p-8 border border-gray-800/50 hover:border-amber-500/30 transition-all"
              >
                <div className="absolute -top-4 left-8 p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl">
                  <Quote className="w-5 h-5 text-black" />
                </div>

                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.occupation}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 rounded-3xl p-12 border border-amber-500/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px]" />
            <div className="absolute inset-0 bg-pattern-dots opacity-20" />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Transforme Seu Visual
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Pronto para</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  mudar?
                </span>
              </h2>
              
              <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                Agende agora mesmo seu horário e experimente uma experiência única 
                de cuidado pessoal com profissionais especializados.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/agendamento"
                  className={cn(
                    'inline-flex items-center gap-3 px-8 py-4',
                    'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-2xl',
                    'hover:from-amber-400 hover:to-amber-500 transition-all duration-300',
                    'hover:scale-105'
                  )}
                >
                  <Calendar className="w-6 h-6" />
                  <span>Agendar Agora</span>
                </Link>

                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-lg rounded-2xl hover:bg-green-500/30 transition-all"
                >
                  <PhoneCall className="w-6 h-6" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-gray-800 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl border border-gray-800 hover:border-green-500/50 hover:bg-green-500/10 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-bold text-white text-xl mb-2">WhatsApp</h3>
              <p className="text-gray-400 text-sm">Fale conosco</p>
              <span className="text-green-500 text-sm mt-2 block">{contactInfo.phone}</span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl border border-gray-800 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-bold text-white text-xl mb-2">Localização</h3>
              <p className="text-gray-400 text-sm">{contactInfo.address.split(' - ')[0]}</p>
              <span className="text-amber-500 text-sm mt-2 block">Ver no mapa</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-3xl border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-white text-xl mb-2">Horário</h3>
              <p className="text-gray-400 text-sm">Seg a Sex</p>
              <span className="text-blue-500 text-sm mt-2 block">{contactInfo.openingHours.weekdays}</span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Quote({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

