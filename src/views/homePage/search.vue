<!-- 主内容 -->
<template>
  <div :class="$style.container" class="flex-box justify-center align-center">
    <div :class="$style.search">
      <ElInput v-model.trim="input" placeholder="请输入内容">
        <ElButton slot="append" icon="el-icon-search" />
      </ElInput>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "homePageSearch",
  data() {
    return {
      input: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" module>
.container {
  height: calc(100vh - $head-hight);
  background-color: #ccc;

  .search {
    width: 800px;
  }
}
</style>

<style lang="scss" scoped>
::v-deep {
  .el-input__inner {
    border-radius: 40px 0 0 40px;
    height: 80px;
    font-size: 24px;
    padding-left: 30px;
  }

  .el-input-group__append {
    border-radius: 40px;
    transform: translateX(-40px);
    background-color: #036eb7;
    color: #fff;
    font-size: 32px;

    .el-button {
      width: 80px;
    }
  }
}
</style>
