<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'postal_code',
        'services', 'estimated_items', 'notes', 'booking_date', 'booking_time',
    ];

    protected $casts = [
        'services' => 'array',
        'booking_date' => 'date',
        'booking_time' => 'datetime:H:i',
    ];

}
