"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Play, Users, ChevronLeft } from "lucide-react";
import { Button } from "app/components/ui/button";
import { Badge } from "app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { getImageUrl } from "app/app/actions/images.action";
import { useRouter } from "next/navigation";
import IBranche from "app/types/braches";


type ListBranchesItemProps = {
  branch?: IBranche;
  image?: string;
  id: string;
};

export function BranchDetail({ branch, image, id }: ListBranchesItemProps) {
  const router = useRouter();

  const scrollToActors = () => {
    document.getElementById("actors")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container py-8 space-y-8">
      <Button variant="outline" size="icon" onClick={handleBack}>
        <ChevronLeft />
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden">

           <Image
                    src={image}
                    alt={branch.nombre}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  />
        </div>

        {/* <div className="space-y-4">
          <div className="flex gap-4">
            {trailer && (
              <Button onClick={() => setIsVideoOpen(true)}>
                <Play className="mr-2 h-4 w-4" />
                Ver trailer
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
                    )
                  }
                >
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${window.location.href}`
                    )
                  }
                >
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    (window.location.href = `mailto:?subject=${movie.title}&body=${window.location.href}`)
                  }
                >
                  Correo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={scrollToActors}>
              <Users className="mr-2 h-4 w-4" />
              Listado de actores
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleFavorite(movie)}
              className={isFavorite(movie.id) ? "text-red-500" : ""}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex gap-4 text-muted-foreground">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>★ {movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="text-lg">{movie.overview}</p>
        </div> */}
      </div>

      <div id="actors" className="space-y-6">
        <h2 className="text-2xl font-bold">Listado de actores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

        </div>
      </div>


    </div>
  );
}
