import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin, Star, GraduationCap, Briefcase } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const doctorImage = PlaceHolderImages.find(p => p.id === 'testimonial-1');
const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch doctor data based on params.id
  const doctor = {
    id: params.id,
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    location: 'Mumbai, MH',
    bio: 'Dr. Priya Sharma is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She is dedicated to providing compassionate and comprehensive care to her patients.',
    rating: 4.9,
    reviews: 124,
    education: 'MD from All India Institute of Medical Sciences, Delhi',
    experience: 'Chief of Cardiology at Apollo Hospital, Mumbai',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/30 pb-12">
        <div className="relative h-48 bg-primary/20">
            {heroImage && <Image src={heroImage.imageUrl} alt="Abstract background" fill className="object-cover" data-ai-hint="abstract background"/>}
        </div>
        <div className="container mx-auto px-4 -mt-24">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card className="shadow-xl text-center p-6 sticky top-24">
                        <Avatar className="w-32 h-32 mx-auto border-4 border-background">
                            {doctorImage && <AvatarImage src={doctorImage.imageUrl} alt={doctor.name} data-ai-hint={doctorImage.imageHint} />}
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h1 className="font-headline text-3xl mt-4">{doctor.name}</h1>
                        <p className="text-primary font-semibold text-lg">{doctor.specialty}</p>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold">{doctor.rating}</span>
                            <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <Button size="lg" className="mt-6 w-full">Book Appointment</Button>
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">About Dr. {doctor.name.split(' ').pop()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                        </CardContent>
                    </Card>
                     <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Qualifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4">
                                <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Education</h4>
                                    <p className="text-muted-foreground text-sm">{doctor.education}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Briefcase className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Experience</h4>
                                    <p className="text-muted-foreground text-sm">{doctor.experience}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Appointment Availability</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <CalendarComponent
                                mode="single"
                                selected={new Date()}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
