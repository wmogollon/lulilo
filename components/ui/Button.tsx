import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-coral text-white hover:bg-coral-deep shadow-soft hover:shadow-lift",
  secondary:
    "bg-white text-navy border border-navy/10 hover:border-navy/30 shadow-soft",
  ghost: "bg-transparent text-navy hover:bg-navy/5",
  dark: "bg-navy text-cloud hover:bg-navy-soft shadow-soft hover:shadow-lift",
};

const sizeStyles: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={clsx(base, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(base, variantStyles[variant], sizeStyles[size], className)}
    >
      {children}
    </Link>
  );
}
