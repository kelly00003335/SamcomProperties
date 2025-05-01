import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property, Agent, ContactMessage } from "@shared/schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Building, Users, MessageSquare, BarChart3 } from "lucide-react";

// Property management components
import PropertyList from "@/components/admin/PropertyList";
import PropertyForm from "@/components/admin/PropertyForm";

// Agent management components
import AgentList from "@/components/admin/AgentList";
import AgentForm from "@/components/admin/AgentForm";

// Message management components
import MessageList from "@/components/admin/MessageList";

// Dashboard overview components
import DashboardOverview from "@/components/admin/DashboardOverview";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [_, navigate] = useLocation();

  // Fetch data
  const { data: properties } = useQuery<Property[]>({ 
    queryKey: ["/api/properties"] 
  });
  
  const { data: agents } = useQuery<Agent[]>({ 
    queryKey: ["/api/agents"] 
  });
  
  const { data: messages } = useQuery<ContactMessage[]>({ 
    queryKey: ["/api/contact"] 
  });

  const handlePropertyEditClick = (property: Property) => {
    setEditingProperty(property);
    setIsAddingProperty(true);
  };

  const handleAgentEditClick = (agent: Agent) => {
    setEditingAgent(agent);
    setIsAddingAgent(true);
  };

  const handlePropertyFormClose = () => {
    setIsAddingProperty(false);
    setEditingProperty(null);
  };

  const handleAgentFormClose = () => {
    setIsAddingAgent(false);
    setEditingAgent(null);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your real estate listings and agents</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
        >
          View Website
        </Button>
      </div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <DashboardOverview 
            propertyCount={properties?.length || 0}
            agentCount={agents?.length || 0}
            messageCount={messages?.length || 0}
          />
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties">
          {isAddingProperty ? (
            <PropertyForm 
              property={editingProperty}
              onClose={handlePropertyFormClose}
            />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Properties</h2>
                <Button 
                  onClick={() => setIsAddingProperty(true)}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Property
                </Button>
              </div>
              <PropertyList 
                properties={properties || []} 
                onEditClick={handlePropertyEditClick} 
              />
            </div>
          )}
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents">
          {isAddingAgent ? (
            <AgentForm 
              agent={editingAgent}
              onClose={handleAgentFormClose}
            />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Agents</h2>
                <Button 
                  onClick={() => setIsAddingAgent(true)}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Agent
                </Button>
              </div>
              <AgentList 
                agents={agents || []} 
                onEditClick={handleAgentEditClick} 
              />
            </div>
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
            <MessageList messages={messages || []} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
