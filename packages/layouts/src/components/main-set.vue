<script lang="ts" setup>
import LayoutFeature from './feature/index.vue'
import { createNamespace } from '@radical/utils'
const { bem } = createNamespace('main-set')
</script>
<template>
  <LayoutFeature />
  <main :class="bem()">
    <slot></slot>
  </main>
</template>

<style>
.main-set {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
}
</style>
