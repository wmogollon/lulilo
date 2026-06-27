import { Button } from "@/components/ui/Button";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">Contact</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-4 text-navy/60">
          Questions about an order, a gift, or a partnership? Reach out below.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div className="space-y-6">
          <ContactItem icon={<Mail size={20} />} title="Email us" detail="hello@lulilo.com" />
          <ContactItem icon={<MessageCircle size={20} />} title="Live chat" detail="Mon–Fri, 9am–6pm ET" />
          <ContactItem icon={<MapPin size={20} />} title="Studio" detail="Powered by OPSLY · Remote-first" />
        </div>

        <form className="rounded-4xl bg-white border border-navy/5 shadow-soft p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Name</label>
              <input className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email</label>
              <input type="email" className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Message</label>
            <textarea rows={5} className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none resize-none" />
          </div>
          <Button size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl bg-mist p-6">
      <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-navy shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-display font-semibold text-navy">{title}</p>
        <p className="text-sm text-navy/50">{detail}</p>
      </div>
    </div>
  );
}
