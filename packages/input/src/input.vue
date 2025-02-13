<script setup lang="ts">
withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])
function inputHandler(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <input :value="modelValue" @input="inputHandler">
</template>

<style scoped></style>
