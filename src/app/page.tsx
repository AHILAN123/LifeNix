import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, Stethoscope, ShieldCheck, Pill, Truck } from 'lucide-react';

const featureCards = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Symptom Checker',
    description: 'Get a preliminary analysis of your symptoms with our intelligent AI.',
    link: '/symptom-checker',
    image: PlaceHolderImages.find(p => p.id === 'symptom-checker'),
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: 'Find Doctors',
    description: 'Easily search for and book appointments with top specialists near you.',
    link: '/doctors',
    image: PlaceHolderImages.find(p => p.id === 'find-doctor'),
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Medical Vault',
    description: 'Securely store and manage your medical records in one place.',
    link: '/medical-vault',
    image: PlaceHolderImages.find(p => p.id === 'medical-vault'),
  },
  {
    icon: <Pill className="h-8 w-8 text-primary" />,
    title: 'Medicine Delivery',
    description: 'Order your prescribed medicines online and get them delivered to your doorstep.',
    link: '/medicine-delivery',
    image: PlaceHolderImages.find(p => p.id === 'medicine-delivery'),
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Ambulance Booking',
    description: 'Book an ambulance in emergencies with real-time tracking.',
    link: '/ambulance',
    image: PlaceHolderImages.find(p => p.id === 'ambulance-booking'),
  },
];

const testimonials = [
  {
    name: 'Priya S.',
    role: 'Patient',
    text: 'LifeNix made it so easy to find a specialist for my condition. The booking process was seamless!',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  },
  {
    name: 'Dr. Rajesh K.',
    role: 'Cardiologist',
    text: 'The platform helps me manage my appointments efficiently and connect with my patients better.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
  },
  {
    name: 'Amit L.',
    role: 'Patient',
    text: 'The AI symptom checker gave me a good idea of what to do next. It was very reassuring.',
    image: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-secondary/30 py-20 md:py-32">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                Your Health, <span className="text-primary">Simplified.</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                LifeNix is your all-in-one health companion. From symptom analysis to medicine delivery, we've got you covered.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/symptom-checker">Check Symptoms</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              {heroImage && <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Comprehensive Healthcare at Your Fingertips</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                All the medical services you need, accessible from anywhere, anytime.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureCards.filter(f => f.image).map((feature, index) => (
                <Card key={index} className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                  {feature.image && (
                    <div className="relative h-48 w-full">
                       <Image
                          src={feature.image.imageUrl}
                          alt={feature.image.description}
                          fill
                          className="object-cover"
                          data-ai-hint={feature.image.imageHint}
                        />
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="link" className="p-0" asChild>
                      <Link href={feature.link}>Learn More &rarr;</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Loved by Patients and Doctors</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users are saying about their LifeNix experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                       {testimonial.image && <Avatar>
                        <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>}
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">&quot;{testimonial.text}&quot;</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="bg-primary/20 rounded-lg p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Take Control of Your Health?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who are managing their health more effectively with LifeNix.
              </p>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/signup">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
