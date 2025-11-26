<script setup lang="ts">
import type { Game } from '~/types/game';
const { searchGames, loading } = useGame();

const searchQuery = ref('');
const searchResults = ref<Game[]>([]);
const showDropdown = ref(false);
let timer: any;

// Live search debounce
const onSearch = (e: any) => {
    searchQuery.value = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(async () => {
        if (searchQuery.value.trim()) {
            showDropdown.value = true;
            const results = await searchGames(searchQuery.value);
            searchResults.value = results || [];
        } else {
            showDropdown.value = false;
            searchResults.value = [];
        }
    }, 300);
};

const goToDetail = (id: number | string) => {
    navigateTo(`/games/${id}`);
};
</script>

<template>
    <div class="relative w-full md:max-w-xl">
        <!-- Search Input -->
        <input type="text" placeholder="Search games..." v-model="searchQuery" @input="onSearch" class="w-full px-4 py-3 pl-12 rounded-xl bg-gray-800
             focus:bg-gray-700 focus:text-white shadow-sm focus:shadow-md
             outline-none transition text-gray-500" />
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
            <i class="mdi mdi-magnify text-2xl"></i>
        </span>

        <!-- Dropdown results -->
        <div v-if="showDropdown"
            class="absolute mt-2 w-full bg-gray-800 rounded-xl shadow-lg max-h-80 overflow-auto z-50">
            <!-- Loading Skeleton -->
            <div v-if="loading" class="p-2 space-y-2">
                <div v-for="n in 5" :key="n" class="flex items-center gap-2 animate-pulse">
                    <div class="w-20 aspect-video bg-gray-700 rounded-lg"></div>
                    <div class="flex-1 space-y-1">
                        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Search results -->
            <div v-else-if="searchResults.length">
                <div v-for="item in searchResults" :key="item.id" @click="goToDetail(item.id)"
                    class="flex items-center gap-2 p-2 hover:bg-gray-700 cursor-pointer transition">
                    <!-- Thumbnail 16/9 -->
                    <img :src="item.thumbnail" alt="thumb"
                        class="w-20 aspect-video rounded-lg object-cover flex-shrink-0" />
                    <div class="flex flex-col w-full">
                        <span class="text-white font-semibold text-sm truncate">{{ item.title }}</span>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-gray-400 text-xs truncate">{{ item.category }}</span>
                            <div class="flex items-center gap-1 mr-2">
                                <i class="mdi mdi-star text-yellow-400"></i>
                                <span class="text-gray-200 text-xs">{{ item.rating }}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- No results -->
            <div v-else class="p-2 text-gray-400 text-center">
                No results found.
            </div>
        </div>
    </div>
</template>
