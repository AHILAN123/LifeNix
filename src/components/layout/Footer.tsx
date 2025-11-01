import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-xl">LifeNix</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your personal health companion.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/symptom-checker" className="text-sm text-muted-foreground hover:text-foreground">Symptom Checker</Link></li>
              <li><Link href="/doctors" className="text-sm text-muted-foreground hover:text-foreground">Find a Doctor</Link></li>
              <li><Link href="/medicine-delivery" className="text-sm text-muted-foreground hover:text-foreground">Pharmacy</Link></li>
              <li><Link href="/ambulance" className="text-sm text-muted-foreground hover:text-foreground">Ambulance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LifeNix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
