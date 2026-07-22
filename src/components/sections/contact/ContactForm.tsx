import type { SubmissionType } from "../../../types/content";
import { InquiryForm } from "../../forms/InquiryForm";

const inquiryTypes: SubmissionType[] = [
  "Speaking Invitation",
  "Business Inquiry",
  "Prayer Request",
  "Media Request",
  "Partnership",
];

/**
 * Public contact form. Submissions are saved to Appwrite and surface in the
 * admin "Messages" area.
 */
export function ContactForm() {
  return (
    <InquiryForm
      defaultType="Speaking Invitation"
      types={inquiryTypes}
      eyebrow="Contact Form"
      title="Send us a message"
      messagePlaceholder="Tell us more about how we can help…"
    />
  );
}
