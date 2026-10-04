import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/**
 * Floating WhatsApp button. The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER.
 * Until CEST confirms an official WhatsApp number, the button points to the contact
 * page instead of an invented number.
 */
export function WhatsAppButton() {
  const configured = Boolean(site.whatsappNumber);
  const classes =
    "no-print fixed bottom-5 right-5 z-40 flex min-h-14 items-center gap-2 rounded-full bg-[#1a7f4b] px-5 text-white shadow-lg " +
    "hover:bg-[#146b3f] focus-visible:outline-offset-4 sm:bottom-6 sm:right-6";

  if (configured) {
    return (
      <a
        href={whatsappLink(site.whatsappNumber, "Hello CEST, I would like to know more about your work.")}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label="Chat with CEST on WhatsApp (opens in a new tab)"
      >
        <WhatsAppIcon width={26} height={26} />
        <span className="hidden font-semibold sm:inline">WhatsApp us</span>
      </a>
    );
  }

  return (
    <Link
      href="/contact#whatsapp"
      className={classes}
      aria-label="Contact CEST (WhatsApp number to be confirmed)"
      title="WhatsApp number to be confirmed"
    >
      <WhatsAppIcon width={26} height={26} />
      <span className="hidden font-semibold sm:inline">Chat with us</span>
    </Link>
  );
}
