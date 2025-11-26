<script setup lang="ts">
const props = defineProps<{
  showSidebar: boolean
  closeSidebar: () => void
}>()
</script>

<template>
  <aside :class="[
    'fixed top-0 left-0 z-30 w-64 h-screen bg-gray-800 shadow-lg flex flex-col transition-transform duration-300',
    props.showSidebar ? 'translate-x-0' : '-translate-x-full',
    'lg:relative lg:translate-x-0 lg:m-4 lg:rounded-xl lg:h-auto'
  ]">

    <div class="lg:rounded-t-xl p-6 border-b flex items-center gap-4 bg-gray-800">
      <div class="bg-white p-2 rounded-lg flex items-center justify-center text-6xl">
        <i class="mdi mdi-controller"></i>
      </div>
      <div class="flex flex-col">
        <h2 class="text-2xl md:text-3xl font-bold text-white">Games</h2>
        <p class="text-base md:text-lg text-gray-300">Play</p>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-2 overflow-auto">
      <NuxtLink to="/" class="flex items-center gap-2 px-4 py-2 text-gray-500 rounded hover:bg-gray-100 transition"
        active-class="bg-gray-700 font-semibold text-white" @click="props.closeSidebar">
        <i class="mdi mdi-home text-lg"></i>
        <span>Home</span>
      </NuxtLink>

      <NuxtLink to="/games" class="flex items-center gap-2 px-4 py-2 text-gray-500 rounded hover:bg-gray-100 transition"
        active-class="bg-gray-700 font-semibold text-white hover:text-gray-500" @click="props.closeSidebar">
        <i class="mdi mdi-view-grid text-lg"></i>
        <span>Games</span>
      </NuxtLink>
    </nav>
  </aside>

  <!-- Overlay สำหรับ mobile -->
  <div v-if="props.showSidebar" class="fixed inset-0 bg-black/40 z-20 lg:hidden" @click="props.closeSidebar"></div>
</template>
