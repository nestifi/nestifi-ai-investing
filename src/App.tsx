
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/onboarding/SplashScreen";
import Onboarding1 from "./pages/onboarding/Onboarding1";
import Onboarding2 from "./pages/onboarding/Onboarding2";
import Onboarding3 from "./pages/onboarding/Onboarding3";
import SignUpOptions from "./pages/auth/SignUpOptions";
import EmailSignUp from "./pages/auth/EmailSignUp";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PhoneNumber from "./pages/auth/PhoneNumber";
import VerifyPhone from "./pages/auth/VerifyPhone";
import CreatePasscode from "./pages/auth/CreatePasscode";
import ConfirmPasscode from "./pages/auth/ConfirmPasscode";
import Login from "./pages/auth/Login";

// Family Onboarding Flow
import ChooseAccountType from "./pages/family/ChooseAccountType";
import AdultDetails from "./pages/family/AdultDetails";
import ChildDetails from "./pages/family/ChildDetails";
import IncomeInformation from "./pages/family/IncomeInformation";
import Agreement from "./pages/family/Agreement";
import ConnectChoice from "./pages/family/ConnectChoice";
import ConnectBank from "./pages/family/ConnectBank";
import ConnectCrypto from "./pages/family/ConnectCrypto";
import ConnectSuccess from "./pages/family/ConnectSuccess";
import AddChild from "./pages/family/AddChild";
import ChildDetailsAdd from "./pages/family/ChildDetailsAdd";
import FamilyCircle from "./pages/family/FamilyCircle";
import InvestmentOptions from "./pages/family/InvestmentOptions";
import ChildProfile from "./pages/family/ChildProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding-1" element={<Onboarding1 />} />
          <Route path="/onboarding-2" element={<Onboarding2 />} />
          <Route path="/onboarding-3" element={<Onboarding3 />} />
          <Route path="/signup-options" element={<SignUpOptions />} />
          <Route path="/signup-email" element={<EmailSignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/phone-number" element={<PhoneNumber />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/create-passcode" element={<CreatePasscode />} />
          <Route path="/confirm-passcode" element={<ConfirmPasscode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Index />} />
          
          {/* Family Onboarding Flow */}
          <Route path="/family/choose-account-type" element={<ChooseAccountType />} />
          <Route path="/family/adult-details" element={<AdultDetails />} />
          <Route path="/family/child-details" element={<ChildDetails />} />
          <Route path="/family/income-information" element={<IncomeInformation />} />
          <Route path="/family/agreement" element={<Agreement />} />
          <Route path="/family/connect-choice" element={<ConnectChoice />} />
          <Route path="/family/connect-bank" element={<ConnectBank />} />
          <Route path="/family/connect-crypto" element={<ConnectCrypto />} />
          <Route path="/family/connect-success" element={<ConnectSuccess />} />
          <Route path="/family/add-child" element={<AddChild />} />
          <Route path="/family/child-details-add" element={<ChildDetailsAdd />} />
          <Route path="/family/family-circle" element={<FamilyCircle />} />
          <Route path="/family/investment-options" element={<InvestmentOptions />} />
          <Route path="/family/child-profile/:childId" element={<ChildProfile />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
