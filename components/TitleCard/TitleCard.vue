<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="title-card">
    <div class="title">{{ title }}</div>
    <div class="content"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.title-card {
  padding: 10px;
  margin: 10px;
  background: #fff;
  .title {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .title::before {
    content: "";
    display: block;
    height: 1rem;
    width: 5px;
    background: var(--main-color);
    margin-right: 5px;
  }
}
</style>
