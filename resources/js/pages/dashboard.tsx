"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Trash2,
} from "lucide-react"
// Booking type definition
export type Booking = {
  id: string
  date: string
  time: string
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  services: string[]
  estimatedItems: string
  notes?: string
  createdAt: string
  totalEstimate?: number
}

// Données simulées pour l'exemple
const mockBookings: Booking[] = [
  {
    id: "1",
    date: "2024-01-15",
    time: "09:00",
    status: "pending",
    customer: {
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie.dupont@email.com",
      phone: "01 23 45 67 89",
      address: "123 Rue de la Paix",
      city: "Paris",
      postalCode: "75001",
    },
    services: ["standard", "delicat"],
    estimatedItems: "11-20",
    notes: "Appartement au 3ème étage, code 1234",
    createdAt: "2024-01-10T10:30:00Z",
    totalEstimate: 45,
  },
  {
    id: "2",
    date: "2024-01-15",
    time: "14:00",
    status: "confirmed",
    customer: {
      firstName: "Jean",
      lastName: "Martin",
      email: "jean.martin@email.com",
      phone: "01 98 76 54 32",
      address: "456 Avenue des Champs",
      city: "Paris",
      postalCode: "75008",
    },
    services: ["standard", "linge-maison"],
    estimatedItems: "21-30",
    notes: "",
    createdAt: "2024-01-08T14:15:00Z",
    totalEstimate: 65,
  },
  {
    id: "3",
    date: "2024-01-16",
    time: "10:00",
    status: "completed",
    customer: {
      firstName: "Sophie",
      lastName: "Bernard",
      email: "sophie.bernard@email.com",
      phone: "01 11 22 33 44",
      address: "789 Boulevard Saint-Germain",
      city: "Paris",
      postalCode: "75006",
    },
    services: ["delicat", "express"],
    estimatedItems: "1-10",
    notes: "Vêtements de soirée uniquement",
    createdAt: "2024-01-12T16:45:00Z",
    totalEstimate: 80,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmé",
  "in-progress": "En cours",
  completed: "Terminé",
  cancelled: "Annulé",
}

const serviceLabels = {
  standard: "Repassage standard",
  delicat: "Repassage délicat",
  "linge-maison": "Linge de maison",
  express: "Service express",
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  // Filtrage des réservations
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.includes(searchTerm)

      const matchesStatus = statusFilter === "all" || booking.status === statusFilter

      const matchesDate = !selectedDate || booking.date === selectedDate.toISOString().split("T")[0]

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [bookings, searchTerm, statusFilter, selectedDate])

  // Statistiques
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)

    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      today: bookings.filter((b) => b.date === today).length,
      revenue: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + (b.totalEstimate || 0), 0),
    }
  }, [bookings])

  const updateBookingStatus = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  const deleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
            <p className="text-slate-600">Gestion des réservations RepassPro</p>
          </div>
          <Button className="bg-slate-800 hover:bg-slate-700">Nouvelle réservation</Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total réservations</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.today}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-green-600">{stats.revenue}€</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Filtres */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Rechercher par nom, email ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="confirmed">Confirmé</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="w-full md:w-48">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des réservations */}
            <Card>
              <CardHeader>
                <CardTitle>Réservations ({filteredBookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-4">
                            <Badge className={statusColors[booking.status]}>{statusLabels[booking.status]}</Badge>
                            <span className="font-medium">
                              {booking.customer.firstName} {booking.customer.lastName}
                            </span>
                            <span className="text-sm text-slate-600">#{booking.id}</span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {new Date(booking.date).toLocaleDateString("fr-FR")} à {booking.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {booking.customer.city}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              {booking.estimatedItems} pièces
                            </div>
                            {booking.totalEstimate && (
                              <div className="font-medium text-green-600">{booking.totalEstimate}€</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Détails de la réservation #{booking.id}</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && <BookingDetails booking={selectedBooking} />}
                            </DialogContent>
                          </Dialog>

                          {booking.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}

                          {booking.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "in-progress")}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}

                          {booking.status === "in-progress" && (
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "completed")}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune réservation trouvée</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView bookings={bookings} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Composant pour les détails d'une réservation
function BookingDetails({ booking }: { booking: Booking }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informations client
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Nom :</strong> {booking.customer.firstName} {booking.customer.lastName}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {booking.customer.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {booking.customer.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {booking.customer.address}, {booking.customer.city} {booking.customer.postalCode}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Détails du service
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Date :</strong> {new Date(booking.date).toLocaleDateString("fr-FR")}
            </p>
            <p>
              <strong>Heure :</strong> {booking.time}
            </p>
            <p>
              <strong>Statut :</strong>{" "}
              <Badge className={statusColors[booking.status]}>{statusLabels[booking.status]}</Badge>
            </p>
            <p>
              <strong>Estimation :</strong> {booking.estimatedItems} pièces
            </p>
            {booking.totalEstimate && (
              <p>
                <strong>Devis :</strong> {booking.totalEstimate}€
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          Services demandés
        </h3>
        <div className="flex flex-wrap gap-2">
          {booking.services.map((service) => (
            <Badge key={service} variant="outline">
              {serviceLabels[service as keyof typeof serviceLabels]}
            </Badge>
          ))}
        </div>
      </div>

      {booking.notes && (
        <div className="space-y-4">
          <h3 className="font-semibold">Notes</h3>
          <p className="text-sm bg-slate-50 p-3 rounded-lg">{booking.notes}</p>
        </div>
      )}

      <div className="text-xs text-slate-500">
        Réservation créée le {new Date(booking.createdAt).toLocaleString("fr-FR")}
      </div>
    </div>
  )
}

// Composant vue calendrier
function CalendarView({ bookings }: { bookings: Booking[] }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const bookingsForDate = bookings.filter((booking) => booking.date === selectedDate.toISOString().split("T")[0])

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Réservations du {selectedDate.toLocaleDateString("fr-FR")} ({bookingsForDate.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookingsForDate.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Aucune réservation pour cette date</p>
            ) : (
              bookingsForDate
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {booking.time} - {booking.customer.firstName} {booking.customer.lastName}
                      </p>
                      <p className="text-sm text-slate-600">{booking.customer.city}</p>
                    </div>
                    <Badge className={statusColors[booking.status]}>{statusLabels[booking.status]}</Badge>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Composant paramètres
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Créneaux horaires</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-4">Gérez les créneaux disponibles pour les réservations</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <Label>{time}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tarification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Repassage standard (€/pièce)</Label>
              <Input type="number" defaultValue="2" />
            </div>
            <div>
              <Label>Repassage délicat (€/pièce)</Label>
              <Input type="number" defaultValue="4" />
            </div>
            <div>
              <Label>Linge de maison (€/pièce)</Label>
              <Input type="number" defaultValue="3" />
            </div>
            <div>
              <Label>Supplément express (%)</Label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

