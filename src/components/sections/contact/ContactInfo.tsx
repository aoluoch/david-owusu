import { Mail, MapPin, Phone } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";

export function ContactInfo() {
  const { contact } = useContent();

  return (
    <div className="p-8 rounded-2xl bg-navy text-white h-full flex flex-col gap-8">
      <div>
        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
          Get In Touch
        </p>
        <h3 className="font-heading text-2xl font-bold">Office Information</h3>
      </div>

      <ul className="space-y-6">
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-white hover:text-gold transition"
            >
              {contact.email}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest">
              Phone
            </p>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="text-white hover:text-gold transition"
            >
              {contact.phone}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest">
              Address
            </p>
            <p className="text-white">{contact.address}</p>
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
