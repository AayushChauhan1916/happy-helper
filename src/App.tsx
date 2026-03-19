import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import Index from "./pages/Index";
import PropertyDetail from "./pages/PropertyDetail";
import RoomDetail from "./pages/RoomDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardShell />}>
            <Route path="/" element={<Index />} />
            <Route path="/properties/:propertyId" element={<PropertyDetail />} />
            <Route path="/properties/:propertyId/rooms/:roomId" element={<RoomDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
