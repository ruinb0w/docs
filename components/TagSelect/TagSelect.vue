<script setup lang="ts">
import { computed } from "vue";

interface Tag {
  name: string;
  active?: boolean;
  [prop: string]: any;
}

const props = defineProps<{ modelValue: Tag[]; rangeKey?: string; mode?: "radio" | "checkbox" }>();
const emits = defineEmits(["update:modelValue", "change"]);
const tagList = computed({
  get: () => props.modelValue,
  set: (val) => {
    console.log(val);
    emits("update:modelValue", val);
  },
});

function switchStatus(tag: Tag) {
  if (props.mode == "radio") {
    tagList.value.forEach((tag: Tag) => {
      tag.active = false;
    });
  }
  tag.active = !tag.active;
  emits(
    "change",
    tagList.value.filter((t) => t.active)
  );
}
</script>

<template>
  <div class="tag-select">
    <div
      :class="['tag', { active: tag.active }]"
      v-for="(tag, i) in tagList"
      :key="i"
      @click="switchStatus(tag)"
    >
      {{ rangeKey ? tag[rangeKey] : tag.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-select {
  display: flex;
  flex-wrap: wrap;
  .tag {
    margin-right: 10px;
    margin-bottom: 10px;
    background: var(--info-bg-color);
    color: var(--info-color);
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .tag.active {
    background: var(--main-color);
    color: #fff;
  }
}
</style>
