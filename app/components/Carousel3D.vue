<script setup lang="ts">
import type { Game } from "~/types/game";

const props = defineProps<{ items: Game[] }>();

const active = ref(0);
const total = computed(() => props.items.length);

let startX = 0;
let endX = 0;
let autoSlideInterval: number;

function onStart(e: TouchEvent | MouseEvent) {
    if (e instanceof TouchEvent) startX = e.touches[0]?.clientX ?? 0;
    else startX = e.clientX;
}

function onEnd(e: TouchEvent | MouseEvent) {
    if (e instanceof TouchEvent) endX = e.changedTouches[0]?.clientX ?? 0;
    else endX = e.clientX;

    const diff = endX - startX;
    if (diff > 50) prev();
    else if (diff < -50) next();
}

function next() {
    active.value = (active.value + 1) % total.value;
}

function prev() {
    active.value = (active.value - 1 + total.value) % total.value;
}

function circularOffset(i: number, activeIndex: number, length: number) {
    let diff = i - activeIndex;
    if (diff > Math.floor(length / 2)) diff -= length;
    if (diff < -Math.floor(length / 2)) diff += length;
    return diff;
}


onMounted(() => {
    if (props.items.length) {
        const maxRatingIndex = props.items.reduce((maxIndex, item, i, arr) => {
            return item.rating > arr[maxIndex]?.rating! ? i : maxIndex;
        }, 0);
        active.value = maxRatingIndex;
    }

    autoSlideInterval = window.setInterval(() => {
        next();
    }, 5000);
});

onUnmounted(() => {
    clearInterval(autoSlideInterval);
});

const router = useRouter()

function goToDetail(id: string | number) {
    router.push(`/games/${id}`)
}

</script>

<template>
    <!-- MOBILE VERSION -->
    <div class="lg:hidden relative w-full aspect-video mx-auto select-none overflow-hidden" @mousedown="onStart"
        @mouseup="onEnd" @touchstart="onStart" @touchend="onEnd">
        <div class="relative w-full h-full">
            <div v-for="(card, i) in items" :key="card.id" v-show="i === active"
                class="absolute inset-0 transition-opacity duration-500">
                <div class="w-full h-full relative overflow-hidden rounded-xl">
                    <img :src="card.thumbnail" class="absolute inset-0 w-full h-full object-cover" />
                    <div v-if="i === active"
                        class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-white text-sm font-semibold backdrop-blur-lg bg-yellow-400">
                        <i class="mdi mdi-star text-white"></i>

                        <span>{{ card.rating }}</span>
                    </div>
                    <div v-if="i === active"
                        class="absolute bottom-0 w-full h-[40%] rounded-t-lg text-white p-3 backdrop-blur-sm overflow-hidden"
                        style="
              background: linear-gradient(
                to top,
                rgba(30, 30, 30, 0.85),
                rgba(80, 80, 80, 0.45),
                rgba(120, 120, 120, 0)
              );
            ">
                        <div class="flex items-center justify-between">
                            <div class="min-w-0">
                                <h1 class="lg:text-xl xl:text-2xl font-bold truncate">
                                    {{ card.title }}
                                </h1>
                                <p class="text-sm opacity-90 truncate">
                                    Category: {{ card.category }}
                                </p>
                            </div>

                            <button @click="goToDetail(card.id)"
                                class=":lex items-center justify-center ml-4 w-8 h-8 rounded-full bg-black/30 text-white hover:bg-black/80 transition">
                                <i class="mdi mdi-play text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dots -->
        <div class="absolute bottom-2 w-full flex justify-center gap-2">
            <div v-for="(card, i) in items" :key="'dot-' + i" class="w-3 h-3 rounded-full transition-all"
                :class="i === active ? 'bg-white scale-110' : 'bg-white/40'"></div>
        </div>
    </div>

    <!-- DESKTOP 3D CAROUSEL -->
    <div class="hidden lg:block relative w-full aspect-video lg:max-w-[24rem] xl:max-w-[48rem] mx-auto select-none overflow-visible"
        @mousedown="onStart" @mouseup="onEnd" @touchstart="onStart" @touchend="onEnd">
        <div class="carousel w-full h-full relative">
            <div v-for="(card, i) in items" :key="card.id"
                class="card-container absolute w-full h-full transition-all duration-500 ease-out" :style="{
                    '--offset': circularOffset(i, active, total),
                    '--abs-offset': Math.abs(circularOffset(i, active, total)),
                    '--direction': Math.sign(circularOffset(i, active, total)),
                    zIndex:
                        i === active
                            ? 300
                            : 100 - Math.abs(circularOffset(i, active, total)),
                }">
                <div class="card w-full h-full relative overflow-hidden rounded-xl shadow-lg bg-white">
                    <img :src="card.thumbnail" class="absolute inset-0 w-full h-full object-cover" />
                    <div v-if="i === active"
                        class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-white text-sm font-semibold backdrop-blur-lg bg-yellow-400">
                        <i class="mdi mdi-star text-white"></i>

                        <span>{{ card.rating }}</span>
                    </div>
                    <div v-if="i === active"
                        class="absolute bottom-0 w-full h-[30%] rounded-t-lg text-white p-3 backdrop-blur-sm overflow-hidden"
                        style="
              background: linear-gradient(
                to top,
                rgba(30, 30, 30, 0.85),
                rgba(80, 80, 80, 0.45),
                rgba(120, 120, 120, 0)
              );
            ">
                        <div class="lg:flex lg:items-center lg:justify-between">
                            <!-- Left info -->
                            <div class="min-w-0">
                                <h1 class="lg:text-xl xl:text-2xl font-bold truncate">
                                    {{ card.title }}
                                </h1>
                                <p class="text-sm opacity-90 truncate">
                                    Category: {{ card.category }}
                                </p>
                            </div>

                            <button type="button"
                                class="xl:hidden lg:flex items-center justify-center ml-4 w-8 h-8 rounded-full bg-black/30 text-white hover:bg-black/80 transition" @click="goToDetail(card.id)">
                                <i class="mdi mdi-play text-xl"></i>
                            </button>
                        </div>

                        <!-- SEE MORE button -->
                        <button type="button" class="xl:block bg-white rounded-lg mt-3 text-neutral-800 px-6 py-2"
                            @click="goToDetail(card.id)">
                            PLAY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel {
    perspective: 1200px;
    transform-style: preserve-3d;
}

.card-container {
    transform: rotateY(calc(var(--offset) * 20deg)) scale(calc(1 - var(--abs-offset) * 0.12)) translateZ(calc(var(--abs-offset) * -18vw)) translateX(calc(var(--direction) * -8vw));
    transition: transform 0.5s ease-out, z-index 0.5s;
}

.card-container:nth-child(n) {
    transition: transform 0.5s ease, z-index 0.5s;
}
</style>
