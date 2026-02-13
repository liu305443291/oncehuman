<template>
  <div :class="$style.container">
    <!-- 筛选 -->
    <IFilter @search="search" :filterList="filterList" />

    <!-- 列表 -->
    <ITable :get="page" :head="head" :query="query">
      <ElTableColumn label="操作" width="160">
        <div @click="add">添加</div>
        <span> 修改 </span>
        <span> 删除 </span>
      </ElTableColumn>
    </ITable>

    <IDrawer @close="close()" :drawer="drawer" />
  </div>
</template>

<script>
import IFilter from "@/components/Filter.vue";
import ITable from "@/components/Table.vue";
import IDrawer from "./drawer.vue";

import { filterList, head } from "./table_data";
import { page } from "@/api/diet/index";

export default {
  name: "foodItem",
  components: {
    IFilter,
    ITable,
    IDrawer,
  },
  data() {
    return {
      query: {},
      drawer: false,
    };
  },
  computed: {
    page: () => page,
    head: () => head,
    filterList: () => filterList,
  },
  methods: {
    // 搜索
    search(form) {
      this.query = form;
    },

    // 关闭
    close() {
      this.drawer = false;
    },

    // 添加
    add() {
      this.drawer = true;
    },
  },
};
</script>

<style lang="scss" module>
.container {
  height: 1800px;
}
</style>
