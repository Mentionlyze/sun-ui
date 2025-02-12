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
  }
)

const clickHandler = () => {
  hello(props.text)
}
</script>

<template>
  <button @click="clickHandler"><slot /></button>
</template>

<style scoped lang="scss"></style>
