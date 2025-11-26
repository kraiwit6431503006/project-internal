<script setup lang="ts">
const props = defineProps<{
  showAccountMenu: boolean
  toggleAccountMenu: () => void
}>()
</script>

<template>
  <header class="lg:hidden flex items-center justify-between bg-dark shadow z-30 p-4 border-b">
    <div class="flex items-center">
      <slot name="sidebar-toggle"></slot>

      <div class="flex items-center gap-1">
        <div class="rounded-md bg-white px-2 text-xl font-bold">G</div>
        <h2 class="text-xl font-bold text-white">ames Play</h2>
      </div>
    </div>

    <button @click="props.toggleAccountMenu" class="text-white text-2xl focus:outline-none relative z-50">
      <i class="mdi mdi-account-circle-outline"></i>
    </button>

    <!-- Account Menu -->
    <transition name="fade">
      <div v-if="props.showAccountMenu" class="fixed inset-0 z-40" @click.self="props.toggleAccountMenu">
        <div class="absolute inset-0 bg-black/40" @click="props.toggleAccountMenu"></div>
        <div class="absolute top-12 right-4 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-xl p-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-2xl">
              <i class="mdi mdi-account"></i>
            </div>
            <span class="font-semibold text-lg">Guest</span>
          </div>
          <div class="p-2 border-t">
            <button
              class="w-full bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-yellow-400 transition">
              Sign-In
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>
