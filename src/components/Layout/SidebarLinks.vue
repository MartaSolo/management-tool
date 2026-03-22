<script setup lang="ts">
import type { LinkProp } from '@/types/layout'

defineProps<{
  links: LinkProp[]
}>()

const emit = defineEmits<{
  (e: 'actionClicked', payload: string): void
}>()

const emitActionClicked = (linkTitle: string) => {
  emit('actionClicked', linkTitle)
}

const { menuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      class="nav-link"
      exact-active-class="bg-muted text-primary"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="emitActionClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </div>
  </template>
</template>

<style scoped>
@reference "../../assets/style.css";

.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary  text-muted-foreground;
}
</style>
