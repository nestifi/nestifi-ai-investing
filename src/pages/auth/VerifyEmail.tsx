
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/sonner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [email, setEmail] = useState("");
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("signupEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is found, go back to signup
      navigate("/auth/signup");
    }

    // Start countdown for resend
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerify = () => {
    if (code.length !== 6) return;
    
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/phone");
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setCountdown(60);
    
    // Start countdown again
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast.success("Verification code resent");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>
        <p className="text-gray-500 text-center mb-8">
          We've sent a verification code to {email || "your email"}
        </p>

        <div className="w-full mb-8">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            render={({ slots }) => (
              <InputOTPGroup className="gap-3 justify-center">
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-12 text-xl border-gray-300"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <Button
          onClick={handleVerify}
          className="w-full py-6"
          disabled={code.length !== 6 || isLoading}
        >
          Verify
        </Button>

        <Button
          variant="link"
          onClick={handleResendCode}
          disabled={!canResend}
          className="mt-4 text-green-600"
        >
          {canResend ? "Resend code" : `Resend code in ${countdown}s`}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
