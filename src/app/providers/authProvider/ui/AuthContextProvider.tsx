import { useMemo, useState, FC, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { ga } from "../config/firebase";
import { AuthContext } from "./CreateAuthContext";
import { IUser } from "../types/types";

interface IProps {
  children: ReactNode;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const unlisten = onAuthStateChanged(ga, (user) => {
            if (user) {
                setUser({
                    _id: user.uid,
                    email: user?.email,
                    name: user?.displayName,
                    avatar: user?.photoURL,
                });
            } else {
                setUser(null);
            }
        });

        return () => unlisten();
    }, []);

    const defaultData = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={defaultData}>{children}</AuthContext.Provider>
    );
};