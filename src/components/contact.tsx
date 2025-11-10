'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Facebook, Instagram, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1GNs7rHjxD/', name: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/elshrief19?igsh=MXVtN2FjOTBia3N6ZA==', name: 'Instagram' },
    { icon: MessageSquare, href: 'https://wa.me/qr/JZWUNMBZIHD5A1', name: 'WhatsApp' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ahmad-elshrief-5960972a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', name: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ahmadelshrief53@gmail.com', name: 'Email' },
];

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`Message from ${values.name} via Portfolio`);
    const body = encodeURIComponent(values.message);
    const mailtoLink = `mailto:ahmadelshrief53@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    toast({
      title: 'Preparing Your Message!',
      description: "Your email client should open shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Have a question or want to work together? Leave a message.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." {...field} className="min-h-[120px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
                <h3 className="font-headline text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                    You can also find me on these platforms. I'm open for collaborations and new opportunities.
                </p>
                <div className="flex space-x-4 justify-center md:justify-start">
                    {socialLinks.map((link) => (
                        <Button key={link.name} variant="outline" size="icon" asChild>
                            <a href={link.href} aria-label={link.name} target="_blank" rel="noopener noreferrer">
                                <link.icon className="h-5 w-5" />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
