<template>
  <div class="head flex-box space-between align-center">
    <el-image class="logo" :src="logoSrc" fit="cover">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <div class="item" v-for="(item, index) in menuList" :key="index">
        <!-- 单个 -->
        <el-menu-item :index="index.toString()" v-if="!item.child">
          {{ item.title }}
        </el-menu-item>
        <!-- 多个 -->
        <el-submenu :index="index.toString()" v-else>
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(v, i) in item.child"
            :key="i"
            :index="`${index}-${i}`"
          >
            {{ v.title }}
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "headView",
  data() {
    return {
      activeIndex: "0",
      menuList: [
        {
          title: "首页",
          id: "home",
        },
        {
          title: "菜单",
          id: "menu",
          child: [
            {
              title: "食物",
              id: "food",
            },
            {
              title: "配装",
            },
          ],
        },
        {
          title: "其他",
          id: "else",
        },
      ],
    };
  },
  computed: {
    logoSrc: () => "https://webinput.nie.netease.com/img/qrsj/logo.png",
  },
  methods: {
    handleSelect(v) {
      console.log(v);
    },
  },
};
</script>

<style scoped lang="scss">
$head-hight: 90px;

.head {
  height: $head-hight;
  background-color: #ccc;

  .logo {
    margin-left: 10px;
  }

  .menu {
    .item {
      display: inline-block;
    }
    .el-menu-item,
    .el-submenu__title,
    ::v-deep .el-submenu__title {
      height: $head-hight;
      line-height: $head-hight;
      padding: 0 80px;
    }
  }
}
</style>
