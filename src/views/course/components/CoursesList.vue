<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="display: flex;justify-content: space-between;align-items: center;">
        <span>查询结果</span>
        <el-button type="primary" @click="$router.push({name:'course-create'})">添加课程</el-button>
      </div>
      <el-table :data="records" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
          <template slot-scope="scope"> ¥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >上架</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getQueryCourses, changeState } from "@/services/courses";
import Vue from "vue";

export default Vue.extend({
  name: "CoursesList",
  data() {
    return {
      records: [],
      value: true,
    };
  },
  mounted() {
    this.getQueryCourses();
  },
  methods: {
    async getQueryCourses() {
      const { data }: any = await getQueryCourses({
        currentPage: 1,
        pageSize: 200,
      });
      data.data.records.forEach((item: any) => {
        item.isStatusLoading = false;
      });
      if (data.code == "000000") {
        this.records = data.data.records;
      }
    },
    async onStateChange(course: any) {
      course.isStatusLoading = true;
      const { data } = await changeState({
        courseId: course.id,
        status: course.status,
      });
      course.isStatusLoading = false;
      this.$message.success(`${course.status === 0 ? "下架" : "上架"}`);
    },
    handleEdit() {},
    handleDelete() {},
  },
});
</script>
<style lang="scss" scoped></style>