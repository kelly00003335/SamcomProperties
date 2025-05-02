import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/not-found";
import Login from "@/components/auth/Login";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/hooks/use-auth";
// Service pages
import Services from "@/pages/services";
import PropertySales from "@/pages/services/PropertySales";
import PropertyRentals from "@/pages/services/PropertyRentals";
import LandSurveying from "@/pages/services/LandSurveying";
import TitleDeedProcessing from "@/pages/services/TitleDeedProcessing";
import LegalServices from "@/pages/services/LegalServices";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/properties/:id" component={PropertyDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/admin">
        {() => (
          <AdminDashboard />
        )}
      </Route>
      <Route path="/services" component={Services} />
      <Route path="/services/property-sales" component={PropertySales} />
      <Route path="/services/property-rentals" component={PropertyRentals} />
      <Route path="/services/land-surveying" component={LandSurveying} />
      <Route path="/services/title-deed-processing" component={TitleDeedProcessing} />
      <Route path="/services/legal-services" component={LegalServices} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");
  const isLoginRoute = location.startsWith("/login");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            {!isAdminRoute && !isLoginRoute && <Navbar />}
            <main className={`flex-grow ${isAdminRoute || isLoginRoute ? 'bg-gray-50' : ''}`}>
              <Router />
            </main>
            {!isAdminRoute && !isLoginRoute && <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;