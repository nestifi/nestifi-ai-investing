
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const weekData = [
  { name: 'Mon', value: 1000 },
  { name: 'Tue', value: 1500 },
  { name: 'Wed', value: 1200 },
  { name: 'Thu', value: 1800 },
  { name: 'Fri', value: 2000 },
  { name: 'Sat', value: 1600 },
  { name: 'Sun', value: 2200 },
];

const monthData = [
  { name: 'Week 1', value: 5000 },
  { name: 'Week 2', value: 6500 },
  { name: 'Week 3', value: 8000 },
  { name: 'Week 4', value: 7500 },
];

const yearData = [
  { name: 'Jan', value: 15000 },
  { name: 'Feb', value: 18000 },
  { name: 'Mar', value: 17000 },
  { name: 'Apr', value: 19000 },
  { name: 'May', value: 22000 },
  { name: 'Jun', value: 24000 },
  { name: 'Jul', value: 25000 },
  { name: 'Aug', value: 27000 },
  { name: 'Sep', value: 29000 },
  { name: 'Oct', value: 28000 },
  { name: 'Nov', value: 30000 },
  { name: 'Dec', value: 32000 },
];

// Sample spending categories
const spendingCategories = [
  { name: 'Education', amount: 1250, percentage: 35, color: '#13ab6c' },
  { name: 'Food', amount: 850, percentage: 25, color: '#f97316' },
  { name: 'Transportation', amount: 680, percentage: 20, color: '#0ea5e9' },
  { name: 'Entertainment', amount: 350, percentage: 10, color: '#d946ef' },
  { name: 'Other', amount: 340, percentage: 10, color: '#8b5cf6' },
];

const Statistics = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("week");
  
  const getDataForTimeframe = () => {
    switch (timeframe) {
      case "week": return weekData;
      case "month": return monthData;
      case "year": return yearData;
      default: return weekData;
    }
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case "week": return "This Week";
      case "month": return "This Month";
      case "year": return "This Year";
      default: return "This Week";
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Statistics</h1>
          </div>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-1">{getTimeframeLabel()}</h2>
            <p className="text-3xl font-bold mb-4">{formatMoney(getDataForTimeframe().reduce((sum, item) => sum + item.value, 0))}</p>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getDataForTimeframe()}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => [formatMoney(Number(value)), "Amount"]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#13ab6c" 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-3">Spending by Category</h2>
          <div className="space-y-4">
            {spendingCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span>{category.name}</span>
                  <span>{formatMoney(category.amount)} ({category.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: category.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
