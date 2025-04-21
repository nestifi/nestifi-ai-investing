
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User } from "lucide-react";

interface ChildOption {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  status: "Not started" | "In progress" | "Complete";
  profileImage: string | null;
}

const InvestmentOptions = () => {
  const navigate = useNavigate();
  const [childOptions, setChildOptions] = useState<ChildOption[]>([]);
  
  useEffect(() => {
    // Load children from session storage
    const storedMembers = sessionStorage.getItem("familyCircleList");
    if (storedMembers) {
      const members = JSON.parse(storedMembers);
      const options = members.map((member: any) => ({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        dob: member.dob,
        status: "Not started" as const,
        profileImage: member.profileImage
      }));
      setChildOptions(options);
    }
  }, []);
  
  const handleSelectChild = (childId: string) => {
    navigate(`/family/add-member/child-profile/${childId}`);
  };
  
  const handleComplete = () => {
    navigate("/family/family-circle");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Investment Options</h1>
        <p className="text-gray-600 mb-8">
          Choose investment options for each child in your family circle
        </p>

        <div className="space-y-4 mb-8">
          {childOptions.length > 0 ? (
            childOptions.map((child) => (
              <Card 
                key={child.id} 
                className="overflow-hidden cursor-pointer"
                onClick={() => handleSelectChild(child.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                        {child.profileImage ? (
                          <img 
                            src={child.profileImage} 
                            alt={`${child.firstName} ${child.lastName}`} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{child.firstName} {child.lastName}</h3>
                        <p className="text-sm text-gray-500">Age: {calculateAge(child.dob)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm mr-2 ${
                        child.status === "Complete" ? "text-green-500" : 
                        child.status === "In progress" ? "text-amber-500" : 
                        "text-gray-400"
                      }`}>
                        {child.status}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No children added to your family circle yet.
            </div>
          )}
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          onClick={handleComplete}
        >
          Complete setup
        </Button>
      </div>
    </div>
  );
};

// Helper function to calculate age from date of birth
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export default InvestmentOptions;
