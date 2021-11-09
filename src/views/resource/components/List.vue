<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select 
             v-model="form.categoryId" 
             placeholder="请选择资源分类"
             clearable
             >
              <el-option 
               v-for="item in resourceCategories"
               :label="item.name" 
               :value="item.id"
               :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button 
            :disabled="isLoading"
            type="primary" 
            @click="onSubmit"
            >查询</el-button>
            <el-button
             :disabled="isLoading"
             @click="onReset()"
             >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="isLoading" :data="resources" style="width: 100%; margin-bottom: 20px">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" label="资源路径" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="180">
        </el-table-column>
        <el-table-column prop="createdTime" label="添加时间" width="180">
        </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>

      <div class="block">
        <!-- :current-page.sync="form.current"  页数改变回到第一页 -->
        <el-pagination
          :disabled="isLoading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getResourcePages } from "@/services/resource";
import { getResourceCategories } from "@/services/resource-category"
import { Form } from "element-ui";
export default Vue.extend({
  name: "ResourceList",
  data() {
    return {
      resources: [],
      form: {
        name: "",
        url: "",
        categoryId: null,
        current: 1,
        size: 5,
      },
      totalCount: 0,
      resourceCategories: [] as any, //资源分类列表
      isLoading:false
    };
  },
  mounted() {
    this.loadResources();
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories() {
      const { data }:any = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources() {
      this.isLoading = true //展示加载中状态
      const { data }: any = await getResourcePages(this.form);
      this.resources = data.data.records;
      this.totalCount = data.data.total;
      this.isLoading = false //关闭加载中状态
    },
    onSubmit() {
      console.log("submit!")
      this.form.current = 1

    },
    handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`);
      this.form.size = val;
      this.form.current = 1;
      this.loadResources();
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
      this.form.current = val;
    },
    onReset(){
        (this.$refs.form as Form).resetFields()
        this.form.current = 1 //重置回到第一页
        this.loadResources()
    }
  },
});
</script>
<style lang="scss" scoped></style>