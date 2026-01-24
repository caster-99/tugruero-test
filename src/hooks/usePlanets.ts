import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";
import type { Planet } from "../types/planet";
import { formatAxiosError } from "../utils/errorFormatter";
import toast from "react-hot-toast";


interface ApiResponse {
  items: Planet[];
  meta: {
    totalPages: number;
  };
}

export interface PlanetFilters {
  name?: string;
  isDestroyed?: string; // "all" | "destroyed" | "intact"
}

export const usePlanets = (filters?: PlanetFilters) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPlanets = useCallback(async (customFilters?: PlanetFilters) => {
    const params = new URLSearchParams();
    if (customFilters?.name) params.append("name", customFilters.name);
    
    if (customFilters?.isDestroyed && customFilters.isDestroyed !== "all") {
      params.append("isDestroyed", customFilters.isDestroyed === "destroyed" ? "true" : "false");
    }

    const queryString = params.toString();
    const baseUrl = `/planets${queryString ? `?${queryString}` : ""}`;

    const firstResponse = await api.get<any>(baseUrl);
    
    let allPlanets: Planet[] = [];
    let totalPages = 1;

    // Estructura defensiva
    if (firstResponse.data?.items) {
      allPlanets = [...firstResponse.data.items];
      totalPages = firstResponse.data.meta?.totalPages || 1;
    } else if (Array.isArray(firstResponse.data)) {
      allPlanets = firstResponse.data;
      totalPages = 1;
    }

    if (totalPages > 1) {
      const requests = [];
      for (let page = 2; page <= totalPages; page++) {
        const pageUrl = `/planets?page=${page}${queryString ? `&${queryString}` : ""}`;
        requests.push(api.get<ApiResponse>(pageUrl));
      }

      const responses = await Promise.all(requests);
      responses.forEach((res) => {
        if (res.data?.items) {
          allPlanets.push(...res.data.items);
        } else if (Array.isArray(res.data)) {
          allPlanets.push(...(res.data as any));
        }
      });
    }

    return allPlanets;
  }, []);

  const fetchPlanets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllPlanets(filters);
      setPlanets(data);
      setError(null);
    } catch (err) {
      const message = formatAxiosError(err);
      setError(message);
      toast.error("Error al cargar planetas: " + message);
    } finally {
      setLoading(false);
    }
  }, [filters?.name, filters?.isDestroyed, fetchAllPlanets]);


  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return { 
    planets, 
    loading, 
    error, 
    refetch: fetchPlanets,
    fetchAllUnfiltered: () => fetchAllPlanets({}) 
  };

};

