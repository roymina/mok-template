<template>
  <el-icon
    :size="size"
    :color="color"
    class="transition-transform cursor-pointer hover:scale-105"
    @click="emit('on-click')"
  >
    <slot></slot>
  </el-icon>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: '1.2em'
  },
  color: {
    type: String,
    default: '#777'
  }
})
const { size, color } = toRefs(props)
const emit = defineEmits(['on-click'])
</script>
