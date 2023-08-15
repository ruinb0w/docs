<script setup lang="ts">
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <div class="nav">hello nav</div>
    </template>
  </Layout>
</template>

<style>
/* .nav { */
/*   position: fixed; */
/*   right: 10px; */
/* } */
</style>
