import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/features/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="text-xs text-muted-foreground">Sign in to your BL1NK AUTH account</p>
        </div>
        <div className="border rounded-lg p-4">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-foreground hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
