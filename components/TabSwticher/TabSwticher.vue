<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  range: Array<any>;
  rangeKey?: string;
  border?: boolean;
  bgStyle?: boolean;
}>();
const emits = defineEmits(["update:modelValue", "change"]);

const current = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

function switchTab(i: number) {
  current.value = i;
  emits("change", i, props.range[i]);
}
</script>

<template>
  <div :class="['tab-switcher', { 'bg-style': bgStyle }]">
    <div
      :class="['tab', { active: current == i }, { border }]"
      v-for="(item, i) in range"
      :key="i"
      @click="switchTab(i)"
    >
      {{ rangeKey ? item[rangeKey] : item }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-switcher {
  background: #fff;
  display: flex;
  align-items: center;
  .tab {
    padding: 10px;
    cursor: pointer;
  }
  .tab.active {
    color: var(--main-color);
    font-weight: bold;
  }
  .tab.active.border {
    border-bottom: 2px solid;
  }
}
.tab-switcher.bg-style {
  border-radius: 5px;
  overflow: hidden;
  .tab {
    background: var(--main-bg-color);
    flex: 1;
    text-align: center;
  }
  .tab.active {
    color: #fff;
    background: var(--main-color);
  }
}
</style>
