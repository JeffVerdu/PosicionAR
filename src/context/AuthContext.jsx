import { createContext, useContext, useEffect, useState } from "react";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    });
  };

  const signout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
