import { createContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ username: null });

  const signIn = (rawFormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, rawFormData)
        .then(({ data: { success, error, payload } }) => {
          console.log({ success, payload, error });
          if (success) {
            setUser({ username: payload.username });
            resolve(success);
          }
          reject(error);
        })
        .catch((error) => reject(error));
    });
  };

  const signUp = (rawFormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, rawFormData)
        .then(({ data: { success, error } }) => {
          if (error) {
            reject(error);
          } else {
            resolve(success);
          }
        })
        .catch((error) => reject(error));
    });
  };

  const signOut = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signout`)
        .then(({ data: { success, error } }) => {
          if (success) {
            resolve();
          }
          reject(error);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  useEffect(() => {
    // console.log()
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth`).then(({ data: { username } }) => {
      console.log("useeffect auth provider", { username });
      setUser(() => {
        return { username };
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
