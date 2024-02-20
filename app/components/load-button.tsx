"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function LoadButton({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} className="w-full" type="submit" aria-disabled={pending}>
      {pending ? "loading" : children}
    </Button>
  );
}
