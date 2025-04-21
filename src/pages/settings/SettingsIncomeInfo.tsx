
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const statuses = [
  "Employed",
  "Unemployed",
  "Self-employed",
  "Retired",
  "Student"
];
const incomes = [
  "Less than $50,000",
  "$50,000 - $100,000",
  "100,000 - 200,000 $",
  "Over $200,000"
];
const brackets = [
  "Up to 12%",
  "13-22%",
  "23-32%",
  "33%+"
];

const initial = {
  status: "Employed",
  income: "100,000 - 200,000 $",
  bracket: "13-22%"
};

const SettingsIncomeInfo: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [editMode, setEditMode] = useState(false);

  function handleChange(field: string, value: string) {
    setForm({ ...form, [field]: value });
    setEditMode(true);
  }

  function handleSave() {
    // API placeholder
    setEditMode(false);
    navigate("/settings");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pb-6 animate-fade-in">
      <div className="pt-8 flex items-center mb-2">
        <button className="mr-3 p-2" onClick={() => navigate("/settings")}>
          <svg width={22} height={22} fill="none"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Income information</h2>
      </div>
      <div className="text-muted-foreground text-base mb-7">
        Help us tailor recommendations to your needs by sharing your income information
      </div>
      <div className="flex flex-col gap-3 mb-8">
        <div>
          <label className="font-medium mb-1 block">Employment status</label>
          <select disabled={!editMode} value={form.status} onChange={e=>handleChange("status", e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          >
            {statuses.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="font-medium mb-1 block">Annual income</label>
          <select disabled={!editMode} value={form.income} onChange={e=>handleChange("income", e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          >
            {incomes.map(i=> <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="font-medium mb-1 block">Federal tax bracket</label>
          <select disabled={!editMode} value={form.bracket} onChange={e=>handleChange("bracket", e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          >
            {brackets.map(b=> <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="flex w-full gap-4 mt-auto">
        <Button variant="outline" className="w-1/2 border-green-700 text-green-700" onClick={()=>navigate("/settings")}>
          Cancel
        </Button>
        <Button className="w-1/2 bg-green-700 hover:bg-green-800" disabled={!editMode} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SettingsIncomeInfo;
