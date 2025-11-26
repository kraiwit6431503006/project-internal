<script setup lang="ts">
const {
    games, loading, error, fetchGames,
    totalPage, searchQuery, searchGames
} = useGame();

const currentPage = ref(1);

const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPage.value) return;
    currentPage.value = page;

    if (searchQuery.value.trim()) {
        await searchGames(searchQuery.value);
    } else {
        await fetchGames(page);
    }
};

onMounted(async () => {
    await fetchGames(currentPage.value);
});
</script>

<template>
  <div class="space-y-4">
    <div class="col-span-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <span class="text-lg font-bold text-white">All Games</span>

      <Search />
    </div>

    <div v-if="error" class="text-red-500 text-center font-semibold py-4">
      {{ error }}
    </div>

    <!-- Loading skeleton -->
    <div v-else-if="loading" class="animate-pulse">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
        <div v-for="n in 10" :key="n" class="bg-gray-700 rounded-xl h-40 md:h-48 w-full"></div>
      </div>
    </div>

    <div v-else-if="games.length === 0" class="col-span-12 text-center text-gray-400 py-8">
      No games found.
    </div>

    <div v-else class="grid grid-cols-12 gap-4">
      <game-card v-for="card in games" :key="card.id" :item="card" />
      <div class="col-span-12">
        <Pagination :current-page="currentPage" :total-pages="totalPage" :on-page-change="handlePageChange" />
      </div>
    </div>
  </div>
</template>
