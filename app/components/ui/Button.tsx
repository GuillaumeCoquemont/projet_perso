import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    isLoading?: boolean;
  };

type ButtonLinkProps = CommonProps & {
  as: "link";
  href: string;
  prefetch?: boolean;
};

function baseClasses(variant: Variant, size: Size) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
  }[size];

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    secondary:
      "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  }[variant];

  return cn(base, sizes, variants);
}

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(baseClasses(variant, size), className)}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? "…" : children}
    </button>
  );
}

export function ButtonLink({
  variant = "secondary",
  size = "md",
  className,
  children,
  href,
  prefetch,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(baseClasses(variant, size), className)}
    >
      {children}
    </Link>
  );
}