import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import Constants from "expo-constants";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (Constants.expoConfig?.extra?.rorkApiBaseUrl) {
    const url = Constants.expoConfig.extra.rorkApiBaseUrl;
    console.log('[TRPC] Using base URL from app.json:', url);
    return url;
  }

  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    const url = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
    console.log('[TRPC] Using base URL from env:', url);
    return url;
  }

  if (__DEV__) {
    console.warn(
      "[TRPC] No API URL configured, using localhost. This will not work in production builds."
    );
    return "http://localhost:8081";
  }

  console.error(
    "[TRPC] No base url found for production build! Add 'rorkApiBaseUrl' to app.json extra section."
  );
  return "http://localhost:8081";
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  ],
});
