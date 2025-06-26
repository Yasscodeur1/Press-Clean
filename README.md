# Press-Clean

    public function index()
    {
        $bookings = Booking::all();
        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        //     'filters' => request()->all('search', 'trashed'),
        //     'trashed' => Booking::onlyTrashed()->count(),
        //     'services' => Booking::distinct()->pluck('services')->flatten()->unique(),
        //     'estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique(),
        //     'booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique(),
        //     'booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique(),
        //     'cities' => Booking::distinct()->pluck('city')->filter()->unique(),
        //     'postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique(),
        //     'total_bookings' => Booking::count(),
        //     'total_services' => Booking::distinct()->pluck('services')->flatten()->unique()->count(),
        //     'total_estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique()->count(),
        //     'total_booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique()->count(),
        //     'total_booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique()->count(),
        //     'total_cities' => Booking::distinct()->pluck('city')->filter()->unique()->count(),
        //     'total_postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique()->count(),
        // ])->with([
        ]);
    }

Voici une explication détaillée de chaque ligne commentée dans ta méthode index() du contrôleur, ligne par ligne :

🔧 Méthode actuelle



public function index()
{
    $bookings = Booking::all();
    return Inertia::render('Bookings/Index', [
        'bookings' => $bookings,
Cette partie :

Récupère toutes les réservations (Booking::all()).

Les envoie à la vue Inertia (Bookings/Index) sous la clé 'bookings'.


# 📌 Explication des lignes commentées



// 'filters' => request()->all('search', 'trashed'),
✅ Récupère les filtres appliqués depuis la requête (ex : barre de recherche ou éléments supprimés).




// 'trashed' => Booking::onlyTrashed()->count(),
✅ Compte le nombre de réservations supprimées (si tu utilises le Soft Deletes dans Laravel).




// 'services' => Booking::distinct()->pluck('services')->flatten()->unique(),
✅ Récupère la liste unique de tous les services réservés.

pluck('services'): récupère toutes les valeurs de la colonne services.

flatten(): si c’est un tableau imbriqué (ex: ['lavage', 'repassage']), ça l’aplatit.

unique(): ne garde que les valeurs distinctes.




// 'estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique(),
✅ Récupère toutes les estimations d’articles uniques, en supprimant les doublons et les vides.




// 'booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique(),
✅ Liste des dates de réservation uniques, non nulles.




// 'booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique(),
✅ Liste des heures de réservation uniques, non nulles.




// 'cities' => Booking::distinct()->pluck('city')->filter()->unique(),
✅ Liste des villes différentes présentes dans les réservations.




// 'postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique(),
✅ Liste des codes postaux uniques issus des réservations.

📊 Statistiques globales (comptes)



// 'total_bookings' => Booking::count(),
✅ Nombre total de réservations enregistrées.




// 'total_services' => Booking::distinct()->pluck('services')->flatten()->unique()->count(),
✅ Nombre unique de services différents proposés dans les réservations.




// 'total_estimated_items' => Booking::distinct()->pluck('estimated_items')->filter()->unique()->count(),
✅ Nombre d'estimations d'articles différentes (ex: "1-10", "11-20", etc.).




// 'total_booking_dates' => Booking::distinct()->pluck('booking_date')->filter()->unique()->count(),
✅ Nombre de dates de réservation distinctes.




// 'total_booking_times' => Booking::distinct()->pluck('booking_time')->filter()->unique()->count(),
✅ Nombre d’horaires différents dans les réservations.




// 'total_cities' => Booking::distinct()->pluck('city')->filter()->unique()->count(),
✅ Nombre de villes uniques.




// 'total_postal_codes' => Booking::distinct()->pluck('postal_code')->filter()->unique()->count(),
✅ Nombre de codes postaux distincts.

📝 Remarque finale
Ces lignes sont très utiles pour :

Construire un tableau de bord admin (avec statistiques).

Fournir des filtres dynamiques dans ton interface utilisateur (ex: dropdowns de ville, service, date, etc.).

Tu veux que je te les réactive et optimise tout ça dans une version complète du contrôleur ?
