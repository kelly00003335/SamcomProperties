import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Users, MessageSquare } from "lucide-react";

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
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{propertyCount}</div>
          <CardDescription>Properties listed on the platform</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agentCount}</div>
          <CardDescription>Agents managing properties</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{messageCount}</div>
          <CardDescription>Contact inquiries received</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
