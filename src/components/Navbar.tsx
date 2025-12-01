import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Search, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold text-gradient">
            Brasil Beauty
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/search">
            <Button variant="ghost" className="gap-2">
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </Link>

          <Link to="/testar-chatbot">
            <Button variant="ghost" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Testar Chatbot
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/account">
                <Button variant="ghost" className="gap-2">
                  <User className="w-4 h-4" />
                  Perfil
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
