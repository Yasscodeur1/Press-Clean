"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);

    // TODO: ajouter ici l'intégration API ou EmailJS
    alert("Votre demande a été envoyée !");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Demande de devis
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Décrivez votre projet..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full bg-slate-800 text-white hover:bg-slate-700">
            Envoyer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
