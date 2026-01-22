import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";

interface ApiResponse {
  items: Character[];
  meta: {
    totalPages: number;
  };
}

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);

      // Primera llamada para saber cuantas paginas hay
      const firstResponse = await api.get<ApiResponse>("/characters");
      const totalPages = firstResponse.data.meta.totalPages;

      const allCharacters = [...firstResponse.data.items];

      // Llamadas restantes
      const requests = [];
      for (let page = 2; page <= totalPages; page++) {
        requests.push(api.get<ApiResponse>(`/characters?page=${page}`));
      }

      const responses = await Promise.all(requests);

      responses.forEach((res) => {
        allCharacters.push(...res.data.items);
      });

      setCharacters(allCharacters);
    } catch (err) {
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
