
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main App Pages
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreatePasscode from "./pages/CreatePasscode";
import ConfirmPasscode from "./pages/ConfirmPasscode";
import SplashScreen from "./pages/SplashScreen";
import OnboardingCarousel from "./pages/OnboardingCarousel";
import Rewards from "./pages/Rewards";
import Statistics from "./pages/Statistics";
import QRCode from "./pages/QRCode";
import HelpInfo from "./pages/HelpInfo";
import GiftDeposit from "./pages/family/GiftDeposit";
import DepositSuccess from "./pages/family/DepositSuccess";
import Learn from "./pages/learn/Learn";
import LearnArticle from "./pages/learn/LearnArticle";
import LearnQuiz from "./pages/learn/LearnQuiz";
import LearnComplete from "./pages/learn/LearnComplete";

// Auth Pages
import AuthSelect from "./pages/auth/AuthSelect";
import EmailSignup from "./pages/auth/EmailSignup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PhoneInput from "./pages/auth/PhoneInput";
import VerifyPhone from "./pages/auth/VerifyPhone";
import Login from "./pages/auth/Login";

// Family Pages
import FamilyCircle from "./pages/family/FamilyCircle";
import InvestmentOptions from "./pages/family/InvestmentOptions";

// Family Onboarding Flow
import ChooseAccountType from "./pages/family/add-member/ChooseAccountType";
import AdultDetailsForm from "./pages/family/add-member/AdultDetailsForm";
import ChildDetailsForm from "./pages/family/add-member/ChildDetailsForm";
import IncomeInfo from "./pages/family/add-member/IncomeInfo";
import Agreement from "./pages/family/add-member/Agreement";
import ConnectChoice from "./pages/family/add-member/ConnectChoice";
import BankSecure from "./pages/family/add-member/connect-bank/BankSecure";
import SelectInstitution from "./pages/family/add-member/connect-bank/SelectInstitution";
import BankLogin from "./pages/family/add-member/connect-bank/BankLogin";
import SelectAccounts from "./pages/family/add-member/connect-bank/SelectAccounts";
import CryptoSecure from "./pages/family/add-member/connect-crypto/CryptoSecure";
import SelectWallet from "./pages/family/add-member/connect-crypto/SelectWallet";
import WalletLogin from "./pages/family/add-member/connect-crypto/WalletLogin";
import SelectAssets from "./pages/family/add-member/connect-crypto/SelectAssets";
import ConnectionSuccess from "./pages/family/add-member/ConnectionSuccess";
import FamilyCircleIntro from "./pages/family/add-member/FamilyCircleIntro";
import AddChildDetails from "./pages/family/add-member/AddChildDetails";
import FamilyCircleList from "./pages/family/add-member/FamilyCircleList";
import ChildProfile from "./pages/family/add-member/ChildProfile";
import FutureGoals from "./pages/family/add-member/FutureGoals";
import FamilyCircleManage from "./pages/family/add-member/FamilyCircleManage";
import InvestmentDetails from "./pages/family/add-member/InvestmentDetails";
import ChildInvestmentOptions from "./pages/family/add-member/ChildInvestmentOptions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<Index />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingCarousel />} />
          <Route path="/create-passcode" element={<CreatePasscode />} />
          <Route path="/confirm-passcode" element={<ConfirmPasscode />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/qr-code" element={<QRCode />} />
          <Route path="/help/freeze" element={<HelpInfo />} />
          
          {/* Learn Routes */}
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:topicId" element={<LearnArticle />} />
          <Route path="/learn/:topicId/quiz" element={<LearnQuiz />} />
          <Route path="/learn/:topicId/complete" element={<LearnComplete />} />
          
          {/* Family Routes */}
          <Route path="/family/family-circle" element={<FamilyCircle />} />
          <Route path="/family/investment-options" element={<InvestmentOptions />} />
          <Route path="/family/gift-deposit" element={<GiftDeposit />} />
          <Route path="/family/deposit-success" element={<DepositSuccess />} />
          
          {/* Auth Routes */}
          <Route path="/auth/select" element={<AuthSelect />} />
          <Route path="/auth/signup" element={<EmailSignup />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/phone" element={<PhoneInput />} />
          <Route path="/auth/verify-phone" element={<VerifyPhone />} />
          <Route path="/auth/login" element={<Login />} />
          
          {/* Family Onboarding Flow Routes */}
          <Route path="/family/add-member" element={<ChooseAccountType />} />
          <Route path="/family/add-member/adult-details" element={<AdultDetailsForm />} />
          <Route path="/family/add-member/child-details" element={<ChildDetailsForm />} />
          <Route path="/family/add-member/income-info" element={<IncomeInfo />} />
          <Route path="/family/add-member/agreement" element={<Agreement />} />
          <Route path="/family/add-member/connect-choice" element={<ConnectChoice />} />
          
          {/* Bank Connection Flow */}
          <Route path="/family/add-member/connect-bank/secure" element={<BankSecure />} />
          <Route path="/family/add-member/connect-bank/select-institution" element={<SelectInstitution />} />
          <Route path="/family/add-member/connect-bank/login" element={<BankLogin />} />
          <Route path="/family/add-member/connect-bank/select-accounts" element={<SelectAccounts />} />
          
          {/* Crypto Connection Flow */}
          <Route path="/family/add-member/connect-crypto/secure" element={<CryptoSecure />} />
          <Route path="/family/add-member/connect-crypto/select-wallet" element={<SelectWallet />} />
          <Route path="/family/add-member/connect-crypto/wallet-login" element={<WalletLogin />} />
          <Route path="/family/add-member/connect-crypto/select-assets" element={<SelectAssets />} />
          
          {/* Connection Success and Family Circle Management */}
          <Route path="/family/add-member/connection-success" element={<ConnectionSuccess />} />
          <Route path="/family/add-member/family-circle-intro" element={<FamilyCircleIntro />} />
          <Route path="/family/add-member/add-child-details" element={<AddChildDetails />} />
          <Route path="/family/add-member/family-circle-list" element={<FamilyCircleList />} />
          
          {/* Child Profile Management */}
          <Route path="/family/add-member/child-profile/:id" element={<ChildProfile />} />
          <Route path="/family/add-member/child-profile/:id/future-goals" element={<FutureGoals />} />
          <Route path="/family/add-member/child-profile/:id/family-circle" element={<FamilyCircleManage />} />
          <Route path="/family/add-member/child-profile/:id/investment-details" element={<InvestmentDetails />} />
          <Route path="/family/add-member/investment-options" element={<ChildInvestmentOptions />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
