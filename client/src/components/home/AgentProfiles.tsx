import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Agent } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone 
} from "lucide-react";
import { useFirestoreCollection } from '@/hooks/use-firestore-collection';


const AgentProfiles = () => {
  const { data: agents, isLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
    staleTime: 0, // Always refetch when component mounts
  });

  // Add additional real-time collection hook for better reliability
  const { documents: firestoreAgents, loading: firestoreLoading } = useFirestoreCollection<Agent>("agents");

  // Use either source of agents data, with firestore as backup
  const displayAgents = agents?.length ? agents : firestoreAgents || [];

  // Loading state
  if (isLoading || firestoreLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-72" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex space-x-3">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (firestoreLoading && firestoreError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Meet Our Expert Agents</h2>
            <p className="text-red-500">Failed to load agents. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Meet Our Expert Agents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of experienced real estate professionals is ready to help you with all your property needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayAgents?.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-72 overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 font-heading">{agent.name}</h3>
                <p className="text-primary font-medium mb-3">{agent.title}</p>
                <p className="text-gray-600 mb-4">{agent.bio}</p>
                <div className="flex space-x-3">
                  <a href={agent.social && 'linkedin' in agent.social ? agent.social.linkedin as string : '#'} className="text-gray-600 hover:text-primary">
                    <Linkedin size={18} />
                  </a>
                  <a href={agent.social && 'twitter' in agent.social ? agent.social.twitter as string : '#'} className="text-gray-600 hover:text-primary">
                    <Twitter size={18} />
                  </a>
                  <a href={`mailto:${agent.email}`} className="text-gray-600 hover:text-primary">
                    <Mail size={18} />
                  </a>
                  <a href={`tel:${agent.phone}`} className="text-gray-600 hover:text-primary">
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/about">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              View All Agents
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgentProfiles;

const PLACEHOLDER_AGENTS = [
  {
    id: '1',
    name: 'Jane Wanjiku',
    title: 'Senior Agent',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e',
    bio: 'Jane specializes in luxury properties across Nairobi and Mombasa.',
    email: 'jane@samcomproperty.com',
    phone: '+254 7XX XXX XXX',
  },
  {
    id: '2',
    name: 'John Kamau',
    title: 'Property Consultant',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f',
    bio: 'John has over 15 years of experience in commercial real estate and land sales.',
    email: 'john@samcomproperty.com',
    phone: '+254 7XX XXX XXX',
  },
  {
    id: '3',
    name: 'Alice Otieno',
    title: 'Residential Specialist',
    image: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57',
    bio: 'Alice helps families find their perfect homes in Kenya with specialized knowledge in Naivasha.',
    email: 'alice@samcomproperty.com',
    phone: '+254 7XX XXX XXX',
  },
];