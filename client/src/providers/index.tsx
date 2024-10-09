"use client";

import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const oktoBuildType =
  process.env.NODE_ENV === "production" ? BuildType.SANDBOX : BuildType.SANDBOX;

const queryClient = new QueryClient();

export default function RootProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <OktoProvider
        apiKey={process.env.NEXT_PUBLIC_OKTO_CLIENT_API!}
        buildType={oktoBuildType}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          {children}
        </GoogleOAuthProvider>
        <Toaster />
      </OktoProvider>
    </QueryClientProvider>
  );
}
