<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name:'menu-create'})">添加菜单</el-button>
      </div>
       <el-table
      :data="menus"
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index"
        min-width="150"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名称"
        min-width="150"
        >
      </el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数"
        min-width="150"
        >
      </el-table-column>
       <el-table-column
        prop="icon"
        label="前端图标"
        min-width="150"
        >
      </el-table-column>
       <el-table-column
        prop="orderNum"
        label="排序"
        min-width="150"
        >
      </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { getAllMenus,deleteMenu } from "@/services/menu";
export default Vue.extend({
  name: "AdvertIndex",
  data() {
      return {
           menus: []
      }
  },
  created () {
      this.loadAllMenus()
  },
  methods: {
      async loadAllMenus() {
          const { data }:any = await getAllMenus()
          if (data.code === '000000') {
              this.menus = data.data

          }
      },
       handleEdit(item:any) {
         this.$router.push({
             name: 'menu-edit',
             params: {
                 id: item.id
             }
         })
      },
      handleDelete(index: number,item: any) {
        console.log(index,item)
        this.$confirm('确认删除吗','删除提示',{}).then(()=>{
          const { data }:any = deleteMenu(item.id)
          if(data.code === '000000') {
              this.$message.success('删除成功')
              this.loadAllMenus()
          }
        }).catch(()=>{
            this.$message.warning('取消删除')
        })
      }
  }
});
</script>
<style lang="scss" scoped></style>