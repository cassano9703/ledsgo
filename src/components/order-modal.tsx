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
import type { FontConfig, SizeConfig } from "@/lib/config";

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(10, "Please enter a full shipping address."),
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
    console.log("Order placed:", { customer: data, sign: config });
    toast({
      title: "🎉 Order Placed!",
      description: "Thank you! We've received your order and will be in touch shortly.",
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place Your Order</DialogTitle>
          <DialogDescription>
            Review your design and provide your shipping details to complete the purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md border p-4">
            <h4 className="font-semibold mb-2">Your Sign:</h4>
            <p className="text-sm"><strong>Text:</strong> {config.text}</p>
            <p className="text-sm"><strong>Font:</strong> {config.font.name}</p>
            <p className="text-sm flex items-center"><strong>Color:</strong>
              <span className="w-4 h-4 rounded-full inline-block ml-2 border" style={{ backgroundColor: config.color }}></span>
            </p>
            <p className="text-sm"><strong>Size:</strong> {config.size.name}</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown, USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Confirm Order</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
