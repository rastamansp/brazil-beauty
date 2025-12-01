import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("brasil_beauty_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("brasil_beauty_users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem("brasil_beauty_user", JSON.stringify(userData));
      toast({
        title: "Bem-vindo!",
        description: "Login realizado com sucesso.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("brasil_beauty_users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      toast({
        title: "Erro",
        description: "Este email já está cadastrado.",
        variant: "destructive",
      });
      throw new Error("Email already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
    };

    users.push(newUser);
    localStorage.setItem("brasil_beauty_users", JSON.stringify(users));

    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem("brasil_beauty_user", JSON.stringify(userData));

    toast({
      title: "Conta criada!",
      description: "Cadastro realizado com sucesso.",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("brasil_beauty_user");
    toast({
      title: "Até logo!",
      description: "Logout realizado com sucesso.",
    });
  };

  const updateProfile = async (name: string) => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("brasil_beauty_users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex].name = name;
      localStorage.setItem("brasil_beauty_users", JSON.stringify(users));
      
      const updatedUser = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem("brasil_beauty_user", JSON.stringify(updatedUser));
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
