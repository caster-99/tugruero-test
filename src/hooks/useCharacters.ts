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

      const firstResponse = await api.get<ApiResponse>("/characters");
      const totalPages = firstResponse.data.meta.totalPages;

      const allCharacters = [...firstResponse.data.items];

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
      setError("Error loading characters");
    } finally {
      setLoading(false);
    }
  };

  const createCharacter = (newCharacter: Omit<Character, "id">) => {
    // Generate a fake numeric ID
    const fakeId = Math.floor(Math.random() * 1000000);

    const character: Character = {
      ...newCharacter,
      id: fakeId,
    };

    setCharacters((prev) => [character, ...prev]);
  };

  const updateCharacter = (id: number, updates: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((char) => (char.id === id ? { ...char, ...updates } : char)),
    );
  };

  const deleteCharacter = (id: number) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    loading,
    error,
    refetch: fetchCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
  };
};
