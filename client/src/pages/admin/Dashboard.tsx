import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Property, Agent, ContactMessage, FirebaseProperty } from "@shared/schema";
import { useFirestoreCollection } from "@/hooks/use-firestore-collection";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, Plus, LayoutDashboard } from "lucide-react";

import PropertyList from "@/components/admin/PropertyList";
import PropertyForm from "@/components/admin/PropertyForm";

import AgentList from "@/components/admin/AgentList";
import AgentForm from "@/components/admin/AgentForm";

import MessageList from "@/components/admin/MessageList";

import DashboardOverview from "@/components/admin/DashboardOverview";

const Dashboard = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Use real-time Firestore collection for properties
  const { 
    documents: propertiesData, 
    loading: propertiesLoading,
    error: propertiesError 
  } = useFirestoreCollection<FirebaseProperty>("properties");
  
  // Convert FirebaseProperty to Property for compatibility
  const properties = propertiesData as unknown as Property[] || [];
  console.log('Admin dashboard properties:', properties.length, properties.map(p => p.title));

  // Fetch all agents
  const agentsQuery = useQuery({
    queryKey: ["/api/agents"],
    refetchOnWindowFocus: false,
  });

  // Fetch all contact messages
  const messagesQuery = useQuery({
    queryKey: ["/api/contact/all"],
    refetchOnWindowFocus: false,
  });

  const agents = agentsQuery.data as Agent[] || [];
  const messages = messagesQuery.data as ContactMessage[] || [];

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setShowPropertyForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyForm(true);
  };

  const handleAddAgent = () => {
    setSelectedAgent(null);
    setShowAgentForm(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentForm(true);
  };

  const isLoading =
    propertiesLoading || agentsQuery.isLoading || messagesQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your real estate website</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Back to Website
          </Button>
        </Link>
      </div>

      <DashboardOverview
        propertyCount={properties.length}
        agentCount={agents.length}
        messageCount={messages.length}
      />

      <Separator className="my-8" />

      <Tabs defaultValue="properties">
        <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto mb-8">
          <TabsTrigger value="properties" className="px-4 py-2">
            Properties
          </TabsTrigger>
          <TabsTrigger value="agents" className="px-4 py-2">
            Agents
          </TabsTrigger>
          <TabsTrigger value="messages" className="px-4 py-2">
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          {showPropertyForm ? (
            <PropertyForm
              property={selectedProperty}
              onClose={() => setShowPropertyForm(false)}
            />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Property Management</h2>
                <Button onClick={handleAddProperty} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Property
                </Button>
              </div>
              <PropertyList
                properties={properties}
                onEditClick={handleEditProperty}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          {showAgentForm ? (
            <AgentForm
              agent={selectedAgent}
              onClose={() => setShowAgentForm(false)}
            />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Agent Management</h2>
                <Button onClick={handleAddAgent} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Agent
                </Button>
              </div>
              <AgentList agents={agents} onEditClick={handleEditAgent} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
            </div>
            <MessageList messages={messages} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;