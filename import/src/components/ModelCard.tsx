import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin, CheckCircle } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  location: string;
  hasLocation: boolean;
  age: number;
  photo: string;
  category: string;
}

export const ModelCard = ({
  id,
  name,
  location,
  hasLocation,
  age,
  photo,
  category,
}: ModelCardProps) => {
  return (
    <Link to={`/profile/${id}`}>
      <Card className="group overflow-hidden hover-lift hover-glow cursor-pointer glass-effect">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-serif font-bold mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm opacity-90 mb-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
              {hasLocation && (
                <span className="flex items-center gap-1 text-primary">
                  <CheckCircle className="w-3 h-3" />
                  Com local
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-primary/20 border border-primary/30 rounded-full">
                {age} anos
              </span>
              <span className="px-2 py-1 bg-gold/20 border border-gold/30 rounded-full capitalize text-gold">
                {category}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
