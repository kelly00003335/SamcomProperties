import { Building, Users, MessageSquare, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardOverviewProps {
  propertyCount: number;
  agentCount: number;
  messageCount: number;
}

const DashboardOverview = ({
  propertyCount,
  agentCount,
  messageCount,
}: DashboardOverviewProps) => {
  const stats = [
    {
      title: "Total Properties",
      value: propertyCount,
      description: "Active property listings",
      icon: <Building className="h-8 w-8 text-primary" />,
      change: "+2 from last week",
    },
    {
      title: "Total Agents",
      value: agentCount,
      description: "Active property agents",
      icon: <Users className="h-8 w-8 text-primary" />,
      change: "No change from last week",
    },
    {
      title: "Inquiries",
      value: messageCount,
      description: "Total contact messages",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      change: "+5 from last week",
    },
    {
      title: "Website Views",
      value: 1243,
      description: "Total views this month",
      icon: <Eye className="h-8 w-8 text-primary" />,
      change: "+15% from last month",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Latest property listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0"></div>
                  <div className="ml-4">
                    <div className="font-medium">Modern {i + 1} Bedroom Apartment</div>
                    <div className="text-sm text-gray-500">KSh {(18000000 + i * 1000000).toLocaleString()}</div>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">{i + 1} day{i !== 0 ? 's' : ''} ago</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest customer messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div className="ml-4">
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      Interested in the 3 bedroom apartment in Westlands...
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{i + 1} hour{i !== 0 ? 's' : ''} ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
