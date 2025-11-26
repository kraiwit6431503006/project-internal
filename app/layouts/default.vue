<script setup lang="ts">

const showSidebar = ref(false)
const showAccountMenu = ref(false)

function toggleSidebar() { showSidebar.value = !showSidebar.value }
function toggleAccountMenu() { showAccountMenu.value = !showAccountMenu.value }
function closeSidebar() { showSidebar.value = false }
</script>

<template>
  <div class="h-screen bg-dark flex flex-col lg:flex-row">
    <Header
      :showAccountMenu="showAccountMenu"
      :toggleAccountMenu="toggleAccountMenu"
    >
      <template #sidebar-toggle>
        <button @click="toggleSidebar" class="text-white text-2xl focus:outline-none mr-2">
          ☰
        </button>
      </template>
    </Header>

    <Sidebar :showSidebar="showSidebar" :closeSidebar="closeSidebar" />

    <main class="flex-1 overflow-auto p-2 lg:pt-4 lg:pr-4 lg:mt-0 lg:ml-0 bg-dark">
      <NuxtPage />
    </main>
  </div>
</template>
