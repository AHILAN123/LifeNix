'use client'
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Truck, MapPin, Phone, Star, Clock } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';

const MapPlaceholder = () => (
    <div className="relative h-[400px] lg:h-full w-full bg-muted rounded-lg border overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full text-muted-foreground/10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
       <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          className="opacity-60"
        >
          <path
            d="M 30 170 C 50 50, 150 150, 170 30"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4"
            className="animate-[dash_20s_linear_infinite] [stroke-dashoffset:0;]"
            style={{animation: 'dash 20s linear infinite'}}
          />
          <style>
            {`@keyframes dash { to { stroke-dashoffset: -1000; } }`}
          </style>
          <circle cx="30" cy="170" r="4" fill="hsl(var(--primary))" />
          <circle cx="170" cy="30" r="4" fill="hsl(var(--destructive))" />
        </svg>
      </div>
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-md text-xs">
        <p className="font-bold">From:</p>
        <p>123 MG Road, Bangalore</p>
      </div>
       <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-md text-xs">
        <p className="font-bold">To:</p>
        <p>Apollo Hospital, Jayanagar</p>
      </div>
    </div>
);

export default function AmbulancePage() {
    const [bookingState, setBookingState] = useState('idle'); // idle, searching, assigned, enroute
    const driverImage = PlaceHolderImages.find(p => p.id === 'testimonial-2');
    
    // This is to avoid hydration mismatch with `new Date()`
    const [eta, setEta] = useState('');
    useEffect(() => {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 8);
        setEta(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, []);

    const handleBooking = () => {
        setBookingState('searching');
        setTimeout(() => setBookingState('assigned'), 3000);
        setTimeout(() => setBookingState('enroute'), 5000);
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
                <Truck className="h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold">Ambulance Booking</h1>
                <p className="text-lg text-muted-foreground mt-2 mb-8">Request emergency assistance quickly and reliably.</p>
                {bookingState === 'idle' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Book an Ambulance</CardTitle>
                            <CardDescription>Enter your location to find the nearest ambulance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Your Location</Label>
                                <Input id="location" placeholder="Enter your current address" defaultValue="123 MG Road, Bangalore" />
                            </div>
                            <Button size="lg" className="w-full" onClick={handleBooking}>Request Now</Button>
                        </CardContent>
                    </Card>
                )}

                {bookingState === 'searching' && (
                     <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="animate-pulse flex flex-col items-center space-y-3 p-4">
                                <Clock className="h-10 w-10 text-primary" />
                                <p className="font-semibold text-lg">Searching for a nearby ambulance...</p>
                                <p className="text-sm text-muted-foreground">Please wait while we connect you to a driver.</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {(bookingState === 'assigned' || bookingState === 'enroute') && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Ambulance Assigned</CardTitle>
                            <CardDescription>Your ride is on the way. Estimated time of arrival is {eta}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    {driverImage && <AvatarImage src={driverImage.imageUrl} data-ai-hint="driver portrait"/>}
                                    <AvatarFallback>RG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-lg">Rajesh Kumar</p>
                                    <p className="text-sm text-muted-foreground">Ambulance Driver</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/> 4.8
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4 space-y-2">
                                <p className="font-semibold">Vehicle: <span className="font-normal text-muted-foreground">Ambulance - KA 01 AB 1234</span></p>
                                <div className="flex justify-between items-center">
                                    <Button variant="outline"><Phone className="mr-2 h-4 w-4"/> Call Driver</Button>
                                    <Button variant="ghost" className="text-destructive hover:text-destructive">Cancel Ride</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
            <div className="lg:sticky lg:top-24 h-full">
                <MapPlaceholder />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
