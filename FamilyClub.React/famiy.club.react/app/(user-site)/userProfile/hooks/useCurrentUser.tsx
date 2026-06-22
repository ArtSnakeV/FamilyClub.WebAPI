"use client";

import { useEffect, useState } from "react";

export type CurrentUser = {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  roles: string[];
  avatarData: string;
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://localhost:7069/api/AuthClubMember/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data: CurrentUser = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handler = () => fetchUser();
    window.addEventListener("auth-change", handler);
    return () => window.removeEventListener("auth-change", handler);
  }, []);

  return { user, loading };
}