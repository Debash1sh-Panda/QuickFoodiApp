import React, { useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { baseUrl } from "../urls";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set to true initially

  // Create an account
  const createUsers = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // Signup with Gmail accounts
  const signUpWithGmail = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      return setLoading(false);
    }
  };

  // Login using email and password
  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const gitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("GitHub login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user's profile
  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    }
  };

  // Check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const userInfo = { email: currentUser.email };

        axios
          .post(`${baseUrl}/api/jwt/verify-jwt`, userInfo)
          .then((res) => {
            if (res.data.token) {
              // Send the token to the backend for storage
              // console.log(res.data.token)
              axios
                .post(`${baseUrl}/api/store-token`, {
                  token: res.data.token,
                  email: currentUser.email,
                })
                .then((response) => {
                  console.log(
                    "Token stored in the database successfully:",
                    response.data
                  );
                })
                .catch((error) => {
                  console.error(
                    "Error storing the token in the database:",
                    error
                  );
                });
            }
          })
          .catch((error) => {
            console.error("Error verifying JWT:", error);
          });
      } else {
        // Optionally notify the backend that the user has logged out, or handle token removal logic
        axios
          .post(`${baseUrl}/api/remove-token`, { email: currentUser?.email })
          .then((response) => {
            console.log(
              "Token removed from the database successfully:",
              response.data
            );
          })
          .catch((error) => {
            console.error("Error removing the token from the database:", error);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUsers,
    signUpWithGmail,
    login,
    logout,
    updateUserProfile,
    loading,
    gitHubLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
