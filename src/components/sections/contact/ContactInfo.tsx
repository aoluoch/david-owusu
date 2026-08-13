import { Mail, MapPin, Phone } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";

export function ContactInfo() {
  const { contact } = useContent();

  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl bg-navy p-5 text-white sm:gap-8 sm:p-8">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
          Get In Touch
        </p>
        <h3 className="font-heading text-xl font-bold sm:text-2xl">
          Office Information
        </h3>
      </div>

      <ul className="space-y-5 sm:space-y-6">
        <li className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-blue-200">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="break-words text-white transition hover:text-gold"
            >
              {contact.email}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Phone size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-blue-200">
              Phone
            </p>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="break-words text-white transition hover:text-gold"
            >
              {contact.phone}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
            <MapPin size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-blue-200">
              Address
            </p>
            <p className="break-words text-white">{contact.address}</p>
          </div>
        </li>
      </ul>

      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-blue-100 text-sm">
          Response time: within 3 business days.
        </p>
      </div>
    </div>
  );
}
