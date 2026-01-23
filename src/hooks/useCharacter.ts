import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Character } from "../types/character";
import { formatAxiosError } from "../utils/errorFormatter";
import toast from "react-hot-toast";

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
        setError(null);
      } catch (err) {
        const message = formatAxiosError(err);
        setError(message);
        toast.error("Error cargando personaje: " + message);
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

      toast.success("Personaje creado con éxito");
      return true;
    } catch (err) {
      const message = formatAxiosError(err);
      setError(message);
      toast.error("Error API: " + message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCharacter = async (id: number, updates: Partial<Character>) => {
    try {
      setLoading(true);
      await api.put(`/characters/${id}`, updates);

      toast.success("Personaje actualizado con éxito");
      return true;
    } catch (err) {
      const message = formatAxiosError(err);
      setError(message);
      toast.error("Error API: " + message);
      return false;
    } finally {
      setLoading(false);
    }
  };


  return { character, loading, error, createCharacter, updateCharacter };
};

