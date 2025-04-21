
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type SignupFormValues = z.infer<typeof signupSchema>;

const EmailSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store email in session storage for the verification page
      sessionStorage.setItem("signupEmail", data.email);
      navigate("/auth/verify-email");
    }, 1000);
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-8">Create your account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email address</Label>
                  <FormControl>
                    <Input 
                      id="email" 
                      placeholder="Your email" 
                      type="email" 
                      autoComplete="email"
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input 
                      id="password" 
                      placeholder="Your password" 
                      type="password" 
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full py-6" 
              disabled={isLoading}
            >
              Create account
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Button variant="link" onClick={handleLoginClick} className="text-green-600">
            Log in to existing account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;
