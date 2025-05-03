import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    };

    return (
      <div
        ref={ref}
        className={cn("animate-spin", sizeClasses[size], className)}
        {...props}
      >
        <div className="h-full w-full rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
export default Spinner;