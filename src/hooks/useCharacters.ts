import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";
import type { Character, GenderTypes } from "../types/character";
import { formatAxiosError } from "../utils/errorFormatter";
import toast from "react-hot-toast";


interface ApiResponse {
  items: Character[];
  meta: {
    totalPages: number;
  };
}

export interface CharacterFilters {
  name?: string;
  gender?: GenderTypes | string;
  race?: string;
  affiliation?: string;
}

export const useCharacters = (filters?: CharacterFilters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCharacters = useCallback(async (customFilters?: CharacterFilters) => {
    const params = new URLSearchParams();
    if (customFilters?.name) params.append("name", customFilters.name);
    if (customFilters?.gender) params.append("gender", customFilters.gender);
    if (customFilters?.race) params.append("race", customFilters.race);
    if (customFilters?.affiliation) params.append("affiliation", customFilters.affiliation);

    const queryString = params.toString();
    const baseUrl = `/characters${queryString ? `?${queryString}` : ""}`;

    const firstResponse = await api.get<any>(baseUrl);
    
    let allCharacters: Character[] = [];
    let totalPages = 1;

    if (firstResponse.data?.items) {
      allCharacters = [...firstResponse.data.items];
      totalPages = firstResponse.data.meta?.totalPages || 1;
    } else if (Array.isArray(firstResponse.data)) {
      allCharacters = firstResponse.data;
      totalPages = 1;
    }

    if (totalPages > 1) {
      const requests = [];
      for (let page = 2; page <= totalPages; page++) {
        const pageUrl = `/characters?page=${page}${queryString ? `&${queryString}` : ""}`;
        requests.push(api.get<ApiResponse>(pageUrl));
      }

      const responses = await Promise.all(requests);
      responses.forEach((res) => {
        if (res.data?.items) {
          allCharacters.push(...res.data.items);
        } else if (Array.isArray(res.data)) {
          allCharacters.push(...(res.data as any));
        }
      });
    }

    return allCharacters;
  }, []);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllCharacters(filters);
      setCharacters(data);
      setError(null);
    } catch (err) {
      const message = formatAxiosError(err);
      console.error("Error al cargar personajes:", message);
      setError(message);
      toast.error("Error al cargar personajes: " + message);
    } finally {
      setLoading(false);
    }
  }, [filters?.name, filters?.gender, filters?.race, filters?.affiliation, fetchAllCharacters]);

  const deleteCharacter = (id: number) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
    toast.success("Personaje eliminado (Simulado)");
  };


  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return {
    characters,
    loading,
    error,
    refetch: fetchCharacters,
    fetchAllUnfiltered: () => fetchAllCharacters({}),
    deleteCharacter,
  };
};


