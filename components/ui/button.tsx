import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassnames } from '@/lib/utils';

const defaultClasses = [
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-2xl',
  'font-semibold',
  'font-sans',
  'uppercase',
  'ring-offset-inherit',
  'transition-colors',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-4',
  'disabled:pointer-events-none',
  'disabled:opacity-50',
];

const buttonStyles = cva(defaultClasses, {
  variants: {
    size: {
      sm: ['px-3', 'py-1', 'text-sm'],
      md: ['px-6', 'py-2', 'text-md'],
      lg: ['px-8', 'py-2', 'text-xl'],
    },
    variant: {
      primary: [
        'bg-primary-3',
        'text-secondary-11',
        'focus-visible:ring-primary-5',
        'hover:bg-primary-4',
      ],
      secondary: [
        'bg-secondary-3',
        'text-secondary-11',
        'focus-visible:ring-primary-5',
        'hover:bg-secondary-4',
      ],
      danger: [
        'bg-danger-3',
        'text-secondary-11',
        'focus-visible:ring-danger-5',
        'hover:bg-danger-4',
      ],
    },
    variety: {
      solid: [''],
      outline: [
        'border',
        'border-primary-3',
        'hover-border-primary-8',
        'bg-transparent',
        'text-primary-3',
        'focus-visible:ring-primary-5',
        'hover:bg-primary-3',
        'hover:text-secondary-11',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    variety: 'solid',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      size = 'md',
      variant = 'primary',
      variety = 'solid',
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        className={mergeClassnames(
          buttonStyles({ className, size, variant, variety })
        )}
        {...props}
        ref={ref}>
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';
export default Button;
