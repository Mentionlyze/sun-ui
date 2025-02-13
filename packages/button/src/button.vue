<script setup lang="ts">
import { hello } from '@sunui/shared'

defineOptions({
  name: 'Button',
})

const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: 'World',
  },
)

function clickHandler() {
  hello(props.text)
}
</script>

<template>
  <button @click="clickHandler">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.test-class {
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
</style>
