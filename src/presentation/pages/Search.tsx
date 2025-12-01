import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ModelCard } from "@/presentation/components/ModelCard";
import modelsData from "@/shared/data/models.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const filteredModels =
    selectedCategory === "todos"
      ? modelsData
      : modelsData.filter((model) => model.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gradient">
            Descubra Profissionais
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Selecione a categoria e encontre a profissional perfeita
          </p>

          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full mb-12"
          >
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass-effect">
              <TabsTrigger value="todos" className="data-[state=active]:bg-primary/20">
                Todos
              </TabsTrigger>
              <TabsTrigger value="modelo" className="data-[state=active]:bg-primary/20">
                Modelos
              </TabsTrigger>
              <TabsTrigger value="tradutora" className="data-[state=active]:bg-primary/20">
                Tradutoras
              </TabsTrigger>
              <TabsTrigger value="massagista" className="data-[state=active]:bg-primary/20">
                Massagistas
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Category Carousels */}
          <div className="space-y-16">
            {["modelo", "tradutora", "massagista"].map((category) => {
              const categoryModels = modelsData.filter((m) => m.category === category);
              const categoryName =
                category === "modelo"
                  ? "Modelos"
                  : category === "tradutora"
                  ? "Tradutoras"
                  : "Massagistas";

              return (
                <div key={category} className="animate-fade-in">
                  <h2 className="text-3xl font-serif font-bold mb-6 text-gradient">
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryModels.map((model) => (
                      <ModelCard
                        key={model.id}
                        id={model.id}
                        name={model.name}
                        location={model.location}
                        hasLocation={model.hasLocation}
                        age={model.age}
                        photo={model.photos[0]}
                        category={model.category}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* All Models Grid */}
          {selectedCategory === "todos" && (
            <div className="mt-16">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gradient">
                Todas as Profissionais
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    id={model.id}
                    name={model.name}
                    location={model.location}
                    hasLocation={model.hasLocation}
                    age={model.age}
                    photo={model.photos[0]}
                    category={model.category}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

