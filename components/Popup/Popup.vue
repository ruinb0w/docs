<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({ modelValue: Boolean, round: { type: Boolean, default: true } });
const emit = defineEmits(["update:modelValue"]);

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="popup" v-if="show">
    <div class="shadow" @click="show = false"></div>
    <div :class="['content', { round }]"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.3);
    animation: show 0.6s;
  }
  .content {
    position: fixed;
    background: #fff;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    animation: scroll 0.4s;
  }
  .content.round {
    border-radius: 10px 10px 0 0;
  }
}

@keyframes show {
  0% {
    background: rgba($color: #000000, $alpha: 0);
  }
  100% {
    background: rgba($color: #000000, $alpha: 0.3);
  }
}

@keyframes scroll {
  0% {
    bottom: -100vh;
  }
  100% {
    bottom: 0;
  }
}
</style>
