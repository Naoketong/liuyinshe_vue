<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-position="left"
        label-width="160px"
      >
        <h3>添加课程</h3>
        <el-form-item label="课程名称" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入课程" />
        </el-form-item>
        <el-form-item label="课程描述" prop="name" style="width:460px;">
          <el-input v-model="formData.description" placeholder="请输入课程描述" />
        </el-form-item>
        <el-form-item label="教师" prop="teacher" style="width:460px;">
          <el-input v-model="formData.teacher" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item label="教师联系方式" prop="teacher_phone" style="width:460px;">
          <el-input v-model="formData.teacher_phone" placeholder="请输入教师联系方式" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleCreateManager"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import courseModel from '@/models/course'
export default {
  data() {
    return {
      loading: false,
      rules: {
      	name: [{ required: true, message: "请输入课程", trigger: "blur" }],
        teacher_phone: [
          { required: true, message: "请输入教师联系方式", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        description: [{required: true, message: "请输入课程描述", trigger: "blur"}],
        teacher: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
      },
      formData: {
        name: "",
        phone: "",
        teacher: "",
        teacher_phone: "",
        description: "",
      }
    };
  },
  methods: {
    handleCreateManager() {
      let name = this.formData.name;
      let teacher_phone = this.formData.teacher_phone;
      let description = this.formData.description;
      let teacher = this.formData.teacher;
     
      let params = { name,teacher_phone,description, teacher }
       console.log(params)
      courseModel.add(params).then().catch();
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$message.success("添加成功");
          this.$router.push({ name: "Course" });
        }
      });
    },
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
