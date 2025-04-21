
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    img: "/public/lovable-uploads/4b45f20d-efd0-452a-bed2-d64f6b0e2352.png",
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
    <div className="min-h-screen bg-[#181519] flex flex-col items-center justify-between px-0 pt-10 pb-4 relative">
      {/* Progress bar and Skip */}
      <div className="w-full flex justify-between items-center px-6">
        <div></div>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`h-2 w-14 rounded-full ${
                i <= idx ? "bg-green-600" : "bg-[#e2e2e2]"
              } transition-all duration-300`}
            />
          ))}
        </div>
        <button className="text-green-600 font-semibold" onClick={handleSkip}>
          Skip
        </button>
      </div>
      {/* Image */}
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src={slides[idx].img}
          alt=""
          className="w-full max-w-sm h-auto object-contain"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col items-center w-full px-6 pb-6" style={{marginTop: "-70px"}}>
        <h2 className="text-white text-2xl font-semibold text-center mb-4">{slides[idx].title}</h2>
        <p className="text-gray-300 text-lg text-center mb-8">{slides[idx].desc}</p>
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl text-lg font-medium bg-green-700 text-white mb-2"
        >
          {slides[idx].button}
        </button>
        <div className="h-2" />
        <div className="flex items-center justify-center">
          <div className="w-24 h-1 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
