'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30',
      secondary:
        'bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700 hover:border-amber-500/50 hover:text-amber-500',
      ghost:
        'bg-white/5 text-white hover:bg-white/10 hover:text-amber-500',
      outline:
        'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        </span>

        {/* Icon */}
        {icon && !loading && <span className="relative z-10">{icon}</span>}

        {/* Loading spinner */}
        {loading && (
          <span className="relative z-10 animate-spin">
            <Loader2 className="w-5 h-5" />
          </span>
        )}

        {/* Children */}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

// Motion Button with animations
interface MotionButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const MotionButton = motion.create(Button);

// Card Component
interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'premium';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = 'default', hover = false, children, ...props },
    ref
  ) => {
    const variants = {
      default: 'bg-gray-900/80 border border-gray-800',
      glass: 'glass',
      premium: 'card-premium',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-3xl p-8',
          variants[variant],
          hover && 'card-hover cursor-pointer',
          className
        )}
        whileHover={hover ? { y: -10, scale: 1.02 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Badge Component
interface BadgeProps extends HTMLMotionProps<'span'> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'premium';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-800 text-gray-300',
      success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30',
      premium: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-500 border border-amber-500/30',
    };

    return (
      <motion.span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
          variants[variant],
          className
        )}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';

// Section Wrapper
interface SectionProps extends HTMLMotionProps<'section'> {
  variant?: 'default' | 'hero' | 'gradient' | 'dark';
  pattern?: 'grid' | 'dots' | 'circles' | 'none';
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { className, variant = 'default', pattern = 'none', children, ...props },
    ref
  ) => {
    const variants = {
      default: 'bg-black',
      hero: 'section-hero',
      gradient: 'bg-gradient-to-b from-black via-gray-900/50 to-black',
      dark: 'bg-gray-900/30',
    };

    const patterns = {
      grid: 'bg-pattern-grid',
      dots: 'bg-pattern-dots',
      circles: 'bg-pattern-circles',
      none: '',
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          'relative py-24 px-4',
          variants[variant],
          patterns[pattern],
          className
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

// Container
interface ContainerProps extends HTMLMotionProps<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    };

    return (
      <motion.div
        ref={ref}
        className={cn('mx-auto px-4', sizes[size], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Container.displayName = 'Container';

// Heading
interface HeadingProps extends HTMLMotionProps<'h2'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl',
      xl: 'text-5xl md:text-6xl',
    };

    return (
      <motion.h2
        ref={ref}
        className={cn(
          'font-bold leading-tight',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.h2>
    );
  }
);

Heading.displayName = 'Heading';

// Paragraph
const Paragraph = forwardRef<HTMLParagraphElement, HTMLMotionProps<'p'>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={cn(
          'text-gray-400 text-lg leading-relaxed',
          className
        )}
        {...props}
      />
    );
  }
);

Paragraph.displayName = 'Paragraph';

// Divider
interface DividerProps extends HTMLMotionProps<'hr'> {
  variant?: 'default' | 'gradient' | 'dashed';
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'border-gray-800',
      gradient:
        'h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent',
      dashed:
        'border-t-2 border-dashed border-gray-800',
    };

    return (
      <motion.hr
        ref={ref}
        className={cn('my-8', variants[variant], className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export {
  Button,
  MotionButton,
  Card,
  Badge,
  Section,
  Container,
  Heading,
  Paragraph,
  Divider,
};

