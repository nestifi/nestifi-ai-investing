
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, User, Backpack, Users, Calendar } from "lucide-react";

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  profileImage: string | null;
}

interface Goal {
  id: string;
  name: string;
}

const ChildProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [familyCircle, setFamilyCircle] = useState<{ name: string, relation: string }[]>([]);
  const [investmentStatus, setInvestmentStatus] = useState("Not started");
  
  useEffect(() => {
    // Load family member details from session storage
    const storedMembers = sessionStorage.getItem("familyCircleList");
    if (storedMembers && id) {
      const members: FamilyMember[] = JSON.parse(storedMembers);
      const foundMember = members.find(m => m.id === id);
      if (foundMember) {
        setMember(foundMember);
      }
    }
    
    // Load goals (would come from storage in a real app)
    setGoals([
      { id: "1", name: "College" },
      { id: "2", name: "First Car" }
    ]);
    
    // Load family circle (would come from storage in a real app)
    setFamilyCircle([
      { name: "Emily Parker", relation: "Mother" },
      { name: "James Wilson", relation: "Uncle" }
    ]);
  }, [id]);
  
  const handleEditGoals = () => {
    navigate(`/family/add-member/child-profile/${id}/future-goals`);
  };
  
  const handleEditFamilyCircle = () => {
    navigate(`/family/add-member/child-profile/${id}/family-circle`);
  };
  
  const handleEditInvestment = () => {
    navigate(`/family/add-member/child-profile/${id}/investment-details`);
  };
  
  const handleSave = () => {
    navigate("/family/add-member/family-circle-list");
  };

  if (!member) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
            {member.profileImage ? (
              <img 
                src={member.profileImage} 
                alt={`${member.firstName} ${member.lastName}`} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{member.firstName} {member.lastName}</h1>
            <p className="text-gray-600">
              {calculateAge(member.dob)} years old
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {/* Future Goals Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-3">
                    <Backpack className="h-5 w-5 text-[#13ab6c]" />
                  </div>
                  <h3 className="font-medium">Future goals</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditGoals}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {goals.length > 0 ? (
                  goals.map(goal => (
                    <div key={goal.id} className="bg-gray-100 rounded-md px-3 py-2">
                      {goal.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No goals set yet</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Family Circle Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-[#13ab6c]" />
                  </div>
                  <h3 className="font-medium">Family circle</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditFamilyCircle}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {familyCircle.length > 0 ? (
                  familyCircle.map((member, index) => (
                    <div key={index} className="flex justify-between bg-gray-100 rounded-md px-3 py-2">
                      <span>{member.name}</span>
                      <span className="text-gray-500">{member.relation}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No family members added yet</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Investment Status Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-[#13ab6c]" />
                  </div>
                  <h3 className="font-medium">Investment dates/status</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditInvestment}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gray-100 rounded-md px-3 py-2">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className={`${
                    investmentStatus === "Complete" ? "text-green-500" : 
                    investmentStatus === "In progress" ? "text-amber-500" : 
                    "text-gray-500"
                  }`}>
                    {investmentStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          onClick={handleSave}
        >
          Save
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

export default ChildProfile;
