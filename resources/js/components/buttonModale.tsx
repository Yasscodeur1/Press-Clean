
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "./contactModal";

export default function DevisButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="border-white text-white hover:bg-white hover:text-slate-800 px-8"
        onClick={() => setIsOpen(true)}
      >
        Devis en ligne
      </Button>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
