<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const time = computed(() => route.params.time)
</script>
<template>
  <p>详情页，时间为：{{ time }}</p>
</template>
