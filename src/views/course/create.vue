<template>
  <div class="course-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>
      <el-form>
        <div v-show="activeStep == 0">
          <el-form-item label="课程名称" label-width="70px">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" label-width="70px">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述" label-width="70px">
            <el-input v-model="course.previewFirstField" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名" label-width="70px">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介" label-width="70px">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序" label-width="70px">
            <el-input-number v-model="course.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep == 1">
          <el-form-item label="课程封面" label-width="70px">
            <!-- upload -->
            <course-image v-model="course.courseListImg"/>
          </el-form-item>
          <el-form-item label="解锁封面" label-width="70px">
         <course-image v-model="course.courseImgUrl"/>
          </el-form-item>
        </div>
        <div v-show="activeStep == 2">
          <el-form-item label="售卖价格" label-width="70px">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价" label-width="70px">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量" label-width="70px">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签" label-width="70px">
            <el-input placeholder="请输入内容" v-model="input2"> </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep == 3">
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch
              v-model="isSeckill"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="isSeckill">
            <el-form-item label="开始时间" label-width="70px">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" label-width="70px">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" label-width="70px">
              <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" label-width="70px">
              <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep == 4">
          <el-form-item>
            <el-form-item label="课程详情" label-width="70px">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep == 4 ? false : true">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { saveOrUpdateCourse,uploadCourseImage } from '@/services/courses'
import CourseImage from "./components/CourseImage.vue";
export default Vue.extend({
  components: { CourseImage },
  name: "CourseCreate",
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: "基本信息", icon: "el-icon-edit" },
        { title: "课程封面", icon: "el-icon-upload" },
        { title: "销售信息", icon: "el-icon-upload" },
        { title: "秒杀活动", icon: "el-icon-picture" },
        { title: "课程详情", icon: "el-icon-edit" },
      ],
      imageUrl: "",
      isSeckill: false,
      course:{
          id: 0,
          courseName: '',
          brief: '',
          teacherDTO: {
              id: 0,
              courseId: 0,
              teacherName: '',
              teacherHeadPicUrl: '',
              position: '',
              description: ''
          },
          courseListImg: '',
          courseImgUrl: ''
      }
    };
  },
  methods: {},
});
</script>
<style lang="scss" scoped>

</style>