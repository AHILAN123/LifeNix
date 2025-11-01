import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Stethoscope, MapPin, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

const doctors = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    location: 'Mumbai, MH',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  },
  {
    id: '2',
    name: 'Dr. Rohan Gupta',
    specialty: 'Dermatologist',
    location: 'Delhi, DL',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
  },
  {
    id: '3',
    name: 'Dr. Ananya Reddy',
    specialty: 'Pediatrician',
    location: 'Bangalore, KA',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Neurologist',
    location: 'Chennai, TN',
    image: PlaceHolderImages.find(p => p.id === 'find-doctor'),
  },
];

export default function DoctorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-10">
            <Stethoscope className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-headline font-bold">Find Your Doctor</h1>
            <p className="text-lg text-muted-foreground mt-2">Search for specialists and book appointments with ease.</p>
        </div>

        <Card className="mb-8 p-6 shadow-lg">
          <form className="grid md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="name-specialty">Doctor or Specialty</Label>
              <Input id="name-specialty" placeholder="e.g., Cardiologist" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Mumbai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input id="availability" type="date" />
            </div>
            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.filter(d => d.image).map(doctor => (
            <Card key={doctor.id} className="overflow-hidden transition-shadow hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image src={doctor.image!.imageUrl} alt={doctor.name} fill className="object-cover" data-ai-hint={doctor.image!.imageHint}/>
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                 <Avatar className="w-24 h-24 mx-auto -mt-12 border-4 border-background_white">
                    <AvatarImage src={doctor.image!.imageUrl} alt={doctor.name} data-ai-hint={doctor.image!.imageHint} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                 </Avatar>
                <h3 className="font-headline text-xl mt-4">{doctor.name}</h3>
                <p className="text-primary font-medium">{doctor.specialty}</p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
                <Button asChild className="mt-4 w-full">
                  <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
