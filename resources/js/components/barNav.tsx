import { Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react'
import { BookingModal } from "@/pages/calendar/BookingModal"


export default function barNav() {
  return (
    <div>
        
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shirt className="h-8 w-8 text-slate-700" />
            <span className="text-2xl font-bold text-slate-800">RepassPro</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-slate-600 hover:text-slate-800 hover:font-bold transition-colors">
              Services
            </Link>
            <Link href="#avantages" className="text-slate-600 hover:text-slate-800 hover:font-bold transition-colors">
              Avantages
            </Link>
            <Link href="#tarifs" className="text-slate-600 hover:text-slate-800 hover:font-bold transition-colors">
              Tarifs
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-slate-800 hover:font-bold transition-colors">
              Contact
            </Link>
          </nav>
          <BookingModal>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">Réserver maintenant</Button>
          </BookingModal>
          {/* <Link href="" className="bg-slate-800 hover:bg-slate-700 text-white">Réserver maintenant</Link> */}
        </div>


    </div>
  )
}
