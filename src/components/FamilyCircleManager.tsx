
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Copy, Share } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relation?: string;
  phone?: string;
}

interface FamilyCircleManagerProps {
  members: FamilyMember[];
  onSave: (members: FamilyMember[]) => void;
  onCancel: () => void;
}

export const FamilyCircleManager: React.FC<FamilyCircleManagerProps> = ({
  members: initialMembers,
  onSave,
  onCancel,
}) => {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showShareUI, setShowShareUI] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({});

  const inviteLink = "https://nestifi.money/invite/9997264a...";

  const handleAddMember = () => {
    if (newMember.name) {
      const memberToAdd = {
        id: Date.now().toString(),
        name: newMember.name,
        relation: newMember.relation || "",
        phone: newMember.phone || "",
      };
      setMembers([...members, memberToAdd]);
      setNewMember({});
      setShowAddForm(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    // Here you would normally show a toast notification
    console.log("Invite link copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Family circle</h2>
        <p className="text-gray-600 text-sm">
          Add friends and family in child's future.
        </p>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-8">
          <div className="mb-4">
            <img
              src="/lovable-uploads/7b2b4e4b-32f6-4d24-9c1c-b9a55f50baf9.png"
              alt="Family illustration"
              className="w-32 h-32 object-contain mx-auto"
            />
          </div>
          <p className="text-gray-500 mb-4">
            Your family circle is currently empty. Add members to start building support for child's future.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map(member => (
            <div 
              key={member.id} 
              className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
            >
              <div>
                <div className="font-medium">{member.name}</div>
                {member.relation && <div className="text-sm text-gray-500">{member.relation}</div>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMember(member.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {!showAddForm && !showShareUI && (
        <Button
          onClick={() => setShowShareUI(true)}
          className="w-full flex items-center justify-center gap-2 h-12"
          variant="outline"
        >
          <Plus className="h-4 w-4" /> Add member
        </Button>
      )}

      {showShareUI && (
        <div className="space-y-4 border p-4 rounded-md bg-white">
          <h3 className="font-medium">Invite link</h3>
          <div className="flex items-center space-x-2">
            <Input value={inviteLink} readOnly className="flex-1" />
            <Button variant="outline" size="icon" onClick={copyInviteLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setShowShareUI(false);
                setShowAddForm(true);
              }}
            >
              Add manually
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                // Trigger native share sheet
                if (navigator.share) {
                  navigator.share({
                    title: 'Join my NestiFi Family Circle',
                    text: 'I\'m inviting you to join my NestiFi Family Circle',
                    url: inviteLink,
                  });
                } else {
                  copyInviteLink();
                }
              }}
            >
              <Share className="h-4 w-4" /> Send invite
            </Button>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="space-y-4 border p-4 rounded-md bg-white">
          <h3 className="font-medium">Add member details</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={newMember.name?.split(' ')[0] || ''}
                  onChange={(e) => setNewMember({
                    ...newMember,
                    name: `${e.target.value} ${newMember.name?.split(' ')[1] || ''}`.trim()
                  })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={newMember.name?.split(' ')[1] || ''}
                  onChange={(e) => setNewMember({
                    ...newMember,
                    name: `${newMember.name?.split(' ')[0] || ''} ${e.target.value}`.trim()
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="relation">Relation</Label>
              <Input
                id="relation"
                placeholder="e.g., Grandfather, Uncle, etc."
                value={newMember.relation || ''}
                onChange={(e) => setNewMember({
                  ...newMember,
                  relation: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                placeholder="+1 (XXX) XXX-XXXX"
                value={newMember.phone || ''}
                onChange={(e) => setNewMember({
                  ...newMember,
                  phone: e.target.value
                })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddForm(false);
                setNewMember({});
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={!newMember.name}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className="flex-1 h-12"
        >
          Cancel
        </Button>
        <Button 
          onClick={() => onSave(members)} 
          className="flex-1 h-12 bg-green-500 hover:bg-green-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
