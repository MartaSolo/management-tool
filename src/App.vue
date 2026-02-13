<script setup lang="ts">
const errorStore = useErrorStore()

const { activeError } = storeToRefs(errorStore)

onErrorCaptured((error) => {
  if (error) {
    errorStore.setError({ error })
  }
})

const { trackAuthChanges } = useAuthStore()

onMounted(() => trackAuthChanges())
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <component :is="Component" :key="route.name" />
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
