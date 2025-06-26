<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters' => request()->all('search', 'trashed'),
            'total_bookings' => Booking::count(),
        //     'trashed' => Booking::onlyTrashed()->count(),
        //     'services' => Booking::distinct()->pluck('services')->flatten()->unique(),
        //     'estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique(),
        //     'booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique(),
        //     'booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique(),
        //     'cities' => Booking::distinct()->pluck('city')->filter()->unique(),
        //     'postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique(),
        //     'total_services' => Booking::distinct()->pluck('services')->flatten()->unique()->count(),
        //     'total_estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique()->count(),
        //     'total_booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique()->count(),
        //     'total_booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique()->count(),
        //     'total_cities' => Booking::distinct()->pluck('city')->filter()->unique()->count(),
        //     'total_postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique()->count(),
        // ])->with([
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $booking = Booking::findOrFail($id);
        return Inertia::render('Bookings/Create', [
            'booking' => $booking,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'services' => 'required|array|min:1',
            'estimated_items' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'booking_date' => 'required|date',
            'booking_time' => 'required|date_format:H:i',
        ]);

        $booking = Booking::create($validated);

        return Redirect::back()->with('success', 'Réservation enregistrée');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        return Inertia::render('Bookings/Edit', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'services' => 'required|array|min:1',
            'estimated_items' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'booking_date' => 'required|date',
            'booking_time' => 'required|date_format:H:i',
        ]);

        $booking->update($validated);

        return response()->json(['message' => 'Réservation mise à jour', 'data' => $booking], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json(['message' => 'Réservation supprimée'], 204);
    }
}
