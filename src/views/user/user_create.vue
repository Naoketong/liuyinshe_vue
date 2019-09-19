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
        <h3>添加学员信息</h3>
        <el-form-item label="真实姓名" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex" style="width:460px;">
          <el-select v-model="formData.sex" placeholder="请选择">
            <el-option :label="'男'" :value="1"></el-option>
            <el-option :label="'女'" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday" style="width:460px;">
          <el-date-picker
            v-model="formData.birthday" 
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:460px;">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:460px;">
          <el-input v-model="formData.password" placeholder="请输入密码" />
        </el-form-item>
         <el-form-item label="紧急联系人姓名" prop="sms_name" style="width:460px;">
          <el-input v-model="formData.sms_name" placeholder="请输入紧急联系人姓名" />
        </el-form-item>
        <el-form-item label="紧急联系人电话" prop="sms_phone" style="width:460px;">
          <el-input v-model="formData.sms_phone" placeholder="请输入紧急联系人手机号" />
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
import userModel from '@/models/user'
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
      let id = this.$route.params.id;
      let name = this.formData.name;
      let password = this.formData.password;
      let phone = this.formData.phone;
      let sex = this.formData.sex;
      let birthday = this.formData.birthday;
      let sms_name = this.formData.sms_name;
      let sms_phone = this.formData.sms_phone;
      let params = { name, password, phone, sex, birthday, sms_name, sms_phone};
      userModel.add(params).then().catch();
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$message.success("创建成功");
          this.$router.push({ name: "User" });
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
