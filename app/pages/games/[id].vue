<script setup lang="ts">
import type { Game } from '~/types/game'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGame } from '~/composables/useGame'

const { fetchGameById, loading, error } = useGame()
const route = useRoute()

const game = ref<Game | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  game.value = await fetchGameById(id)
})
</script>

<template>
  <div class="bg-gray-800 rounded-xl min-h-screen text-gray-200 p-4  max-w-7xl mx-auto space-y-8">

    <!-- Loading / Error -->
    <div v-if="loading" class="text-center text-gray-500 py-20">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center font-semibold">{{ error }}</div>

    <div v-else-if="game" class="space-y-8">

      <!-- Hero Section -->
      <div class="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
        <img :src="game.thumbnail" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
          <h1 class="text-4xl md:text-5xl font-bold text-white truncate">{{ game.title }}</h1>
          <div class="flex items-center gap-4 mt-3">
            <span class="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">{{ game.category }}</span>
            <div class="flex items-center gap-1 text-yellow-400 font-semibold text-lg">
              <template v-for="i in 5" :key="i">
                <i :class="['mdi mdi-star', i <= Math.round(game.rating) ? 'text-yellow-400' : 'text-gray-600']"></i>
              </template>
              <span class="ml-1">{{ game.rating.toFixed(1) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-white">About This Game</h2>
        <p class="text-gray-300 text-base md:text-lg">{{ game.description }}</p>
      </div>

      <!-- Screenshots Carousel -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-white">Screenshots</h2>
        <div class="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <img
            v-for="(s, i) in game.screenshots"
            :key="i"
            :src="s"
            class="h-60 md:h-72 rounded-lg shadow-lg flex-shrink-0"
          />
        </div>
      </div>

      <!-- Features -->
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-white">Features</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li v-for="(f, i) in game.features" :key="i">{{ f }}</li>
        </ul>
      </div>

      <!-- Release Date -->
      <div class="text-gray-400">
        <span class="font-semibold">Release Date:</span> {{ game.releaseDate }}
      </div>

    </div>
  </div>
</template>

<style scoped>
/* scroll horizontal สวย ๆ */
.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #1f2937; /* gray-900 */
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #374151; /* gray-700 */
  border-radius: 4px;
}
.mdi-star {
  font-size: 1rem;
}
</style>
