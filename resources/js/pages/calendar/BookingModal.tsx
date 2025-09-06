import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../components/ui/dialog";
import BookingCalendar from "./BookingCalendar";

interface BookingModalProps {
  children: React.ReactNode;
}

export function BookingModal({ children }: BookingModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-7xl max-h-[100vh] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {/* Titre visible */}
            Booking Calendar
          </DialogTitle>
        <BookingCalendar />
      </DialogContent>
    </Dialog>
  )
}
