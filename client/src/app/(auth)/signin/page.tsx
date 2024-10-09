"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function SignIn() {
  const { logOut } = useOkto() as OktoContextType;
  const { accessToken, setAccessToken, logout, _hasHydrated } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    logOut();
    useRouter;
    logout();
  }, [logOut, logout]);

  useEffect(() => {
    if (!_hasHydrated) return;

    if (accessToken) {
      router.replace("/");
    }
  }, [accessToken, router, _hasHydrated]);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex items-center justify-center py-12 w-full lg:w-1/2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up/In</h1>
            <p className="text-muted-foreground">
              Login Through Google to create your account on Okto
            </p>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse.credential) {
                  console.log(credentialResponse);
                  throw new Error("No access token");
                }
                setAccessToken(credentialResponse.credential);
                router.replace("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/images/authwall.jpg"
          alt="Auth cover image"
          fill
          priority
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
