import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem('token');
//     return token ? { token } : null;
//   });
//   const [loading, setLoading] = useState(false);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post('/api/auth/login', { email, password });
//       localStorage.setItem('token', data.token);
//       setUser({ token: data.token });
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
