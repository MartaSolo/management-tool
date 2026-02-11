<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
  errorStore.activeError = null
})

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))
</script>

<template>
  <section class="error">
    <ErrorTemplate
      :message
      :customCode
      :code
      :statusCode
      :hint
      :details
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>

<style scoped>
@reference '../../assets/style.css';

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

p {
  @apply my-2;
}
</style>
