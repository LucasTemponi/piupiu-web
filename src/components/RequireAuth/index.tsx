import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export const RequireAuth: React.FC = () => {
  const { signedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!signedIn) {
      navigate("/");
    }
  }, [signedIn, loading]);

  return !loading && signedIn ? <Outlet /> : null;
};
