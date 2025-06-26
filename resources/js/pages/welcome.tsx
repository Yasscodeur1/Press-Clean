import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, Star, Phone, Mail, MapPin, CheckCircle, Shirt, Home, Calendar, Award } from "lucide-react"
import BarNav from "@/components/barNav"


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <BarNav />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-slate-300 text-slate-700">
                    Service professionnel à domicile
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
                    Repassage à domicile <span className="text-slate-600">de qualité</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Gagnez du temps avec notre service de repassage professionnel. Nous nous occupons de votre linge
                    pendant que vous profitez de votre temps libre.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white px-8">
                    Demander un devis gratuit
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-300 hover:bg-slate-50">
                    En savoir plus
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Service garanti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Équipe expérimentée</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/apprendre-repassage.jpeg"
                  alt="Service de repassage professionnel"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">Nos services de repassage</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Des solutions adaptées à tous vos besoins de repassage
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-slate-200 hover:shadow-lg transition-shadow bg-slate-100">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <Shirt className="h-8 w-8 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Repassage standard</h3>
                  <p className="text-slate-600">
                    Chemises, pantalons, robes et vêtements du quotidien repassés avec soin
                  </p>
                  <div className="text-2xl font-bold text-slate-800">À partir de 2€/pièce</div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 hover:shadow-lg transition-shadow bg-slate-100">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Repassage délicat</h3>
                  <p className="text-slate-600">Soie, lin, vêtements de luxe traités avec expertise et délicatesse</p>
                  <div className="text-2xl font-bold text-slate-800">À partir de 4€/pièce</div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 hover:shadow-lg transition-shadow bg-slate-100">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <Home className="h-8 w-8 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Linge de maison</h3>
                  <p className="text-slate-600">Draps, nappes, rideaux et linge de maison repassés à la perfection</p>
                  <div className="text-2xl font-bold text-slate-800">À partir de 3€/pièce</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section id="avantages" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">Pourquoi choisir RepassPro ?</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Clock className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Gain de temps</h3>
                <p className="text-slate-600">Libérez-vous de cette corvée et profitez de votre temps libre</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Shield className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Service assuré</h3>
                <p className="text-slate-600">Équipe assurée et formée pour un service en toute sécurité</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Star className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Qualité garantie</h3>
                <p className="text-slate-600">Résultat professionnel garanti ou nous repassons gratuitement</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Calendar className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Flexibilité</h3>
                <p className="text-slate-600">Rendez-vous selon votre planning, même le weekend</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">Comment ça marche ?</h2>
              <p className="text-xl text-slate-600">Un processus simple en 3 étapes</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Réservation</h3>
                <p className="text-slate-600">Contactez-nous par téléphone ou en ligne pour fixer un rendez-vous</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Collecte</h3>
                <p className="text-slate-600">Nous venons récupérer votre linge directement chez vous</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Livraison</h3>
                <p className="text-slate-600">Votre linge repassé vous est livré dans les 48h maximum</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-800 text-white">
          <div className="container mx-auto px-4 lg:px-6 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Prêt à gagner du temps ?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour votre premier devis gratuit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100 px-8">
                Appeler maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-800 px-8"
              >
                Devis en ligne
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shirt className="h-6 w-6" />
                <span className="text-lg font-bold">RepassPro</span>
              </div>
              <p className="text-slate-400">Votre service de repassage professionnel à domicile</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@repasspro.fr</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Paris et région parisienne</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <div className="space-y-2 text-slate-400">
                <div>Repassage standard</div>
                <div>Repassage délicat</div>
                <div>Linge de maison</div>
                <div>Service express</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Horaires</h3>
              <div className="space-y-2 text-slate-400">
                <div>Lun - Ven: 8h - 19h</div>
                <div>Samedi: 9h - 17h</div>
                <div>Dimanche: Sur demande</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} RepassPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
