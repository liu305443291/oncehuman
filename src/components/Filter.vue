<!-- 筛选框 组件 -->
<template>
  <div :class="$style.container" class="form flex-box space-between">
    <!-- 筛选框 -->
    <ElForm inline ref="form" :model="form" class="flex-auto">
      <ElRow>
        <!-- 搜索框 -->
        <ElCol
          :span="24"
          v-if="!!searchObj"
          class="inputBox flex-box justify-center align-center"
        >
          <ElFormItem :prop="searchObj?.prop">
            <ElInput
              v-model="form[`${searchObj.prop}`]"
              :placeholder="`请输入${searchObj.label}`"
              clearable
            >
              <el-button slot="append" @click="search" icon="el-icon-search" />
            </ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow :class="$style.elseBox">
        <!-- 清空按钮 -->
        <ElCol :span="6" class="flex-box justify-center align-center clearBtn">
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
          <!-- 下拉框 -->
          <ElFormItem v-if="item.type === 'select'" :prop="item.prop">
            <ElSelect
              v-model="form[`${item.prop}`]"
              @change="search"
              :placeholder="`请选择${item.label}`"
              :class="!form[`${item.prop}`] || 'active'"
              clearable
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

          <!-- 多选下拉框 -->
          <ElFormItem v-if="item.type === 'selects'" :prop="item.prop">
            <ElSelect
              v-model="form[`${item.prop}`]"
              @change="search"
              :placeholder="`请选择${item.label}`"
              :class="!form[`${item.prop}`] || 'active'"
              clearable
              multiple
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
    searchObj() {
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
  .elseBox {
    padding: 20px 18% 0;
  }
}
</style>
