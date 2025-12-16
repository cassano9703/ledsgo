"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import type { FontConfig, SizeConfig, BackgroundConfig } from "@/lib/config";

const orderSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  address: z.string().min(10, "Por favor, introduce una dirección de envío completa."),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    text: string;
    font: FontConfig;
    color: string;
    size: SizeConfig;
    background: BackgroundConfig;
  };
}

export function OrderModal({ isOpen, onClose, config }: OrderModalProps) {
  const { toast } = useToast();
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Realiza tu Pedido</DialogTitle>
          <DialogDescription>
            Revisa tu diseño y proporciona tus datos de envío para completar la compra.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md border p-4">
            <h4 className="font-semibold mb-2">Tu Letrero:</h4>
            <p className="text-sm"><strong>Texto:</strong> {config.text}</p>
            <p className="text-sm"><strong>Fuente:</strong> {config.font.name}</p>
            <p className="text-sm flex items-center"><strong>Color:</strong>
              <span className="w-4 h-4 rounded-full inline-block ml-2 border" style={{ backgroundColor: config.color }}></span>
            </p>
            <p className="text-sm"><strong>Tamaño:</strong> {config.size.name}</p>
            <p className="text-sm"><strong>Fondo:</strong> {config.background.name}</p>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@ejemplo.com" {...field} />
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
