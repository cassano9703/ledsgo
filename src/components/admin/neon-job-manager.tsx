'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { NeonJob } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

const jobSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  alt: z.string().min(10, 'El texto alternativo es importante para la accesibilidad.'),
  measurements: z.string().min(3, 'Especifica las medidas.'),
  colors: z.string().min(3, 'Añade al menos un color.'),
  city: z.string().min(3, 'Especifica la ciudad.'),
  objectPosition: z.string().optional(),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'Debes subir una imagen.'),
});

type JobFormValues = z.infer<typeof jobSchema>;

export function NeonJobManager() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const [neonJobs, setNeonJobs] = useState<NeonJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: '',
      alt: '',
      measurements: '',
      colors: '',
      city: '',
      objectPosition: 'center',
    },
  });

  const fetchJobs = async () => {
      if (!firestore) return;
      setIsLoading(true);
      try {
        const q = query(collection(firestore, 'neon_jobs'));
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NeonJob));
        // Sort jobs by creation date, newest first
        jobs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setNeonJobs(jobs);
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar los trabajos.' });
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchJobs();
  }, [firestore]);


  const onSubmit = async (data: JobFormValues) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo conectar a la base de datos.' });
      return;
    }
    
    const imageFile = data.image[0];
    if (!imageFile) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se ha seleccionado ninguna imagen.' });
        return;
    }

    try {
      // 1. Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `neon_jobs/${Date.now()}_${imageFile.name}`);
      const uploadResult = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      // 2. Save job data to Firestore
      const docData = {
        name: data.name,
        alt: data.alt,
        measurements: data.measurements,
        colors: data.colors,
        city: data.city,
        objectPosition: data.objectPosition,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(firestore, 'neon_jobs'), docData);
      
      toast({
        title: '¡Éxito!',
        description: 'El nuevo trabajo ha sido añadido a la galería.',
      });

      // Refetch jobs to get the latest list with the new item
      await fetchJobs();
      form.reset();

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
      toast({
        variant: 'destructive',
        title: 'Error al guardar',
        description: `Ocurrió un error al subir la imagen o guardar los datos. ${errorMessage}`,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'neon_jobs', id));
      toast({
        title: 'Eliminado',
        description: 'El trabajo ha sido eliminado de la galería.',
      });
      setNeonJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el trabajo.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Añadir Nuevo Trabajo</CardTitle>
          <CardDescription>
            Completa los detalles y sube la imagen para añadirla a la galería.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Proyecto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Skandaloso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto Alternativo (Descripción)</FormLabel>
                    <FormControl>
                      <Input placeholder="Letrero de neón fucsia en pared de ladrillos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Imagen del trabajo</FormLabel>
                <FormControl>
                    <Input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp" 
                        {...form.register("image")}
                    />
                </FormControl>
                <FormMessage>{form.formState.errors.image?.message as React.ReactNode}</FormMessage>
              </FormItem>
              <FormField
                control={form.control}
                name="measurements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medidas</FormLabel>
                    <FormControl>
                      <Input placeholder="150cm x 80cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colores (separados por coma)</FormLabel>
                    <FormControl>
                      <Input placeholder="Fuchsia, Cyan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input placeholder="Lima" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="objectPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posición de la imagen (CSS)</FormLabel>
                    <FormControl>
                      <Input placeholder="center 75%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Añadir Trabajo'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Trabajos en la Galería</CardTitle>
          <CardDescription>
            Lista de todos los trabajos actualmente en el catálogo de neón.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : (
                neonJobs?.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Image
                        src={job.imageUrl}
                        alt={job.alt}
                        width={40}
                        height={40}
                        className="rounded-md object-cover aspect-square"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>{job.city}</TableCell>
                    <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el trabajo de la galería.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(job.id)} className='bg-destructive hover:bg-destructive/90'>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
