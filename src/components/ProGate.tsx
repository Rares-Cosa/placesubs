import { Lock } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function ProGate({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative mt-15 mb-7">
      {/* Blurred, non-interactive preview */}
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-background/50">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-surface">
          <Lock className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">{title}</p>
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>
        <UpgradeButton />
      </div>
    </div>
  );
}