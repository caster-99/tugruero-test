import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";

export const useCharacter = (id?: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/characters/${id}`);
        setCharacter(data);
      } catch {
        setError("Error cargando personaje");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return { character, loading, error };
};
