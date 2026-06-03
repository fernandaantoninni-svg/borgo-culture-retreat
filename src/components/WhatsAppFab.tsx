import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/393331234567?text=Ciao%20Borgo%20Cultura!%20Vorrei%20informazioni."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contatta su WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
