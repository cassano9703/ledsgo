import { AdminLoginForm } from "@/components/admin-login-form";
import { Logo } from "@/components/icons";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary">
       <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-2xl shadow-2xl">
        <div className="flex justify-center">
            <Link href="/">
                <Logo className="h-12 w-24" />
            </Link>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
            Panel de Administrador
          </h1>
          <p className="mt-2 text-muted-foreground">
            Inicia sesión para gestionar tu contenido.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
