import { ChildrenProps } from "../contextApi";
import { Navigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../contextApi";

export function Private({ children }: ChildrenProps) {
  const { verificar } = useContext(AuthContext);

  if (!verificar) {
    return <Navigate to="/" />;
  }

  return children;
}
