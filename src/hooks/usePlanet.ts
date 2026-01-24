import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Planet } from "../types/planet";
import { formatAxiosError } from "../utils/errorFormatter";

export const usePlanet = (id?: string) => {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlanet = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/planets/${id}`);
        setPlanet(data);
        setError(null);
      } catch (err) {
        setError(formatAxiosError(err));
      } finally {
        setLoading(false);
      }
    };


    fetchPlanet();
  }, [id]);

  return { planet, loading, error };
};
