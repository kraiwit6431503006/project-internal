import type { Game } from "~/types/game";

export function useGame() {
  const games = ref<Game[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalPage = ref(1);
  const searchQuery = ref("");

  const fetchGames = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await post<{ result: Game[]; totalPage: number }>(
        "api/games",
        { page }
      );
      games.value = data.result;
      totalPage.value = data.totalPage;
    } catch (err: any) {
      console.error(err);
      error.value = err.message || "Failed to fetch games";
    } finally {
      loading.value = false;
    }
  };

   const topFive = computed(() => {
    return [...games.value]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  });

  const searchGames = async (query: string): Promise<Game[]> => {
  loading.value = true;
  error.value = null;

  try {
    const url = `api/search?query=${encodeURIComponent(query)}`;
    const data = await post<{ result: Game[]; totalPage: number }>(url, {});

    games.value = data.result;
    totalPage.value = 1;

    return data.result;
  } catch (err: any) {
    console.error(err);
    error.value = err.message || 'Search failed';
    return []; 
  } finally {
    loading.value = false;
  }
};

  const fetchGameById = async (id: string | number) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await get<{ data: Game[] }>(`api/games/${id}`);
      return data.data[0] ?? null;
    } catch (err: any) {
      console.error(err);
      error.value = err.message || "Failed to fetch game detail";
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    games,
    topFive,
    loading,
    error,
    fetchGames,
    searchQuery,
    searchGames,
    fetchGameById,
    totalPage,
  };
}
