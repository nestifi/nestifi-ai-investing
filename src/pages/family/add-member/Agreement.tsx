
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Agreement = () => {
  const navigate = useNavigate();
  const agreementRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!agreementRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = agreementRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setHasScrolledToBottom(true);
      }
    };

    const agreementEl = agreementRef.current;
    if (agreementEl) {
      agreementEl.addEventListener("scroll", handleScroll);
      return () => agreementEl.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleAgree = () => {
    // Store agreement acceptance
    sessionStorage.setItem("agreementAccepted", "true");
    navigate("/family/add-member/connect-choice");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">NestiFi Program Agreement</h1>
        <p className="text-gray-600 mb-8">
          Please review and agree to the following terms to continue
        </p>

        <div 
          ref={agreementRef}
          className="border rounded-md p-4 mb-8 h-[400px] overflow-y-auto text-sm text-gray-700 bg-gray-50"
        >
          <h2 className="font-semibold mb-2">1. INTRODUCTION</h2>
          <p className="mb-4">
            This NestiFi Program Agreement ("Agreement") is entered into between you and NestiFi, Inc. ("NestiFi", "we", or "us"). This Agreement governs your use of the NestiFi platform, services, and financial products (collectively, the "Services").
          </p>

          <h2 className="font-semibold mb-2">2. ELIGIBILITY</h2>
          <p className="mb-4">
            To use the Services, you must be at least 18 years old, a legal resident of the United States, and have the legal capacity to enter into this Agreement. By adding a child account, you represent that you are the parent or legal guardian of the child and are authorized to open an account on their behalf.
          </p>

          <h2 className="font-semibold mb-2">3. ACCOUNT INFORMATION</h2>
          <p className="mb-4">
            You agree to provide accurate, current, and complete information about yourself and any children you add to the platform. You agree to update this information promptly if it changes.
          </p>

          <h2 className="font-semibold mb-2">4. INVESTMENTS</h2>
          <p className="mb-4">
            NestiFi offers investment services through its registered broker-dealer partner. All investments involve risk and may lose value. Past performance is not indicative of future results. Investment outcomes are not guaranteed.
          </p>

          <h2 className="font-semibold mb-2">5. CHILD ACCOUNTS</h2>
          <p className="mb-4">
            Child accounts are custodial accounts opened and managed by an adult on behalf of a minor. The adult agrees to manage the account as a fiduciary for the benefit of the child. When the child reaches the age of majority in their state, control of the account will transfer to them.
          </p>

          <h2 className="font-semibold mb-2">6. FEES AND CHARGES</h2>
          <p className="mb-4">
            We may charge fees for certain services as described in our Fee Schedule. We may change our fees from time to time with notice to you.
          </p>

          <h2 className="font-semibold mb-2">7. PRIVACY AND DATA SECURITY</h2>
          <p className="mb-4">
            Our Privacy Policy describes how we collect, use, and share your information. By using our Services, you consent to our collection, use, and sharing of your information as described in our Privacy Policy.
          </p>

          <h2 className="font-semibold mb-2">8. LIMITATIONS OF LIABILITY</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, NestiFi and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
          </p>

          <h2 className="font-semibold mb-2">9. GOVERNING LAW</h2>
          <p className="mb-4">
            This Agreement shall be governed by and construed in accordance with the laws of the State of [State], without regard to its conflict of law provisions.
          </p>

          <h2 className="font-semibold mb-2">10. CHANGES TO AGREEMENT</h2>
          <p className="mb-4">
            We may modify this Agreement from time to time. We will notify you of material changes. Your continued use of the Services after such notification constitutes your acceptance of the modified Agreement.
          </p>

          <h2 className="font-semibold mb-2">11. TERMINATION</h2>
          <p className="mb-4">
            We may terminate or suspend your access to the Services at any time, for any reason, with or without notice.
          </p>

          <h2 className="font-semibold mb-2">12. ENTIRE AGREEMENT</h2>
          <p className="mb-4">
            This Agreement, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitutes the entire agreement between you and NestiFi regarding the Services.
          </p>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          disabled={!hasScrolledToBottom}
          onClick={handleAgree}
        >
          I agree to the NestiFi Program Agreement
        </Button>
      </div>
    </div>
  );
};

export default Agreement;
