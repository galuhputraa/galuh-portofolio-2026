"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/ui/MotionProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
}
