import { router } from '@inertiajs/react';
import { fr } from 'date-fns/locale';
import { Clock, MapPin, Package, User } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import Textarea from '../../components/ui/textarea';

const customFr = fr;

const timeSlots = [
    { time: '08:00', available: true },
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: false },
    { time: '18:00', available: true },
];

const services = [
    { id: 'standard', name: 'Repassage standard', price: '2€/pièce' },
    { id: 'delicat', name: 'Repassage délicat', price: '4€/pièce' },
    { id: 'linge-maison', name: 'Linge de maison', price: '3€/pièce' },
    { id: 'express', name: 'Service express (+50%)', price: 'Supplément' },
];

export default function BookingCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirmation'>('date');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        services: [] as string[],
        estimatedItems: '',
        notes: '',
    });

    const handleServiceChange = (serviceId: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            services: checked ? [...prev.services, serviceId] : prev.services.filter((s) => s !== serviceId),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.post(
            '/bookings',
            {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postal_code: formData.postalCode,
                services: formData.services,
                estimated_items: formData.estimatedItems,
                notes: formData.notes,
                booking_date: selectedDate?.toISOString().split('T')[0],
                booking_time: selectedTime,
            },
            {
                onSuccess: () => setStep('confirmation'),
                onError: (errors) => {
                    console.error('Validation errors', errors);
                },
            },
        );
    };

    // const handleSubmit = () => {
    //     // Ici vous pourriez envoyer les données à votre backend
    //     console.log('Réservation:', {
    //         date: selectedDate,
    //         time: selectedTime,
    //         ...formData,
    //     });
    //     setStep('confirmation');
    // };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (step === 'confirmation') {
        return (
            <Card className="mx-auto w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-green-600">Réservation confirmée !</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div className="space-y-2">
                        <p className="text-lg">Merci {formData.firstName} pour votre réservation</p>
                        <div className="space-y-2 rounded-lg bg-slate-50 p-4 text-slate-800">
                            <p>
                                <strong>Date :</strong> {selectedDate && formatDate(selectedDate)}
                            </p>
                            <p>
                                <strong>Heure :</strong> {selectedTime}
                            </p>
                            <p>
                                <strong>Adresse :</strong> {formData.address}, {formData.city}
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-600">
                        Vous recevrez un email de confirmation à {formData.email} avec tous les détails. Notre équipe vous contactera 24h avant le
                        rendez-vous.
                    </p>
                    <Button
                        onClick={() => {
                            setStep('date');
                            setSelectedDate(undefined);
                            setSelectedTime(undefined);
                            setFormData({
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                address: '',
                                city: '',
                                postalCode: '',
                                services: [],
                                estimatedItems: '',
                                notes: '',
                            });
                        }}
                        className="bg-slate-800 text-slate-100 hover:bg-slate-500"
                    >
                        Nouvelle réservation
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-auto w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Réserver votre service de repassage</CardTitle>
                <div className="mt-4 flex justify-center space-x-4">
                    <Badge variant={step === 'date' ? 'default' : 'outline'} className="px-3 py-1">
                        1. Date
                    </Badge>
                    <Badge variant={step === 'time' ? 'default' : 'outline'} className="px-3 py-1">
                        2. Heure
                    </Badge>
                    <Badge variant={step === 'details' ? 'default' : 'outline'} className="px-3 py-1">
                        3. Détails
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {step === 'date' && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="text-center">
                            <h3 className="mb-4 text-lg font-semibold">Choisissez une date</h3>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => date < new Date() || date.getDay() === 0}
                                locale={customFr}
                                className="rdp mx-auto rounded-md border [&_.rdp-weekday]:border [&_.rdp-weekday]:bg-slate-800 [&_.rdp-weekday]:text-center [&_.rdp-weekday]:font-normal"
                            />
                            <p className="mt-2 text-sm text-slate-600">* Service disponible du lundi au samedi</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => setStep('time')}
                                disabled={!selectedDate}
                                className="bg-slate-800 font-bold tracking-wider text-slate-100 hover:bg-slate-700"
                            >
                                Continuer
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'time' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="mb-2 text-lg font-semibold">Choisissez un créneau</h3>
                            <p className="mb-6 text-slate-600">{selectedDate && formatDate(selectedDate)}</p>
                            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
                                {timeSlots.map((slot) => (
                                    <Button
                                        key={slot.time}
                                        variant={selectedTime === slot.time ? 'default' : 'outline'}
                                        disabled={!slot.available}
                                        onClick={() => setSelectedTime(slot.time)}
                                        className="h-12"
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        {slot.time}
                                    </Button>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-slate-600">Les créneaux grisés ne sont pas disponibles</p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <Button variant="outline" onClick={() => setStep('date')}>
                                Retour
                            </Button>
                            <Button
                                onClick={() => setStep('details')}
                                disabled={!selectedTime}
                                className="bg-slate-800 font-bold tracking-wider text-slate-100 hover:bg-slate-700"
                            >
                                Continuer
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'details' && (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="rounded-lg bg-slate-50 p-4 text-slate-950">
                                <h3 className="mb-2 font-semibold">Récapitulatif</h3>
                                <p>
                                    <strong>Date :</strong> {selectedDate && formatDate(selectedDate)}
                                </p>
                                <p>
                                    <strong>Heure :</strong> {selectedTime}
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <h3 className="flex items-center text-lg font-semibold">
                                        <User className="mr-2 h-5 w-5" />
                                        Informations personnelles
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">Prénom *</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Nom *</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Téléphone *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="flex items-center text-lg font-semibold">
                                        <MapPin className="mr-2 h-5 w-5" />
                                        Adresse de service
                                    </h3>
                                    <div>
                                        <Label htmlFor="address">Adresse *</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">Ville *</Label>
                                            <Input
                                                id="city"
                                                value={formData.city}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="postalCode">Code postal *</Label>
                                            <Input
                                                id="postalCode"
                                                value={formData.postalCode}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="flex items-center text-lg font-semibold">
                                    <Package className="mr-2 h-5 w-5" />
                                    Services demandés
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {services.map((service) => (
                                        <div key={service.id} className="flex items-center space-x-2 rounded-lg border p-3">
                                            <Checkbox
                                                id={service.id}
                                                checked={formData.services.includes(service.id)}
                                                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor={service.id} className="cursor-pointer font-medium">
                                                    {service.name}
                                                </Label>
                                                <p className="text-sm text-slate-600">{service.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="estimatedItems">Nombre estimé de pièces</Label>
                                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, estimatedItems: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1-10 pièces</SelectItem>
                                            <SelectItem value="11-20">11-20 pièces</SelectItem>
                                            <SelectItem value="21-30">21-30 pièces</SelectItem>
                                            <SelectItem value="30+">Plus de 30 pièces</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="notes">Notes supplémentaires</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Instructions spéciales, accès à votre domicile, etc."
                                    value={formData.notes}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                                />
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button variant="outline" onClick={() => setStep('time')}>
                                    Retour
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={
                                        !formData.firstName ||
                                        !formData.lastName ||
                                        !formData.email ||
                                        !formData.phone ||
                                        !formData.address ||
                                        !formData.city ||
                                        formData.services.length === 0
                                    }
                                    className="bg-slate-800 text-slate-100 hover:bg-slate-500"
                                >
                                    Confirmer la réservation
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
