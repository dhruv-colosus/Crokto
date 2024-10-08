import Image from "next/image";
import { Button } from "@/components/ui/button";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your password link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function SignIn() {
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
          <div className="grid gap-4">
            <Button variant="default" className="w-full">
              Sign In with Google
            </Button>
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
