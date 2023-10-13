"use client";

// refreshToken.js
import { useEffect } from "react";

type TokenRefreshWrapperProps = {
  children: React.ReactNode;
};

export const refreshToken = async () => {
  try {
    const refreshRes = await fetch(
      "http://localhost:8080/api/v1/refresh-token",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (refreshRes.status === 200) {
      // Parse the response and update the access token cookie or state
      const data = await refreshRes.json();
      // Update access token cookie or state here, if needed
    } else {
      console.error("Token refresh failed");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

// Wrapper component that refreshes tokens before rendering children

export const TokenRefreshWrapper = ({ children }: TokenRefreshWrapperProps) => {
  // useEffect(() => {
  //   refreshToken();
  // }, []);

  return [children];
};
