import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModelById } from "@/presentation/hooks/useModelById";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  Instagram,
  Twitter,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

const ModelProfile = () => {
  const { id } = useParams();
  const { data: model, isLoading, isError, error } = useModelById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !model) {
    toast.error("Erro ao carregar perfil da profissional");
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Navbar />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">
            Perfil não encontrado
          </h1>
          <p className="text-muted-foreground mb-4">
            {error?.message || "A profissional solicitada não foi encontrada"}
          </p>
          <Link to="/search">
            <Button>Voltar à busca</Button>
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Olá ${model.name}, vi seu perfil no Brasil Beauty e gostaria de mais informações.`
  );
  const whatsappLink = `https://wa.me/${model.phone.replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/search">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Photos */}
            <div className="lg:col-span-3 space-y-4">
              {model.photos && model.photos.length > 0 ? (
                <>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden glass-effect hover-glow">
                    <img
                      src={model.photos[0]}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {model.photos.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {model.photos.slice(1).map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-xl overflow-hidden glass-effect hover-lift"
                        >
                          <img
                            src={photo}
                            alt={`${model.name} - ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/5] rounded-xl overflow-hidden glass-effect flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Sem fotos disponíveis</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-effect p-6">
                <h1 className="text-3xl font-serif font-bold mb-2 text-gradient">
                  {model.name}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Phone className="w-4 h-4" />
                  <span>{model.phone}</span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{model.location}</span>
                  {model.hasLocation && (
                    <span className="flex items-center gap-1 text-primary text-sm">
                      <CheckCircle className="w-3 h-3" />
                      Com local
                    </span>
                  )}
                </div>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chamar no WhatsApp
                  </Button>
                </a>
              </Card>

              <Card className="glass-effect p-6">
                <h2 className="text-xl font-serif font-bold mb-4 text-gradient">
                  Sobre
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {model.description}
                </p>
              </Card>

              <Card className="glass-effect p-6">
                <h2 className="text-xl font-serif font-bold mb-4 text-gradient">
                  Informações
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idade:</span>
                    <span className="font-semibold">{model.age} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Altura:</span>
                    <span className="font-semibold">{model.height}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manequim:</span>
                    <span className="font-semibold">{model.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pés:</span>
                    <span className="font-semibold">{model.shoes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quadril:</span>
                    <span className="font-semibold">{model.hip} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Olhos:</span>
                    <span className="font-semibold">{model.eyeColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acompanha:</span>
                    <span className="font-semibold">
                      {model.accompanies.join(", ")}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="glass-effect p-6">
                <h2 className="text-xl font-serif font-bold mb-4 text-gradient">
                  Valores
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cachê:</span>
                    <span className="font-bold text-lg text-gold">
                      {model.fee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cartão:</span>
                    <span className="flex items-center gap-1">
                      {model.acceptsCard ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-primary">Aceita</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-destructive" />
                          <span className="text-destructive">Não aceita</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {(model.instagram || model.twitter) && (
                <Card className="glass-effect p-6">
                  <h2 className="text-xl font-serif font-bold mb-4 text-gradient">
                    Redes Sociais
                  </h2>
                  <div className="flex gap-3">
                    {model.instagram && (
                      <a
                        href={model.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover-lift hover:border-primary"
                        >
                          <Instagram className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {model.twitter && (
                      <a
                        href={model.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover-lift hover:border-primary"
                        >
                          <Twitter className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelProfile;

