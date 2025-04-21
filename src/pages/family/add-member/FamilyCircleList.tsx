
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, User } from "lucide-react";

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  profileImage: string | null;
}

const FamilyCircleList = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  
  useEffect(() => {
    // Load family members from session storage
    const storedMembers = sessionStorage.getItem("familyCircleList");
    if (storedMembers) {
      setFamilyMembers(JSON.parse(storedMembers));
    }
  }, []);
  
  const handleAddChild = () => {
    navigate("/family/add-member/add-child-details");
  };
  
  const handleContinue = () => {
    navigate("/family/add-member/investment-options");
  };
  
  const handleMemberClick = (memberId: string) => {
    // Navigate to the child profile details
    navigate(`/family/add-member/child-profile/${memberId}`);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Family Circle</h1>
        <p className="text-gray-600 mb-8">
          Manage your family members and their accounts
        </p>

        <div className="space-y-4 mb-8">
          {familyMembers.map((member) => (
            <Card 
              key={member.id} 
              className="overflow-hidden cursor-pointer"
              onClick={() => handleMemberClick(member.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                    {member.profileImage ? (
                      <img 
                        src={member.profileImage} 
                        alt={`${member.firstName} ${member.lastName}`} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.firstName} {member.lastName}</h3>
                    <p className="text-sm text-gray-500">
                      {calculateAge(member.dob)} years old
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-[#13ab6c]"
            onClick={handleAddChild}
          >
            <PlusCircle className="h-5 w-5" />
            Add child
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-[#13ab6c] text-[#13ab6c]"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
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

export default FamilyCircleList;
