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

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" timeout="0">
        <component :is="Component" :key="route.name" />
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
