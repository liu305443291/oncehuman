<template>
  <div :class="$style.head" class="flex-box space-between align-center">
    <!-- logo -->
    <ElImage :class="$style.logo" :src="logoSrc" fit="cover" @click="logoClick">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline" />
      </div>
    </ElImage>

    <!-- 导航栏 -->
    <ElMenu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <div :class="$style.item" v-for="(item, index) in menuList" :key="index">
        <!-- 单个 -->
        <ElMenuItem :index="item.id" v-if="!item.child">
          {{ item.title }}
        </ElMenuItem>
        <!-- 多个 -->
        <ElSubmenu :index="item.id" v-else>
          <template slot="title">{{ item.title }}</template>
          <ElMenuItem v-for="(v, i) in item.child" :key="i" :index="v.id">
            {{ v.title }}
          </ElMenuItem>
        </ElSubmenu>
      </div>
    </ElMenu>
  </div>
</template>

<script>
import { getData } from "@/api/menu/getData";

export default {
  name: "headView",
  data() {
    return {
      activeIndex: "homePage",
      menuList: [],
    };
  },
  computed: {
    logoSrc: () => "https://webinput.nie.netease.com/img/qrsj/logo.png",
  },
  methods: {
    // 点击logo
    logoClick() {
      this.$router.push("/homePage");
      this.activeIndex = "homePage";
    },

    // 跳转页面
    handleSelect(key) {
      this.$router.push(`/${key}`);
    },

    // 获取菜单数据
    getData() {
      getData().then((res) => {
        this.menuList = res;
        this.$router.push("/homePage");
      });
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang="scss" module>
.head {
  overflow: hidden;
  height: $head-hight;
  background-color: #fff;

  .logo :hover {
    cursor: pointer;
  }

  .item {
    display: inline-block;
  }
}
</style>

<style lang="scss" scoped>
::v-deep {
  .el-image {
    margin-left: 10px;
    max-height: $head-hight;
    overflow: hidden;
  }

  .el-menu-item,
  .el-submenu__title,
  .el-submenu__title {
    height: $head-hight;
    line-height: $head-hight;
    padding: 0 80px;
  }
}
</style>
