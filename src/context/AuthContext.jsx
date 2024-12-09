import { createContext, useState, useEffect } from "react";

// Create context for auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Ambil data dari localStorage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
  
    console.log("Token from localStorage:", token); // Debugging untuk melihat token
    console.log("Username from localStorage:", username); // Debugging untuk melihat username
  
    if (token && username) {
      setIsAuthenticated(true);
      setUser(username); // Gunakan username langsung, tidak perlu JSON.parse
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);
  

  const logout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset the authentication state
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
