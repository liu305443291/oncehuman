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

    <IDrawer @close="drawer = !drawer" :drawer="drawer" />
  </div>
</template>

<script>
import IFilter from "@/components/Filter.vue";
import ITable from "@/components/Table.vue";
import IDrawer from "./drawer.vue";

import { filterList } from "./table_data";
import { page } from "@/api/ingredients/index";
import { QUALITY_ENUM, INGREDIENT_TYPE_ENUM } from "@/enum/index";

export default {
  name: "ingredientsPage",
  components: {
    IFilter,
    ITable,
    IDrawer,
  },
  data() {
    return {
      query: {},
      drawer: false,
      head: [
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "类型",
          formatter: (row) =>
            this.$createElement("span", {}, INGREDIENT_TYPE_ENUM[row.type]),
        },
        {
          label: "品质",
          formatter: (row) =>
            this.$createElement("span", {}, QUALITY_ENUM[row.quality]),
        },
      ],
    };
  },
  computed: {
    page: () => page,
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
