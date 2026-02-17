'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@/firebase/provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { signInWithEmailAndPassword } from "firebase/auth";

const loginSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        // The useEffect will handle the redirect on successful login.
    } catch (error: any) {
        let message = "Ocurrió un error al iniciar sesión.";
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                message = "El correo electrónico o la contraseña son incorrectos.";
                break;
            case 'auth/invalid-email':
                message = "El formato del correo electrónico no es válido.";
                break;
            default:
                message = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
        }
        setAuthError(message);
    }
  };

  if (isUserLoading || user) {
    return (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    )
  }

  return (
    <>
        {authError && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{authError}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input type="email" placeholder="admin@ledsgo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Iniciar Sesión
                </Button>
            </form>
        </Form>
    </>
  );
}
