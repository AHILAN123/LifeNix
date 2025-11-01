'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AuthForm() {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const [role, setRole] = useState('Patient');

  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const description = isLogin
    ? 'Enter your credentials to access your account.'
    : 'Join LifeNix to manage your health with ease.';
  const buttonText = isLogin ? 'Login' : 'Sign Up';
  const linkText = isLogin ? "Don't have an account?" : 'Already have an account?';
  const linkHref = isLogin ? '/signup' : '/login';

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl">LifeNix</span>
          </Link>
          <CardTitle className="font-headline text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label>I am a...</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Patient">Patient</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Driver">Ambulance Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" className="w-full">{buttonText}</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {linkText}{' '}
            <Link href={linkHref} className="underline">
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
