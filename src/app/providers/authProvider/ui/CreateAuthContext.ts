import { createContext } from "react";
import { IUser } from "../types/types";

export interface AuthContextProps {
    user: IUser | null;
    setUser?: (user: IUser | null) => void;
  }

export const AuthContext = createContext<AuthContextProps | null>(null);
