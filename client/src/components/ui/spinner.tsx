
import { cn } from "@/lib/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-primary h-6 w-6",
        className
      )}
    />
  );
}

export { Spinner };
export default Spinner;
