import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/payload-types";

export function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            What I do
          </p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase">
            Services & <span className="text-brand-gradient">disciplines</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <div className="group h-full bg-background p-7 transition-colors hover:bg-foreground/[0.02]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03] text-primary transition group-hover:border-primary/40">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  {s.number && (
                    <span className="font-mono text-xs text-foreground/55">{s.number}</span>
                  )}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{s.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
