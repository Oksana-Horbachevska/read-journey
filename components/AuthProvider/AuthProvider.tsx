"use client";

import { checkUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkUser();
        if (data?.success && data.user) {
          setUser(data.user);
        } else {
          clearIsAuthenticated();
        }
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isInitialLoading) {
    return null;
  }

  return children;
}
