<template>
  <div>
    <IDrawer @close="close()" :drawer="drawer" title="添加">123</IDrawer>
  </div>
</template>

<script>
import IDrawer from "@/components/Drawer.vue";

export default {
  name: "MyDrawer",
  components: {
    IDrawer,
  },
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.form = {};
    },
  },
};
</script>
