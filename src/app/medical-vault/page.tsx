import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, MoreVertical, ShieldCheck, Eye, Download, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const medicalRecords = [
    { id: 'REC001', name: 'Annual Check-up', date: '2023-10-15', type: 'Lab Report' },
    { id: 'REC002', name: 'Dental X-Ray', date: '2023-08-22', type: 'Imaging' },
    { id: 'REC003', name: 'Prescription History', date: '2023-05-01', type: 'Prescription' },
    { id: 'REC004', name: 'MRI Scan - Knee', date: '2022-11-30', type: 'Imaging' },
];

export default function MedicalVaultPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="text-left">
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <h1 className="text-4xl font-headline font-bold">Medical Vault</h1>
                <p className="text-lg text-muted-foreground mt-2">Your secure and private space for all medical records.</p>
            </div>
            <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>My Records</CardTitle>
                <CardDescription>Browse and manage your uploaded medical documents.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date Uploaded</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicalRecords.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    {record.name}
                                </TableCell>
                                <TableCell>{record.type}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>View & Summarize</DropdownMenuItem>
                                        <DropdownMenuItem><Download className="mr-2 h-4 w-4"/>Download</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
