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
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="解锁封面" label-width="70px">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import { saveOrUpdateCourse } from '@/services/courses'
export default Vue.extend({
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
  methods: {
    handleAvatarSuccess(res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
});
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>