"use client";

import { registerUser } from "@/actions/auth";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    authenticate,
    getUserDetails,
    getSupportedTokens,
    getWallets,
    createWallet,
  } = useOkto() as OktoContextType;
  const {
    _hasHydrated,
    accessToken,
    logout,
    setUser,
    authToken,
    setAuthToken,
    user,
  } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!_hasHydrated) return;

    if (accessToken === null) {
      router.push("/signin");
    }
  }, [accessToken, router, _hasHydrated]);

  useEffect(() => {
    if (authToken || !accessToken || loading) return;

    console.log("authenticating...");
    setLoading(true);
    authenticate(accessToken, async (result, error) => {
      if (result) {
        console.log("got auth : ", result);
        setAuthToken(result.auth_token);
        setLoading(false);
      }
      if (error) {
        console.error("authentication error:", error);
        toast.error("Error getting auth token from Okto");
        logout();
        router.push("/signin");
      }
    });
  }, [accessToken, authenticate, logout, router, setAuthToken, authToken]);

  useEffect(() => {
    if (!authToken || loading) return;
    setLoading(true);
    (async () => {
      try {
        await createWallet();
        const details = await getUserDetails();
        const wallets = await getWallets();
        const tokens = await getSupportedTokens();
        console.log("getting details : ", details);

        setUser({
          user_id: details.user_id,
          email: details.email,
          wallets: wallets.wallets,
          tokens: tokens.tokens,
        });
      } catch (e) {
        console.log(e);
      }
    })();
    setLoading(false);
  }, [authToken]);

  useEffect(() => {
    console.log("user is set", user);
    if (!user) return;

    try {
      registerUser(user.email);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full">
        <TopBar />
        <div className="flex-grow overflow-auto no-scrollbar">
          <main className="h-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
