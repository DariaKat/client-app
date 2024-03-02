import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../ui/CreateAuthContext";

export const useAuth = (): AuthContextProps | null => {
    const value = useContext(AuthContext);
    if ( !value ) {
        return null;
    }
    
    return value;
};