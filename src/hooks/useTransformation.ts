import { useEffect, useState } from "react";
import type { Transformation } from "../types/transformation";
import { api } from "../api/axios";
import { formatAxiosError } from "../utils/errorFormatter";

export const useTransformations = (characterId?: string, enabled = false) => {
  const [data, setData] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransformations = async () => {
    if (!characterId) return;

    try {
      setLoading(true);
      const { data } = await api.get(`/transformations/${characterId}`);
      setData(data);
      console.log("Transformations data:", data);
      setError(null);
    } catch (err) {
      setError(formatAxiosError(err));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!characterId) return;
    if (!enabled) return;

    fetchTransformations();
  }, [characterId, enabled]);

  return {
    transformations: data,
    loading,
    error,
  };
};
