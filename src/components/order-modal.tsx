"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { FontConfig, SizeConfig } from "@/lib/config";

const orderSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  phone: z.string().min(9, "Por favor, introduce un número de teléfono válido."),
  address: z.string().min(10, "Por favor, introduce una dirección de envío completa."),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    text: string;
    text2?: string;
    font: FontConfig;
    color: string;
    size: SizeConfig;
    capturedImage: string | null;
  };
}

export function OrderModal({ isOpen, onClose, config }: OrderModalProps) {
  const { toast } = useToast();
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log("Pedido realizado:", { customer: data, sign: config });
    toast({
      title: "🎉 ¡Pedido Realizado!",
      description: "¡Gracias! Hemos recibido tu pedido y nos pondremos en contacto en breve.",
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Realiza tu Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-center">Vista Previa Final</h4>
            {config.capturedImage ? (
              <div className="rounded-md overflow-hidden border bg-slate-900">
                <Image 
                  src={config.capturedImage} 
                  alt="Vista previa del letrero LED"
                  width={450}
                  height={253}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-slate-200 animate-pulse rounded-md" />
            )}
             <p className="text-xs text-muted-foreground mt-1">Este es un render. El producto final puede tener ligeras variaciones.</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Ej: 912 345 678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Envío</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle Principal 123, Ciudad, País" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Confirmar Pedido</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
