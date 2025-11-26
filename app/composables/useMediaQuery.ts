export function useMediaQuery(query: string) {
  const matches = ref(false)
  let mediaQuery: MediaQueryList

  const updateMatches = () => {
    matches.value = mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(query)
    mediaQuery.addEventListener('change', updateMatches)
    updateMatches()
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateMatches)
  })

  return matches
}
