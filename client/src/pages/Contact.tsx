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
      
      await apiRequest("/api/contact", "POST", values);
      
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
      content: "P.O. Box 2352, Kinamba, Naivasha, Kenya",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+254 723 204 783 / +254 778 249 550",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "samwelgithogori@gmail.com",
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
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/samcomproperties_/", label: "Instagram" },
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
              <h3 className="text-xl font-bold mb-4 font-heading">Naivasha Branch</h3>
              <p className="flex items-start mb-3">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>P.O. Box 2352, Kinamba, Naivasha, Kenya</span>
              </p>
              <p className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>+254 723 204 783</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>samwelgithogori@gmail.com</span>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 font-heading">Nairobi Office</h3>
              <p className="flex items-start mb-3">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Samcom House, Ngong Road, Nairobi, Kenya</span>
              </p>
              <p className="flex items-center mb-3">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>+254 778 249 550</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>samwelgithogori@gmail.com</span>
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 font-heading">Working Hours</h3>
              <p className="flex items-start mb-3">
                <Clock className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
              </p>
              <p className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Saturday: 9:00 AM - 1:00 PM</span>
              </p>
              <p className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Sunday: Closed</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-neutral-light">
        <div className="w-full h-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.30394339246164!2d36.47327053329462!3d-0.7220038100288206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829187b6e0229b9%3A0xa04b3f4dbdf5d581!2sSAMCOM%20PROPERTIES%20AGENCY!5e0!3m2!1sen!2sus!4v1683118712345!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="P.O. Box 2352, Kinamba, Naivasha, Kenya"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
