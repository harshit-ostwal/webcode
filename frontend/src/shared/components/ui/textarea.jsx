import * as React from "react";

import { cn } from "@/shared/utils/cn";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      rows={5}
      className={cn(
        "flex w-full resize-none rounded-2xl border border-border px-4 py-4 text-[15px] transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
