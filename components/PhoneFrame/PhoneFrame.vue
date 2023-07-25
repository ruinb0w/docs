<script setup lang="ts">
import { ref } from "vue";

defineProps<{ title: string }>();
const show = ref(true);
</script>

<template>
  <div class="phone-frame" v-if="show">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="hide" @click="show = false">隐藏</div>
    </div>
    <div class="content"><slot /></div>
    <div class="botton"></div>
  </div>
  <div class="show" v-else @click="show = true">预览</div>
</template>

<style lang="scss" scoped>
.phone-frame {
  position: fixed;
  z-index: 9;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 300px;
  box-shadow: 0 0 5px 1px rgba(100, 100, 100, 0.2);
  background: #f7f8fa;
  border-radius: 10px;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
    cursor: pointer;
    z-index: 9;
    position: relative;
    .title {
      font-weight: bold;
    }
    .hide {
      font-size: 0.6rem;
    }
  }
  .content {
    padding: 10px;
    height: 400px;
  }
}
.show {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 5px 1px rgba(100, 100, 100, 0.2);
  border-radius: 10px 0 0 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  background: #fff;
}
</style>
