import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { authService } from "../services/api";
import { COOKIE_OPTIONS } from "../utils/constants";
import {
  clearAuthCookies,
  extractAuthToken,
  extractAuthUser,
  normalizeAuthUser,
} from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  //register
  const register = async (userData) => {
    const payload = {...userData,
      name: userData.name?.trim(),
      email: userData.email?.trim(),
      password_confirmation:userData.password_confirmation ?? userData.password,
    };

    const response = await authService.register(payload);
    return response.data;
  };

  //login
  const login = async ({ email, password }) => {
    const response = await authService.login({ email, password });
    const data = response.data;

    const token = extractAuthToken(data);

    if (!token) {
      throw new Error("The login response did not include an access token.");
    }

    Cookies.set("token", token, COOKIE_OPTIONS);

    let user = extractAuthUser(data);

    if (!user) {
      const meResponse = await authService.me();
      user = normalizeAuthUser(
        extractAuthUser(meResponse.data) ??
          meResponse.data?.user ??
          meResponse.data,
      );
    }

    if (!user || typeof user !== "object" || Array.isArray(user)) {
      clearAuthCookies();
      throw new Error("Unable to load the authenticated user.");
    }

    setAuthState({ user, isAuthenticated: true, loading: false });

    return { user, token };
  };
  //logout
  const logout = useCallback(async () => {
    // Attempt server-side logout (fire-and-forget)
    try {
      await authService.logout();
    } catch {
      // Ignore errors on logout – we still clear local state
    } finally {
      clearAuthCookies();
      setAuthState({ user: null, isAuthenticated: false, loading: false });
    }
  }, []);

  // On mount: restore session by calling /me with the stored token
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setAuthState({ user: null, isAuthenticated: false, loading: false });
        return;
      }

      try {
        const response = await authService.me();
        const user = normalizeAuthUser(
          extractAuthUser(response.data) ??
            response.data?.user ??
            response.data,
        );
        if (user && typeof user === "object") {
          setAuthState({ user, isAuthenticated: true, loading: false });
        } else {
          throw new Error("Invalid user response");
        }
      } catch {
        // Token is invalid/expired – clear everything
        clearAuthCookies();
        setAuthState({ user: null, isAuthenticated: false, loading: false });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
