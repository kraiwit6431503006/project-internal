export interface Game {
  id: string;
  title: string;
  category: string;
  rating: number;
  thumbnail: string;
  description?: string;
  features?: string[];
  releaseDate?: string;
  screenshots?: string[];
}
