import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";

interface ApiResponse {
  items: Character[];
  meta: {
    totalPages: number;
  };
}

export const usePlanets = () => {
  const [planets, setPlanets] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanets = async () => {
    try {
      setLoading(true);

      // Primera llamada para saber cuantas paginas hay
      const firstResponse = await api.get<ApiResponse>("/planets");
      const totalPages = firstResponse.data.meta.totalPages;

      const allPlanets = [...firstResponse.data.items];

      // Llamadas restantes
      const requests = [];
      for (let page = 2; page <= totalPages; page++) {
        requests.push(api.get<ApiResponse>(`/planets?page=${page}`));
      }

      const responses = await Promise.all(requests);

      responses.forEach((res) => {
        allPlanets.push(...res.data.items);
      });

      setPlanets(allPlanets);
    } catch (err) {
      setError("Error cargando planetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return { planets, loading, error };
};
