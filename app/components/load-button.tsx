"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function LoadButton({
  children,
  className,
  variant,
  size,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: any;
  size?: any;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      variant={variant}
      size={size}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}
