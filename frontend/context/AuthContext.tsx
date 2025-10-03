  import React, { createContext, useState, useContext, ReactNode, useEffect} from 'react';
  import { User, Address } from '../types';
  import { getUser, addAddress, deleteAddress, updateAddress, loginUser, logoutUser } from '../services/api';

  interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    loading:boolean
    addUserAddress: (newAddress: Address) => Promise<void>;
    removeUserAddress: (addressIndex: number) => Promise<void>;
    updateUserAddress: (addressIndex: number, updatedAddress: Address) => Promise<void>;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading]=useState(true);
    const isAuthenticated = !!user;
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await getUser(); // GET /user
          setUser(res);
        } catch (err) {
          setUser(null);
          
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, []);

    const login = async (email: string, pass: string) => {
      // In a real app, you would validate credentials here
      console.log(`Logging in with ${email} and ${pass}`);
      const userData = await loginUser({email,password:pass});
      console.log("UserData:",userData);  
      setUser(userData);
    };

    const logout = async() => {
      await logoutUser();
      setUser(null);
    };

    

    const addUserAddress = async (newAddress: Address) => {
      if (!user) return;
      const updatedUser = await addAddress(newAddress);
      setUser({ ...updatedUser });
    };

    const removeUserAddress = async (addressIndex: number) => {
      if (!user) return;
      const updatedUser = await deleteAddress(addressIndex);
      setUser({ ...updatedUser });
    };

    const updateUserAddress = async (addressIndex: number, updatedAddress: Address) => {
      if (!user) return;
      const updatedUser = await updateAddress(addressIndex, updatedAddress);
      setUser({ ...updatedUser });
    };

    return (
      <AuthContext.Provider value={{ user, isAuthenticated,loading, login, logout, addUserAddress, removeUserAddress, updateUserAddress }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };