<!-- 筛选框 组件 -->
<template>
  <div :class="$style.container" class="form flex-box space-between">
    <!-- 筛选框 -->
    <ElForm inline ref="form" :model="form" class="flex-auto">
      <ElRow>
        <!-- 搜索框 -->
        <ElCol
          :span="24"
          v-if="searchStr"
          class="inputs flex-box justify-center align-center"
        >
          <ElFormItem :prop="searchStr?.prop">
            <ElInput
              v-model="form[`${searchStr.prop}`]"
              :placeholder="`请输入${searchStr.label}查询`"
              clearable
              :class="!form[`${searchStr.prop}`] || 'active'"
            >
              <el-button slot="append" @click="search" icon="el-icon-search" />
            </ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow :class="$style.elseBox">
        <!-- 清空按钮 -->
        <ElCol :span="6" class="flex-box justify-center align-center btn">
          <ElFormItem>
            <ElButton @click="reset"> 全部 </ElButton>
          </ElFormItem>
        </ElCol>

        <!-- 其他按钮 -->
        <ElCol
          v-for="(item, index) in filterList"
          :key="index"
          class="flex-box justify-center align-center"
          :span="item.span ?? 6"
        >
          <ElFormItem
            v-if="item.type === 'select'"
            :label="item.label ? '' : ''"
            :prop="item.prop"
          >
            <!-- 下拉框 -->
            <ElSelect
              v-model="form[`${item.prop}`]"
              :placeholder="`请选择${item.label}查询`"
              clearable
              @change="search"
              :class="!form[`${item.prop}`] || 'active'"
            >
              <ElOption
                v-for="v in item.options"
                :key="v.value"
                :label="v.label"
                :value="v.value"
                :disabled="v.disabled"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem
            v-if="item.type === 'selects'"
            :label="item.label ? '' : ''"
            :prop="item.prop"
          >
            <!-- 多选下拉框 -->
            <ElSelect
              v-model="form[`${item.prop}`]"
              :placeholder="`请选择${item.label}查询`"
              clearable
              multiple
              @change="search"
            >
              <ElOption
                v-for="v in item.options"
                :key="v.value"
                :label="v.label"
                :value="v.value"
                :disabled="v.disabled"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <!-- 操作按钮 -->
    <div
      v-if="false"
      class="flex-box justify-end align-end"
      :class="$style.btnBox"
    >
      <ElButton @click="reset"> 重置 </ElButton>
      <ElButton type="primary" @click="search"> 搜索 </ElButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "IFilter",
  props: {
    filterList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    searchStr() {
      return this.filterList.find((v) => v.type === "input");
    },
  },
  watch: {
    filterList: {
      deep: true,
      immediate: true,
      handler(val) {
        val?.forEach((v) => {
          // 各类型初始值
          const ENUMS_VALUE = {
            input: "",
            select: "",
            selects: [],
          };

          // 赋值
          this.$set(this.form, v.prop, ENUMS_VALUE[v.type]);
        });
      },
    },
  },
  methods: {
    // 重置
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },

    // 搜索
    search() {
      this.$emit("search", JSON.parse(JSON.stringify(this.form)));
    },
  },
};
</script>

<style lang="scss" module>
.container {
  .btnBox {
    margin: 0 0 22px 100px;
  }

  .elseBox {
    padding: 20px 18% 0;
  }
}
</style>
