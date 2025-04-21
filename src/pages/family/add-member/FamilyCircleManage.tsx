
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { PlusCircle, Share, Copy, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone?: string;
}

const FamilyCircleManage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: "1", name: "Emily Parker", relation: "Mother" },
    { id: "2", name: "James Wilson", relation: "Uncle" },
  ]);
  
  const [showAddMember, setShowAddMember] = useState(false);
  const [showShareInvite, setShowShareInvite] = useState(false);
  
  // Form fields for adding new member
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  
  const handleAddMember = () => {
    setShowAddMember(false);
    setShowShareInvite(true);
  };
  
  const handleSaveMember = () => {
    if (!firstName || !lastName || !relation) return;
    
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      relation,
      phone: phone || undefined
    };
    
    setFamilyMembers([...familyMembers, newMember]);
    
    // Reset form
    setFirstName("");
    setLastName("");
    setPhone("");
    setRelation("");
    
    // Close sheet
    setShowAddMember(false);
    
    toast.success("Family member added");
  };
  
  const handleCopyLink = () => {
    const inviteLink = "https://nestifi.com/invite/abc123";
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard");
  };
  
  const handleShare = () => {
    // In a real app, this would trigger the native share dialog
    toast.success("Share dialog opened");
    setShowShareInvite(false);
  };
  
  const handleSave = () => {
    // In a real app, save the family circle to storage or API
    navigate(`/family/add-member/child-profile/${id}`);
  };
  
  const handleCancel = () => {
    navigate(`/family/add-member/child-profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Family Circle</h1>
        <p className="text-gray-600 mb-8">
          Manage who can contribute to this child's financial future
        </p>

        <div className="space-y-4 mb-8">
          {familyMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.relation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-[#13ab6c]"
            onClick={() => setShowAddMember(true)}
          >
            <PlusCircle className="h-5 w-5" />
            Add member
          </Button>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full py-6 bg-[#13ab6c]"
            onClick={handleSave}
          >
            Save
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
      
      {/* Add Member Sheet */}
      <Sheet open={showAddMember} onOpenChange={setShowAddMember}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Family Member</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="relation">Relation</Label>
              <Select value={relation} onValueChange={setRelation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="grandparent">Grandparent</SelectItem>
                  <SelectItem value="uncle">Uncle</SelectItem>
                  <SelectItem value="aunt">Aunt</SelectItem>
                  <SelectItem value="cousin">Cousin</SelectItem>
                  <SelectItem value="friend">Family Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                className="w-full bg-[#13ab6c]"
                disabled={!firstName || !lastName || !relation}
                onClick={handleSaveMember}
              >
                Save
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowAddMember(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Share Invite Sheet */}
      <Sheet open={showShareInvite} onOpenChange={setShowShareInvite}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Invite to Family Circle</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            <p className="text-gray-600 mb-6">
              Share this link with family members to invite them to contribute
            </p>
            
            <div className="flex items-center p-3 bg-gray-100 rounded-md mb-6">
              <div className="flex-1 truncate text-sm">
                https://nestifi.com/invite/abc123
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full flex items-center justify-center gap-2 bg-[#13ab6c]"
                onClick={handleShare}
              >
                <Share className="h-5 w-5" />
                Share invite
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowShareInvite(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FamilyCircleManage;
