import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";
import { formatAxiosError } from "../utils/errorFormatter";

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
  const createCharacter = async (data: Omit<Character, "id">) => {
    try {
      setLoading(true);
      await api.post("/characters", data);

      const fakeCharacter: Character = {
        ...data,
        id: Math.floor(Math.random() * 1_000_000),
      };

      setCharacter(fakeCharacter);
      setError(null);
      return fakeCharacter;
    } catch (err) {
      const message = formatAxiosError(err);
      console.log(err, message);
      alert("Error creando personaje: " + message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const updateCharacter = async (id: number, updates: Partial<Character>) => {
    try {
      setLoading(true);
      await api.put(`/characters/${id}`, updates);

      setCharacter((prev) =>
        prev && prev.id === id ? { ...prev, ...updates } : prev,
      );
      setError(null);
    } catch (err) {
      const message = formatAxiosError(err);
      setError(message);
      alert("Error actualizando personaje: " + message);
    } finally {
      setLoading(false);
    }
  };

  return { character, loading, error, createCharacter, updateCharacter };
};
