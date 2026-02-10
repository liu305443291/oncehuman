<!-- 卡片 组件 -->
<template>
  <ElCard
    class="box-card"
    :class="$style.card"
    :style="`height: ${height}px`"
    :header="title"
    :shadow="shadow"
  >
    <!-- 自定义头部 -->
    <div v-if="!title" slot="header" class="clearfix">
      <slot name="header" />
    </div>

    <!-- 自定义内容 -->
    <slot />
  </ElCard>
</template>

<script lang="ts">
// @ts-nocheck
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },

    // 设置 header，也可以通过 slot#header 传入 DOM
    header: {
      type: String,
      default: null,
    },
    // 设置阴影显示时机
    shadow: {
      type: String,
      default: "always", // always / hover / never
    },
  },
};
</script>

<style lang="scss" module>
.card {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  box-sizing: border-box;

  :global {
    .el-card__header {
      padding: 8px 16px;
    }

    .el-card__body {
      padding: 16px;
      overflow: hidden;
      flex: 1;
    }
  }
}
</style>
