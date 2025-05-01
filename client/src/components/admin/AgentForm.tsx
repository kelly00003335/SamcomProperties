import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Agent, insertAgentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

// Extended schema with custom validation
const agentFormSchema = insertAgentSchema.extend({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters",
  }),
  // Field for image URL
  image: z.string().url({
    message: "Please enter a valid URL for the image"
  }),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

interface AgentFormProps {
  agent: Agent | null;
  onClose: () => void;
}

const AgentForm = ({ agent, onClose }: AgentFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing agent data
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: agent
      ? {
          name: agent.name,
          title: agent.title,
          bio: agent.bio,
          email: agent.email,
          phone: agent.phone,
          image: agent.image,
          // Format social object to string for the form
          social: agent.social ? JSON.stringify(agent.social) : "",
        }
      : {
          name: "",
          title: "",
          bio: "",
          email: "",
          phone: "",
          image: "",
          social: "",
        },
  });

  // Create or update agent mutation
  const agentMutation = useMutation({
    mutationFn: async (data: AgentFormValues) => {
      // Process data to match schema
      let processedSocial = null;
      if (data.social) {
        try {
          // Convert social from string to JSON object
          // Use String() to ensure we're parsing a string, even if somehow a number is passed
          processedSocial = JSON.parse(String(data.social));
        } catch (error) {
          console.error('Error parsing social JSON:', error);
          processedSocial = {}; // Fallback to empty object
        }
      }
      
      const processedData = {
        ...data,
        // Convert social from string to JSON object
        social: processedSocial,
      };

      if (agent) {
        // Update existing agent
        return apiRequest(`/api/agents/${agent.id}`, "PATCH", processedData);
      } else {
        // Create new agent
        return apiRequest("/api/agents", "POST", processedData);
      }
    },
    onSuccess: () => {
      // Invalidate all agent-related queries
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      
      // Force refetch to ensure fresh data
      queryClient.refetchQueries({ queryKey: ["/api/agents"] });
      
      toast({
        title: agent ? "Agent updated" : "Agent created",
        description: agent
          ? "The agent has been updated successfully."
          : "New agent has been created successfully.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `There was a problem ${agent ? "updating" : "creating"} the agent.`,
      });
    },
  });

  const onSubmit = async (data: AgentFormValues) => {
    try {
      setIsSubmitting(true);
      await agentMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="mr-4" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          {agent ? "Edit Agent" : "Add New Agent"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 bg-white p-6 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
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

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Property Consultant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
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
            </div>

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the agent..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Photo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/photo.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <FormField
              control={form.control}
              name="social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media JSON</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='{"email":"agent@example.com","phone":"+2547XXXXXXXX","twitter":"http://twitter.com/agent","linkedin":"http://linkedin.com/in/agent"}'
                      className="min-h-[120px]"
                      value={field.value as string || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter social media links as a JSON object
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting
                ? agent
                  ? "Updating..."
                  : "Creating..."
                : agent
                ? "Update Agent"
                : "Create Agent"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AgentForm;
