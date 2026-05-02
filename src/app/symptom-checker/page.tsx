import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
const SymptomCheckerForm = () => {
    return (
        <form className="space-y-4">
            <Textarea
                placeholder="Describe your symptoms in detail. For example: 'I have a persistent headache and a slight fever for the last 2 days...'"
                rows={6}
            />
            <Button type="submit" className="w-full md:w-auto">Analyze Symptoms</Button>
        </form>
    );
};const AnalysisResults = () => {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="font-headline">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold">Preliminary Analysis</h3>
                    <p className="text-muted-foreground">Based on the symptoms you provided, here is a preliminary analysis. This is not a medical diagnosis.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Potential Conditions</h3>
                    <p className="text-muted-foreground">Common cold, flu, or sinus infection.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Recommended Specialties</h3>
                    <p className="text-muted-foreground">General Practitioner (GP)</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Risk Assessment</h3>
                    <p className="text-muted-foreground">Low</p>
                </div>
                <p className="text-sm text-destructive font-medium">Disclaimer: This AI analysis is for informational purposes only and should not be considered as a substitute for professional medical advice, diagnosis, or treatment.</p>
            </CardContent>
        </Card>
    );
}

export default function SymptomCheckerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <Bot className="h-12 w-12 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold">AI Symptom Checker</h1>
                <p className="text-lg text-muted-foreground mt-2">Get a quick insight into your health concerns.</p>
            </div><Card>
                <CardHeader>
                    <CardTitle className="font-headline">Describe Your Symptoms</CardTitle>
                    <CardDescription>AI will provide a preliminary analysis. Please be as detailed as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SymptomCheckerForm />
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
