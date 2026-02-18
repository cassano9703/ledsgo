import { NeonJobManager } from "@/components/admin/neon-job-manager";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen items-center p-8 bg-secondary">
            <div className="w-full max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Panel de Administrador</h1>
                    <p className="text-muted-foreground">Gestiona los trabajos de la galería de neón.</p>
                </div>
                <NeonJobManager />
            </div>
        </div>
    );
}
