import Image from "next/image";
import { getPartners } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Partners and supporters. No partner is invented: until CEST supplies approved logos
 * (src/data/partners.ts) this shows a clear placeholder. Real logos render in grayscale
 * and turn full colour on hover.
 */
export async function Partners() {
  const partners = await getPartners();
  return (
    <section aria-labelledby="partners-title" className="bg-canvas py-20 sm:py-28">
      <Container className="max-w-[90rem]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Partners & supporters</p>
            <h2 id="partners-title" className="font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">
              Working together
            </h2>
            <p className="mt-4 text-muted">We value the organizations and individuals who work alongside CEST.</p>
            <div className="mt-6">
              <ButtonLink href="/partner" variant="outline">
                Partner With CEST
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-8">
            {partners.length > 0 ? (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {partners.map((p) => (
                  <li key={p.name} className="flex h-24 items-center justify-center rounded-xl border border-sand-300 bg-white p-4">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={160}
                      height={64}
                      className="max-h-14 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Reveal>
                <ul aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="h-24 rounded-xl border-2 border-dashed border-sand-300 bg-white/60" />
                  ))}
                </ul>
                <p className="mt-4 text-center text-sm">
                  <Placeholder>[PARTNER LOGOS TO BE PROVIDED]</Placeholder>
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
