
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const slides = [
  {
    img: "/public/lovable-uploads/f0d11a6d-dc97-46f7-95a8-b6b168611753.png",
    progress: [true, false, false],
    title: "Build Your Child's Future",
    desc: "Add your child's details, set financial goals, and track their journey toward a brighter future.",
    button: "Continue",
  },
  {
    img: "/public/lovable-uploads/d81243aa-79d8-416b-bdec-da347204e5f1.png",
    progress: [true, true, false],
    title: "Invite Friends and Family",
    desc: "Invite grandparents, relatives, and friends to contribute to your child's financial journey through a personalized link",
    button: "Continue",
  },
  {
    img: "/public/lovable-uploads/83ebe0bf-fa44-41a9-b875-a757d50c86be.png",
    progress: [true, true, true],
    title: "Empower Your Family with Knowledge",
    desc: "Explore interactive lessons that make financial learning fun and rewarding for kids and parents.",
    button: "Get Started",
  },
];

const OnboardingCarousel = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if (idx < slides.length - 1) {
      setIdx(idx + 1);
    } else {
      navigate("/auth/select");
    }
  };

  const handleSkip = () => {
    navigate("/auth/select");
  };

  return (
    <div className="min-h-screen bg-[#171415] flex flex-col items-center justify-between relative w-full max-w-[393px] mx-auto h-[852px]">
      {/* Header with Progress and Skip */}
      <div className="w-full flex justify-between items-center px-4 pt-[47px] pb-4">
        <div className="flex-1" />
        <div className="flex gap-2 justify-center flex-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-[20px] transition-colors ${
                i <= idx ? "bg-[#0AA668]" : "bg-[#DFDFDF]"
              }`}
            />
          ))}
        </div>
        <div className="flex-1 text-right">
          <button 
            className="text-[#0AA668] font-bold text-sm"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[478px]">
        <AspectRatio ratio={393/478} className="w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={slides[idx].img}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </AspectRatio>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center px-4 w-full gap-3.5 mb-[58px]">
        <h2 className="text-2xl font-medium text-white text-center w-full">
          {slides[idx].title}
        </h2>
        <p className="text-base text-[#C7CAC9] text-center leading-6">
          {slides[idx].desc}
        </p>
        <button
          onClick={handleNext}
          className="w-full py-2.5 px-2.5 bg-[#016A40] text-white rounded-lg mt-10 font-medium"
        >
          {slides[idx].button}
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[34px] flex items-center justify-center">
        <div className="w-[134px] h-[5px] bg-white rounded-full" />
      </div>
    </div>
  );
};

export default OnboardingCarousel;
