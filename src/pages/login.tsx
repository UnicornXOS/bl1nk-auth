// New component for login page
import React from "react";
import { Card, CardBody, Input, Button, Link, Checkbox, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";

export function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;
    
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size="lg" />
          </div>
          
          <Card className="shadow-md">
            <CardBody className="p-6">
              <h1 className="text-2xl font-bold text-center mb-6">Sign in to BLinkOS</h1>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  startContent={<Icon icon="lucide:mail" className="text-gray-400" />}
                />
                
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                  startContent={<Icon icon="lucide:lock" className="text-gray-400" />}
                />
                
                <div className="flex items-center justify-between">
                  <Checkbox 
                    isSelected={rememberMe}
                    onValueChange={setRememberMe}
                    size="sm"
                  >
                    <span className="text-sm">Remember me</span>
                  </Checkbox>
                  
                  <Link href="#" size="sm">Forgot password?</Link>
                </div>
                
                <Button 
                  type="submit" 
                  color="primary" 
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </form>
              
              <Divider className="my-6">
                <span className="text-sm text-gray-500">OR</span>
              </Divider>
              
              <div className="space-y-3">
                <Button 
                  variant="bordered" 
                  fullWidth
                  startContent={<Icon icon="logos:google-icon" className="w-5 h-5" />}
                >
                  Continue with Google
                </Button>
                
                <Button 
                  variant="bordered" 
                  fullWidth
                  startContent={<Icon icon="logos:github-icon" className="w-5 h-5" />}
                >
                  Continue with GitHub
                </Button>
              </div>
            </CardBody>
          </Card>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <div className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BLinkOS Inc. All rights reserved.
      </div>
    </div>
  );
}