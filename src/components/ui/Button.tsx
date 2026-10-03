import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "cta" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 ease-out " +
  "hover:scale-[1.02] hover:shadow-md active:scale-[0.98] active:shadow-sm " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-dark text-white hover:bg-[#065f46] shadow-sm",
  // Dark text on orange keeps AA contrast (white on #F97316 does not).
  cta: "bg-cta text-ink hover:bg-[#fb8a3c] shadow-sm shadow-orange-500/20",
  outline: "bg-white text-ink border border-ink/15 hover:border-brand hover:text-brand-dark shadow-xs",
  ghost: "text-ink hover:bg-mist hover:shadow-none hover:scale-100 active:scale-95",
  danger: "bg-white text-red-700 border border-red-200 hover:bg-red-50 hover:border-red-300 shadow-xs",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<LinkProps, keyof CommonProps>)}>
        {children}
      </Link>
    );
  }
  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
