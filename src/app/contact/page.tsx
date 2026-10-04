import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { ContactForm } from "@/components/forms/Forms";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} (CEST) at ${fullAddress}. Phone, email and contact form.`,
  path: "/contact",
});

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.locality}, ${site.address.country}`);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="We would love to hear from you. Reach CEST by phone, email or the form below."
        crumbs={[{ label: "Contact" }]}
      />
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div>
              <h2 className="text-2xl font-bold">{site.name} (CEST)</h2>
              <address className="mt-5 space-y-5 not-italic">
                <p className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-secondary-700" />
                  <span>
                    {site.address.street}, {site.address.locality}
                    <br />
                    {site.address.country}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-secondary-700" />
                  <span className="flex flex-col">
                    {site.phones.map((p) => (
                      <a key={p.tel} href={`tel:${p.tel}`} className="py-1 font-semibold hover:underline">
                        {p.display}
                      </a>
                    ))}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-secondary-700" />
                  <a href={`mailto:${site.email}`} className="break-all py-1 font-semibold hover:underline">
                    {site.email}
                  </a>
                </p>
              </address>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`tel:${site.phones[0].tel}`}>
                <Phone aria-hidden="true" className="size-5" /> Call us
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                <Mail aria-hidden="true" className="size-5" /> Email us
              </ButtonLink>
            </div>

            <div id="whatsapp" className="scroll-mt-28 rounded-2xl border border-sand-200 bg-white p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <WhatsAppIcon aria-hidden="true" /> WhatsApp
              </h3>
              {site.whatsappNumber ? (
                <ButtonLink
                  href={whatsappLink(site.whatsappNumber, "Hello CEST, I would like to know more about your work.")}
                  className="mt-3 !bg-[#1a7f4b] hover:!bg-[#146b3f]"
                >
                  Chat on WhatsApp
                </ButtonLink>
              ) : (
                <p className="mt-2 text-muted">
                  CEST’s official WhatsApp number is being confirmed. <Placeholder>[ADD WHATSAPP NUMBER]</Placeholder>
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="map-title">
        <h2 id="map-title" className="mb-6 text-2xl font-bold">
          Find us
        </h2>
        {site.mapEmbedUrl ? (
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-sand-200">
            <iframe
              title={`Map showing ${fullAddress}`}
              src={site.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-sand-300 bg-canvas p-8 text-center">
            <MapPin aria-hidden="true" className="size-10 text-secondary-700" />
            <p className="max-w-md text-muted">
              An embedded map will appear here once CEST confirms the map location.{" "}
              <Placeholder>[ADD GOOGLE MAPS EMBED URL]</Placeholder>
            </p>
            <ButtonLink href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} variant="outline">
              Open in Google Maps
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}
