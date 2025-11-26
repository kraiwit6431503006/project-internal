<script setup lang="ts">
const { games, topFive, loading, error, fetchGames,totalPage } = useGame();
const currentPage = ref(1);

const handlePageChange = async (page: number) => {
  if (page < 1 || page > totalPage.value) return;
  currentPage.value = page;
  await fetchGames(page);
};

onMounted(async () => {
  await fetchGames(currentPage.value);
});
</script>

<template>
  <div class="space-y-4">
    <div v-if="error" class="text-red-500 text-center font-semibold py-4">
      {{ error }}
    </div>

    <!-- Loading skeleton -->
    <div v-else-if="loading" class="space-y-4 animate-pulse">
      <div class="w-full h-60 md:h-80 bg-gray-700 rounded-xl"></div>
      <div class="flex justify-between items-center">
        <div class="h-6 w-32 bg-gray-600 rounded"></div>
        <div class="h-6 w-20 bg-gray-600 rounded"></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="n in 6" :key="n" class="bg-gray-700 rounded-xl h-40 md:h-48 w-full"></div>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="space-y-4">
      <div class="col-span-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Search />

        <div class="hidden lg:flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-lg  transition w-max">
          <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white text-xl">
            <i class="mdi mdi-account"></i>
          </div>
          <span class="text-white font-medium text-sm">Guest</span>
        </div>

      </div>

      <Carousel3D v-if="topFive.length" :items="topFive" />

      <div v-if="games.length" class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-white">Games</h3>
          <span class="text-primary">View all</span>
        </div>

        <div class="grid grid-cols-12 gap-4">
          <game-card v-for="card in games" :key="card.id" :item="card" />
          <div class="col-span-12">
            <Pagination :current-page="currentPage" :total-pages="totalPage" :on-page-change="handlePageChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
