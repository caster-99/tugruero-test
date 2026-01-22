import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";

interface ApiResponse {
  items: Character[];
  total: number;
}

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ApiResponse>("/characters");
      setCharacters(data.items);
    } catch {
      setError("Error cargando personajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { characters, loading, error };
};
