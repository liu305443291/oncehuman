<template>
  <div class="main">
    <ElRow>
      <ElCol :span="6" v-for="(v, i) in menu" :key="i">
        <div class="item" @click="click(v)">{{ v.name }}</div>
      </ElCol>
    </ElRow>
    <div class="mainbox">
      <RouterView />
    </div>
  </div>
</template>

<script>
import menu from "@/data/homePage";

export default {
  name: "homePageMain",
  data() {
    return {};
  },
  computed: {
    menu: () => menu,
  },
  methods: {
    // 菜单点击跳转
    click(v) {
      this.$router.push(v.id);
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  padding: 12px;
  background-color: #ccc;
  border: 1px solid #000;
  .item {
    margin: 12px;
    height: 100px;
    border: 1px solid #000;

    &:hover {
      background-color: #8f8787;
    }
  }
  .mainbox {
    width: 100%;
    height: 200px;
    border: 1px solid #000;
  }
}
</style>
