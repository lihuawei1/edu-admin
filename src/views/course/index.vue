<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="上架" value="shanghai"></el-option>
          <el-option label="下架" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <courses-list/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CoursesList from "./components/CoursesList.vue"

export default Vue.extend({
  name: "courses",
  components: {
      CoursesList
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      records: [],
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleEdit() {},
    handleDelete() {},
  },
});
</script>
<style lang="scss" scoped></style>