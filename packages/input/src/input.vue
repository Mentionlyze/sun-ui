<script setup lang="ts">
withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])
const inputHandler = (e: Event) => {
  emit('update:modelValue', (<HTMLTextAreaElement>e.target)!.value)
}
</script>
<template>
  <input :value="modelValue" @input="inputHandler" />
</template>

<style scoped></style>
