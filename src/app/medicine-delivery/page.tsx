import {Header } from '@/components/layout/Header';
import {Footer } from '@/components/layout/Footer';
import {Button } from '@/components/ui/button';
import {Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {PlaceHolderImages } from '@/lib/placeholder-images';
import {Input } from '@/components/ui/input';
import {Pill, Search, ShoppingCart, Upload } from 'lucide-react';
const medicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 150, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
  { id: 2, name: 'Ibuprofen 200mg', price: 250, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
  { id: 3, name: 'Amoxicillin 250mg', price: 400, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
  { id: 4, name: 'Cetirizine 10mg', price: 80, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
  { id: 5, name: 'Lisinopril 10mg', price: 320, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
  { id: 6, name: 'Metformin 500mg', price: 180, image: PlaceHolderImages.find(p => p.id === 'medicine-delivery') },
];
const medicineImage = PlaceHolderImages.find(p => p.id === 'medicine-delivery');

export default function MedicineDeliveryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
         <div className="text-center mb-10">
            <Pill className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-headline font-bold">Online Pharmacy</h1>
            <p className="text-lg text-muted-foreground mt-2">Get your medicines delivered to your doorstep.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
            <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for medicines..." className="pl-10 h-12 text-lg"/>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="w-full"><Upload className="mr-2 h-4 w-4"/>Upload Prescription</Button>
              <Button size="lg" variant="outline" className="relative">
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Button>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {medicines.map(med => (
            <Card key={med.id} className="group overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative h-40 w-full">
                        {medicineImage && <Image src={medicineImage.imageUrl} alt={med.name} fill className="object-cover" data-ai-hint="medicine package" />}
                    </div>
                    <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm truncate">{med.name}</h3>
                        <p className="font-bold text-lg">₹{med.price.toFixed(2)}</p>
                        <Button className="w-full" variant="secondary">Add to Cart</Button>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
