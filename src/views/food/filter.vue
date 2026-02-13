<!-- 主内容 -->
<template>
  <div :class="$style.container" class="flex-box justify-center align-center">
    <IFilter @search="search" :filterList="filterList" />
  </div>
</template>

<script lang="ts">
import IFilter from "@/components/Filter.vue";

export default {
  name: "foodPage",
  components: {
    IFilter,
  },
  data() {
    return {
      filterList: [
        {
          label: "名称",
          prop: "name",
          type: "input",
        },
        {
          label: "品质",
          prop: "quality",
          type: "select",
          options: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 2,
            },
          ],
        },
        {
          label: "等级",
          prop: "grade",
          type: "select",
          options: [
            {
              label: "是",
              value: 1,
            },
            {
              label: "否",
              value: 2,
            },
          ],
        },
        {
          label: "获取方式",
          prop: "classify",
          type: "select",
          options: [
            {
              label: "大世界获取",
              value: 1,
            },
            {
              label: "模因解锁",
              value: 2,
            },
            {
              label: "主厨产物",
              value: 3,
            },
            {
              label: "活动解锁",
              value: 4,
            },
          ],
        },
      ],
    };
  },
  methods: {
    // 搜索
    search(form: any) {
      console.log(form);
    },
  },
};
</script>

<style lang="scss" module>
.container {
  // height: 200px;
  // background-color: #ccc;
  // border: 1px solid #000;
}
</style>
