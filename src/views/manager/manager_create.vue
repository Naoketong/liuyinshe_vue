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
        <h3>子管理员信息</h3>
        <el-form-item label="真实姓名" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:460px;">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:460px;">
          <el-input v-model="formData.password" placeholder="请输入密码" />
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
import managerModel from '@/models/manager'
export default {
  data() {
    return {
      loading: false,
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{required: true, message: "请输入密码", trigger: "blur"}]
      },
      formData: {
        name: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    handleCreateManager() {
      let name = this.formData.name;
      let phone = this.formData.phone;
      let password = this.formData.password;
      let params = { name,phone,password }
      managerModel.add(params).then().catch();
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$message.success("创建成功");
          this.$router.push({ name: "Manager" });
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
