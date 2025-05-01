import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      await apiRequest("POST", "/api/contact", values);
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Our Office",
      content: "Samcom House, Ngong Road, Nairobi, Kenya",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+254 722 123 456 / +254 733 123 456",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "info@samcom.co.ke / sales@samcom.co.ke",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Working Hours",
      content: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM",
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Contact Us</h1>
            <p className="text-lg text-gray-700 mb-8">
              Get in touch with our team for any inquiries about properties, services, or partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our properties or services? Reach out to us and our team will get back to you as soon as possible.
              </p>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-light p-3 rounded-full text-primary mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.href} 
                      className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 font-heading">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
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
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+254 7XX XXX XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || "property-inquiry"}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="property-inquiry">Property Inquiry</SelectItem>
                            <SelectItem value="viewing-request">Viewing Request</SelectItem>
                            <SelectItem value="valuation">Property Valuation</SelectItem>
                            <SelectItem value="selling">Selling Property</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            rows={5} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit one of our offices across Kenya to meet our team in person.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 font-heading">Nairobi (Headquarters)</h3>
              <p className="flex items-start mb-3">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Samcom House, Ngong Road, Nairobi, Kenya</span>
              </p>
              <p className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>+254 722 123 456</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>nairobi@samcom.co.ke</span>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 font-heading">Mombasa</h3>
              <p className="flex items-start mb-3">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Marina Plaza, Nyali Road, Mombasa, Kenya</span>
              </p>
              <p className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>+254 733 123 456</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>mombasa@samcom.co.ke</span>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 font-heading">Kisumu</h3>
              <p className="flex items-start mb-3">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Lake Plaza, Oginga Odinga Street, Kisumu, Kenya</span>
              </p>
              <p className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>+254 744 123 456</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>kisumu@samcom.co.ke</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-neutral-light">
        <div className="w-full h-full flex items-center justify-center bg-neutral">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2 font-heading">Our Location</h3>
            <p className="text-gray-600">Samcom House, Ngong Road, Nairobi, Kenya</p>
            <p className="text-sm text-gray-500 mt-4">
              {/* In a real implementation, this would be replaced with a Google Maps component */}
              Interactive map would be displayed here
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
