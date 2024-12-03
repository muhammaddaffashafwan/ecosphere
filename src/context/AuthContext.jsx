import { createContext, useState, useEffect } from "react";

// Create context for auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token and user info are in localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    console.log("Token:", token);
    console.log("Username:", user);

    if (token && user) {
      try {
        // Safely parse user data if it's a valid string
        const parsedUser = user ? JSON.parse(user) : null;
        if (parsedUser) {
          setIsAuthenticated(true);
          setUser(parsedUser); // Store parsed user info
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error); // Handle JSON parse errors
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []); // Run once when the component mounts

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
