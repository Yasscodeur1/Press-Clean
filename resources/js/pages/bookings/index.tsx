import { usePage } from '@inertiajs/react';

interface Booking {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export default function Index() {
    const { bookings } = usePage().props as unknown as { bookings: Booking[] };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Liste des réservations</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.first_name} {booking.last_name} – {booking.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
