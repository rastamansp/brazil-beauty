import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChatBubble } from "./ChatBubble";
import { WhatsAppHeader } from "./WhatsAppHeader";
import chatData from "@shared/data/chatData.json";
import { toast } from "sonner";

interface ModelData {
  id: string;
  name: string;
  phone: string;
  location: string;
  hasLocation: boolean;
  category: string;
  description: string;
  age: number;
  height: string;
  size: string;
  shoes: string;
  hip: string;
  eyeColor: string;
  accompanies: string[];
  fee: string;
  acceptsCard: boolean;
  photos: string[];
  videos: string[] | null;
  instagram: string | null;
  twitter: string | null;
}

interface JourneyMessage {
  id: number;
  sender: "mentor" | "mentee";
  type: "text" | "image" | "audio" | "models" | "model_detail";
  content: string;
  timestamp: string;
  caption?: string;
  duration?: string;
  models?: ModelData[];
  model?: ModelData;
}

interface ChatInterfaceProps {
  journeyMessages?: JourneyMessage[];
  headerName?: string;
  headerAvatar?: string;
}

export const ChatInterface = ({ 
  journeyMessages, 
  headerName, 
  headerAvatar 
}: ChatInterfaceProps = {}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<JourneyMessage[]>([]);
  const { conversation } = chatData;
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(0);
  const messagesKeyRef = useRef<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [dynamicMessages, setDynamicMessages] = useState<JourneyMessage[]>([]);

  // Separa mensagens estáticas (journey) das dinâmicas (chat real)
  const staticMessages = journeyMessages || conversation.messages;
  const mentorName = headerName || conversation.participants.mentor.name;
  const mentorAvatar = headerAvatar || conversation.participants.mentor.avatar;

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsSending(true);

    // Adiciona mensagem do usuário imediatamente
    const userMsg: JourneyMessage = {
      id: Date.now(),
      sender: "mentee",
      type: "text",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setDynamicMessages((prev) => [...prev, userMsg]);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3007/api';
      const chatApiUrl = `${apiUrl}/chat`;

      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar mensagem: ${response.status}`);
      }

      const data = await response.json();
      
      // Verifica se há modelos na resposta
      const rawData = data.formattedResponse?.data?.rawData;
      
      // Verifica se é um array de modelos
      const isArrayOfModels = Array.isArray(rawData) && rawData.length > 0;
      
      // Verifica se é um único modelo (objeto ou array com 1 elemento)
      const isSingleModel = rawData && (
        (!Array.isArray(rawData) && rawData.id) || 
        (Array.isArray(rawData) && rawData.length === 1 && rawData[0]?.id)
      );
      
      if (isArrayOfModels && rawData.length > 1) {
        // Primeira mensagem: texto introdutório
        const introMessage: JourneyMessage = {
          id: Date.now() + 1,
          sender: "mentor",
          type: "text",
          content: "Aqui estão as modelos:",
          timestamp: new Date().toISOString(),
        };
        setDynamicMessages((prev) => [...prev, introMessage]);
        
        // Segunda mensagem: cards dos modelos
        const modelsMessage: JourneyMessage = {
          id: Date.now() + 2,
          sender: "mentor",
          type: "models",
          content: "",
          timestamp: new Date().toISOString(),
          models: rawData as ModelData[],
        };
        setDynamicMessages((prev) => [...prev, modelsMessage]);
      } else if (isSingleModel) {
        // Card detalhado de uma única modelo
        // Pega o modelo do array se for array, senão usa o objeto direto
        const singleModel = Array.isArray(rawData) ? rawData[0] : rawData;
        const modelDetailMessage: JourneyMessage = {
          id: Date.now() + 1,
          sender: "mentor",
          type: "model_detail",
          content: "",
          timestamp: new Date().toISOString(),
          model: singleModel as ModelData,
        };
        setDynamicMessages((prev) => [...prev, modelDetailMessage]);
      } else {
        // Resposta normal sem modelos
        const botMessage: JourneyMessage = {
          id: Date.now() + 1,
          sender: "mentor",
          type: "text",
          content: data.answer || data.message || "Resposta recebida",
          timestamp: new Date().toISOString(),
        };
        setDynamicMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      toast.error("Erro ao enviar mensagem", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
      });
      
      // Adiciona mensagem de erro
      const errorMsg: JourneyMessage = {
        id: Date.now() + 1,
        sender: "mentor",
        type: "text",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
        timestamp: new Date().toISOString(),
      };
      setDynamicMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Create a unique key for the current static messages set
  const messagesKey = useMemo(() => {
    return staticMessages.map(m => `${m.id}-${m.content.substring(0, 20)}`).join("|");
  }, [staticMessages]);

  // Update messages ref when static messages change
  useEffect(() => {
    messagesRef.current = staticMessages as JourneyMessage[];
  }, [staticMessages]);

  // Reset visible messages when static messages change
  useEffect(() => {
    if (messagesKeyRef.current !== messagesKey) {
      messagesKeyRef.current = messagesKey;
      setVisibleMessagesCount(0);
    }
  }, [messagesKey]);

  // Animate static messages appearing one by one (only if no dynamic messages)
  useEffect(() => {
    if (dynamicMessages.length > 0) {
      // Se há mensagens dinâmicas, mostra todas as estáticas imediatamente
      setVisibleMessagesCount(staticMessages.length);
      return;
    }
    
    const currentMessages = messagesRef.current;
    if (visibleMessagesCount < currentMessages.length) {
      const nextMessage = currentMessages[visibleMessagesCount];
      // Mentor messages take longer to "type", user messages are faster
      const delay = nextMessage.sender === "mentor" ? 1500 : 800;
      const timer = setTimeout(() => {
        setVisibleMessagesCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleMessagesCount, staticMessages.length, dynamicMessages.length]);

  // Auto-scroll when new message appears
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessagesCount, dynamicMessages]);

  // Combina mensagens estáticas visíveis com todas as dinâmicas
  const visibleStaticMessages = staticMessages.slice(0, visibleMessagesCount);
  const allVisibleMessages = [...visibleStaticMessages, ...dynamicMessages];

  return (
    <div className="flex flex-col h-full min-h-0">
      <WhatsAppHeader 
        name={mentorName}
        avatar={mentorAvatar}
        status="online"
      />
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 min-h-0"
        style={{
          backgroundImage: `url("https://personalmarketingdigital.com.br/wp-content/uploads/2018/05/background-whatsapp-7.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#e5ddd5'
        }}
      >
        {allVisibleMessages.map((message) => {
          // Card detalhado de uma única modelo
          if (message.type === "model_detail" && "model" in message && message.model) {
            const model = message.model;
            return (
              <div key={message.id} className="mb-4 animate-fade-in">
                <div className="max-w-[85%] mr-auto">
                  <div className="bg-chat-received rounded-lg p-4 shadow-sm">
                    <Link
                      to={`/profile/${model.id}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      {/* Foto principal */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={model.photos[0] || ""}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                          <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
                            <span>{model.location}</span>
                            {model.hasLocation && (
                              <span className="text-primary">✓ Com local</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            <span className="px-2 py-1 bg-primary/20 border border-primary/30 rounded">
                              {model.age} anos
                            </span>
                            <span className="px-2 py-1 bg-gold/20 border border-gold/30 rounded capitalize text-gold">
                              {model.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Informações detalhadas */}
                      <div className="p-4 bg-white">
                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                              {model.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-gray-500">Altura:</span>
                              <span className="ml-2 font-semibold">{model.height}m</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Manequim:</span>
                              <span className="ml-2 font-semibold">{model.size}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Calçado:</span>
                              <span className="ml-2 font-semibold">{model.shoes}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Quadril:</span>
                              <span className="ml-2 font-semibold">{model.hip} cm</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Olhos:</span>
                              <span className="ml-2 font-semibold">{model.eyeColor}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Acompanha:</span>
                              <span className="ml-2 font-semibold">{model.accompanies.join(", ")}</span>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-500 text-sm">Taxa:</span>
                              <span className="font-bold text-lg text-gold">{model.fee}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500 text-sm">Aceita Cartão:</span>
                              <span className={`font-semibold ${model.acceptsCard ? 'text-primary' : 'text-gray-400'}`}>
                                {model.acceptsCard ? 'Sim' : 'Não'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">
                              Ver perfil completo →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <span className="text-xs text-gray-600 mt-2 block text-right">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          
          // Grid de múltiplos modelos
          if (message.type === "models" && "models" in message && message.models) {
            return (
              <div key={message.id} className="mb-4 animate-fade-in">
                <div className="max-w-[85%] mr-auto">
                  <div className="bg-chat-received rounded-lg p-3 shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                      {message.models.map((model) => (
                        <Link
                          key={model.id}
                          to={`/profile/${model.id}`}
                          className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={model.photos[0] || ""}
                              alt={model.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                              <h3 className="text-sm font-bold mb-1 truncate">{model.name}</h3>
                              <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                                <span>{model.location}</span>
                                {model.hasLocation && (
                                  <span className="text-primary">✓</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs flex-wrap">
                                <span className="px-1.5 py-0.5 bg-primary/20 border border-primary/30 rounded">
                                  {model.age} anos
                                </span>
                                <span className="px-1.5 py-0.5 bg-gold/20 border border-gold/30 rounded capitalize text-gold">
                                  {model.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-white">
                            <p className="text-xs text-gray-700 line-clamp-2 mb-1">
                              {model.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-gold">{model.fee}</span>
                              <span className="text-primary">Ver perfil →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 mt-2 block text-right">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <ChatBubble
              key={message.id}
              type={message.type as "text" | "image" | "audio"}
              content={message.content}
              sender={message.sender as "mentor" | "mentee"}
              timestamp={message.timestamp}
              caption={message.caption}
              duration={message.duration}
            />
          );
        })}
      </div>
      
      <div className="bg-white px-4 py-3 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Mensagem"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
            className="bg-transparent text-gray-900 text-sm w-full outline-none placeholder:text-gray-500 disabled:opacity-50"
          />
        </div>
        <button 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isSending}
          className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSending ? (
            <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

