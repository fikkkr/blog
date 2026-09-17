import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "prose" | "wide";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-4xl",
    prose: "max-w-2xl",
    wide: "max-w-5xl",
  };

  return (
    <div
      className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
