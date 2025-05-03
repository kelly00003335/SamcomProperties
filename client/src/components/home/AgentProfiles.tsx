import { useEffect, useState } from 'react';
import { AgentAPI } from '@/lib/api';
import Spinner from '@/components/ui/spinner';
import { Agent } from '@shared/schema';

export default function AgentProfiles() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const data = await AgentAPI.getAll();
        setAgents(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load agent profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) return <div className="flex justify-center py-10"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (agents.length === 0) return <div className="text-center py-10">No agents found</div>;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800">Our Team of Experts</h2>
          <p className="mt-2 text-gray-600">Meet our professional real estate agents who will help you find your dream property</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
                <p className="text-blue-600 font-medium">{agent.title}</p>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{agent.bio}</p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="mr-3">
                    <i className="fas fa-phone"></i> {agent.phone}
                  </span>
                  <span>
                    <i className="fas fa-envelope"></i> {agent.email}
                  </span>
                </div>

                {agent.social && (
                <div className="mt-4 flex gap-3">
                  {agent.social.linkedin && (
                    <a href={agent.social.linkedin} className="text-gray-400 hover:text-blue-600" aria-label="LinkedIn">
                      <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                  )}
                  {agent.social.twitter && (
                    <a href={agent.social.twitter} className="text-gray-400 hover:text-blue-500" aria-label="Twitter">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                  )}
                  {agent.social.email && (
                    <a href={`mailto:${agent.email}`} className="text-gray-400 hover:text-red-500" aria-label="Email">
                      <i className="fas fa-envelope fa-lg"></i>
                    </a>
                  )}
                  {agent.social.phone && (
                    <a href={`tel:${agent.phone}`} className="text-gray-400 hover:text-green-500" aria-label="Phone">
                      <i className="fas fa-phone fa-lg"></i>
                    </a>
                  )}
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}