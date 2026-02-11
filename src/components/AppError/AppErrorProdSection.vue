<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode?: number
  statusCode?: number
  isCustomError: boolean
}>()

const error = ref({
  code: 500,
  message: 'Ops, something went wrong.',
})

if (props.isCustomError) {
  error.value.code = props.customCode ?? 500
  error.value.message = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.message = 'Sorry, we could not find this page'
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.message }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/style.css';

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
