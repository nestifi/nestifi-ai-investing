
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreatePasscode from "./pages/CreatePasscode";
import ConfirmPasscode from "./pages/ConfirmPasscode";
import FamilyCircle from "./pages/family/FamilyCircle";
import InvestmentOptions from "./pages/family/InvestmentOptions";
import SplashScreen from "./pages/SplashScreen";
import OnboardingCarousel from "./pages/OnboardingCarousel";
import AuthSelect from "./pages/auth/AuthSelect";
import EmailSignup from "./pages/auth/EmailSignup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PhoneInput from "./pages/auth/PhoneInput";
import VerifyPhone from "./pages/auth/VerifyPhone";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingCarousel />} />
          <Route path="/auth/select" element={<AuthSelect />} />
          <Route path="/auth/signup" element={<EmailSignup />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/phone" element={<PhoneInput />} />
          <Route path="/auth/verify-phone" element={<VerifyPhone />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/create-passcode" element={<CreatePasscode />} />
          <Route path="/confirm-passcode" element={<ConfirmPasscode />} />
          <Route path="/family/family-circle" element={<FamilyCircle />} />
          <Route path="/family/investment-options" element={<InvestmentOptions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
