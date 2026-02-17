'use client';

import { useAuth, useUser } from "@/firebase/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { NeonJobManager } from "@/components/admin/neon-job-manager";

export default function AdminDashboardPage() {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/admin/login');
        }
    }, [user, isUserLoading, router]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/admin/login');
    };

    if (isUserLoading || !user) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen items-center p-8">
            <div className="w-full max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Panel de Administrador</h1>
                    <Button onClick={handleLogout} variant="outline">Cerrar Sesión</Button>
                </div>
                <NeonJobManager />
            </div>
        </div>
    );
}
