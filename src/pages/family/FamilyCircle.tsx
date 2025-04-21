
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Users } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

const FamilyCircle = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: "1", name: "Emily Parker", role: "Parent", imageUrl: "/placeholder.svg" },
    { id: "2", name: "Michael Parker", role: "Child (12)", imageUrl: "/placeholder.svg" },
    { id: "3", name: "Sarah Parker", role: "Child (8)", imageUrl: "/placeholder.svg" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Family Circle</h1>
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <Users className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {familyMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                    {member.imageUrl && (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          className="w-full flex items-center justify-center gap-2 mb-4 bg-[#13ab6c]"
          onClick={() => navigate("/family/add-member")}
        >
          <PlusCircle className="h-5 w-5" />
          Add family member
        </Button>

        <Button 
          variant="outline" 
          className="w-full border-[#13ab6c] text-[#13ab6c]"
          onClick={() => navigate("/family/investment-options")}
        >
          Continue to investments
        </Button>
      </div>
    </div>
  );
};

export default FamilyCircle;
