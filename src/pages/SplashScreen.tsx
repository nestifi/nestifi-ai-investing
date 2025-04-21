
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 1600);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="mb-8" style={{ marginTop: "60px" }} />
      <img
        src="/public/lovable-uploads/7fd3ed6c-f5da-43fa-ae07-b8c0319e30d1.png"
        alt="Nestifi Logo"
        className="w-36 h-36 mx-auto mb-4"
        style={{ objectFit: "contain" }}
      />
      <h1 className="text-4xl text-[#13ab6c] text-center font-semibold mb-2">
        NestiFi
      </h1>
      <p className="text-gray-500 text-xl text-center mb-14">
        Investing Made Simple for Families
      </p>
    </div>
  );
};

export default SplashScreen;
