<script setup lang="ts">

interface Props {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const props = defineProps<Props>()

const isMobile = useMediaQuery('(max-width: 768px)')

function getPagination(currentPage: number, totalPages: number, isMobile: boolean): (number | string)[] {
    const pages: (number | string)[] = []

    if (isMobile) {
        if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (currentPage <= 2) return [1, 2, '...', totalPages]
        if (currentPage >= totalPages - 1) return [1, '...', totalPages - 1, totalPages]
        return [1, '...', currentPage, '...', totalPages]
    }

    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]

    if (currentPage >= totalPages - 3)
        return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

const pages = computed(() => getPagination(props.currentPage, props.totalPages, isMobile.value))
</script>

<template>
    <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex w-full justify-between items-center gap-4">
            <!-- Previous -->
            <button type="button" :disabled="props.currentPage <= 1" @click="props.onPageChange(props.currentPage - 1)"
               class="group bg-gray-800 px-2 py-1 rounded shadow-sm hover:bg-gray-700 disabled:opacity-50 text-gray-500 hover:text-white">
                <i class="mdi mdi-arrow-left h-4 w-4 md:h-5 md:w-5"></i>
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
                <template v-for="(page, index) in pages" :key="index">
                    <button v-if="typeof page === 'number'" type="button" @click="props.onPageChange(page)" :class="[
                        'px-3 py-1 rounded shadow-sm',
                        page === props.currentPage
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-white'
                    ]">
                        {{ page }}
                    </button>
                    <span v-else class="px-3 py-1 rounded text-gray-500 bg-neutral-50 border border-gray-200">
                        {{ page }}
                    </span>
                </template>
            </div>

            <!-- Next -->
            <button type="button" :disabled="props.currentPage >= props.totalPages"
                @click="props.onPageChange(props.currentPage + 1)"
                class="group bg-gray-800 px-2 py-1 rounded shadow-sm hover:bg-gray-700 disabled:opacity-50 text-gray-500 hover:text-white">
                <i class="mdi mdi-arrow-right h-4 w-4 md:h-5 md:w-5"></i>
            </button>
        </div>
    </div>
</template>
