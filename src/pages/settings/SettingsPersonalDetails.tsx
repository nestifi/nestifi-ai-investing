
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "/lovable-uploads/4a5e9e5a-84f1-49b7-992f-28e1e16b2dfe.png";

const initialState = {
  firstName: "Robert",
  lastName: "Williams",
  dob: "12/02/1992",
  gender: "Male",
  phone: "+1 (310) 555-39-11",
  email: "robert.sting@gmail.com",
  ssn: "321-12-3123",
};

const genders = ["Male", "Female", "Other"];

const SettingsPersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState(initialState);
  const [editMode, setEditMode] = useState(false);

  const handleField = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
    setEditMode(true);
  };

  const handleSave = () => {
    // API placeholder
    setEditMode(false);
    navigate("/settings");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pb-4 animate-fade-in">
      {/* Header */}
      <div className="pt-8 flex items-center mb-2">
        <button className="mr-3 p-2" onClick={() => navigate("/settings")}>
          <svg width={22} height={22} fill="none"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Personal Details</h2>
      </div>
      <p className="text-muted-foreground text-center text-base mb-2">Enter information below to personalize your experience.</p>
      <div className="flex flex-col items-center mt-2 mb-4">
        <img src={AVATAR_URL} alt="Profile" className="w-28 h-28 rounded-full border mb-1"/>
        <span className="text-green-700 font-medium mt-2 hover:underline cursor-pointer">Change photo</span>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input type="text" className="w-1/2 border px-4 py-3 rounded-xl" value={fields.firstName} disabled={!editMode}
            onChange={e=>handleField("firstName", e.target.value)}/>
          <input type="text" className="w-1/2 border px-4 py-3 rounded-xl" value={fields.lastName} disabled={!editMode}
            onChange={e=>handleField("lastName", e.target.value)}/>
        </div>
        <div className="flex gap-2">
          <input type="text" className="w-1/2 border px-4 py-3 rounded-xl" value={fields.dob} disabled={!editMode}
            onChange={e=>handleField("dob", e.target.value)}/>
          <select className="w-1/2 border px-4 py-3 rounded-xl text-gray-900"
            value={fields.gender} disabled={!editMode}
            onChange={e=>handleField("gender", e.target.value)}
          >
            {genders.map(g=><option key={g}>{g}</option>)}
          </select>
        </div>
        <input type="text" className="border px-4 py-3 rounded-xl" value={fields.phone} disabled={!editMode}
          onChange={e=>handleField("phone", e.target.value)}/>
        <input type="email" className="border px-4 py-3 rounded-xl" value={fields.email} disabled={!editMode}
          onChange={e=>handleField("email", e.target.value)}/>
        <input type="text" className="border px-4 py-3 rounded-xl" value={fields.ssn} disabled={!editMode}
          onChange={e=>handleField("ssn", e.target.value)}/>
      </form>
      <div className="flex w-full gap-4 mt-10">
        <Button variant="outline" className="w-1/2 border-green-700 text-green-700" onClick={()=>navigate("/settings")}>
          Cancel
        </Button>
        <Button className="w-1/2 bg-green-700 hover:bg-green-800" disabled={!editMode}
          onClick={handleSave}
        >Save</Button>
      </div>
    </div>
  );
};

export default SettingsPersonalDetails;
