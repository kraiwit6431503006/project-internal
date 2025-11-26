<script setup lang="ts">
import type { Game } from '~/types/game'

const props = defineProps<{ item: Game }>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/games/${props.item.id}`)
}
</script>

<template>
  <div
    class="col-span-6 md:col-span-4 lg:col-span-3 space-y-2 cursor-pointer transform transition-all duration-300
           hover:scale-105 hover:shadow-xl hover:rounded-2xl"
    @click="goToDetail"
  >
    <div class="w-full aspect-video overflow-hidden rounded-xl">
      <img
        :src="item.thumbnail"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        alt="game thumbnail"
      />
    </div>
    <div class="bg-gray-800 p-1 w-fit text-gray-300 text-xs">
      Category: {{ item.category }}
    </div>
    <h3 class="text-sm text-white"> {{ item.title }} </h3>
    <div class="flex items-center">
      <div class="bg-yellow-400 w-6 h-6 flex items-center justify-center rounded">
        <i class="mdi mdi-star text-white text-sm"></i>
      </div>
      <span class="ml-2 text-white"> {{ item.rating }} </span>
    </div>
  </div>
</template>
