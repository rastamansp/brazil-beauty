import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Shield, Heart, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
            <span className="text-gradient">Brasil Beauty</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Conexões sofisticadas entre clientes e prestadoras de serviço premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/search">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Começar Busca
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary hover:bg-primary/10">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-4 text-gradient">
            Nossos Serviços
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conectamos você com profissionais de alta qualidade para momentos especiais
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Modelos",
                description: "Acompanhantes elegantes para eventos, jantares e viagens. Beleza e sofisticação em cada momento.",
              },
              {
                icon: Sparkles,
                title: "Tradutoras",
                description: "Profissionais bilíngues para eventos corporativos e internacionais. Elegância e fluência.",
              },
              {
                icon: Clock,
                title: "Massagistas",
                description: "Especialistas em relaxamento e bem-estar. Atendimento personalizado e discreto.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-lg hover-lift hover-glow group"
              >
                <service.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-serif font-bold mb-3 text-gradient">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-gradient">
            Por que Brasil Beauty?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Segurança",
                description: "Perfis verificados e ambiente seguro",
              },
              {
                icon: Heart,
                title: "Qualidade",
                description: "Profissionais selecionadas",
              },
              {
                icon: Sparkles,
                title: "Discrição",
                description: "Total privacidade garantida",
              },
              {
                icon: Clock,
                title: "Disponibilidade",
                description: "Atendimento 24/7",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 glass-effect rounded-lg hover-lift"
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="glass-effect p-12 rounded-2xl max-w-3xl mx-auto hover-glow">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gradient">
              Pronto para começar?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Crie sua conta agora e descubra conexões premium
            </p>
            <Link to="/search">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-10">
                Explorar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            © 2025 Brasil Beauty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
