"use client";

import { checkUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const PUBLIC_PATHS = ["/login", "/register", "/"];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (PUBLIC_PATHS.includes(pathname)) {
        setIsInitialLoading(false);
        return;
      }
      try {
        const data = await checkUser();
        if (data?.success && data.user) {
          console.log("Setting user to Zustand:", data.user);
          setUser(data.user);
        } else {
          clearIsAuthenticated();
        }
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchUser();
  }, [pathname, setUser, clearIsAuthenticated]);

  if (isInitialLoading) {
    return null;
  }

  return children;
}
