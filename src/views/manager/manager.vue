<template>
	<div>
    <v-breadcrumb />
    <div class="pg-main-header">
      <el-button type="primary" @click="handAdd">添加管理员</el-button>
   <!--    <el-dialog :title="formBoxTitle" :visible="formBoxShow">
        <el-form >
          <el-form-item label="姓名" label-width="60px">
            <el-input name="name" width="200" v-model="formBoxValue.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" label-width="60px">
            <el-input name="phone" width="200" v-model="formBoxValue.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="60px">
            <el-input type="password" name="password" width="200" v-model="formBoxValue.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handSave">保存</el-button>
          <el-button @click="handCancel">取消</el-button>
        </div>
      </el-dialog> -->
    </div>
    <div class="pg-main-body">
      <el-table
      :data="managerData"
        size="small"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button class="edit-button" type="text" icon="el-icon-edit" @click="handEdit(scope.row,scope.$index)">编辑</el-button>
            <el-button class="edit-button del"  type="text" icon="el-icon-delete" @click="handDel(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import managerModel from '@/models/manager'
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data () {
    return {
      managerData:[],
      // dataIndex: null,
      // formBoxID: null,
      // formBoxShow: false,
      // formBoxTitle: '',
      formBoxValue: {
        name: '',
        password: '',
        phone: '',
      }
    }

  },
  created () {
    managerModel.list().then( res => {
      this.managerData = res.data;
    })
  },
  methods: {
    handAdd: function() {
      this.$router.push({ name: "ManagerCreate" });
    },
    // handAdd: function() {
    //   this.formBoxShow = true;
    //   this.formBoxTitle = '添加管理员';
    //   this.formBoxID = '';
    //   this.formBoxValue.name = '';
    //   this.formBoxValue.password = '';
    //   this.formBoxValue.phone = '';
    // },
    // handCancel: function(){//取消设置
    //   this.formBoxShow = false;
    //   this.formBoxID = '';
    //   this.formBoxValue.name = '';
    //   this.formBoxValue.password = '';
    //   this.formBoxValue.phone = '';
    // },
    handEdit: function(row){
       const { id } = row;
      this.$router.push({
        name: "ManagerEdit",
        params: { id }
      });
    },
    // handSave: function(){
    //   let id = this.formBoxID;
    //   let name = this.formBoxValue.name;
    //   let phone = this.formBoxValue.phone;
    //   let password = this.formBoxValue.password;
    //   let index = this.dataIndex;
    //   let params = { name, phone, password }
    //   if(!name || !phone || !password){
    //     this.$message.error('缺少必要参数');
    //     return
    //   }
    //   if(id){
    //     managerModel.update(id, params)
    //     .then(()=>{
    //       this.managerData[index].name = name;
    //       this.managerData[index].phone = phone;
    //       this.managerData[index].password = password;
    //       this.formBoxShow = false;
    //       this.$message.success('修改成功');
    //     })
    //     .catch(()=>{
    //       this.formBoxShow = false;
    //     })
    //   }else{
    //     managerModel.add(params)
    //     .then(res =>{
    //       let id = res.data.id;
    //       params.id = id;
    //       this.managerData.push(params)
    //       this.formBoxShow = false;
    //       this.$message.success('添加成功');
    //     })
    //     .catch(()=>{
    //       this.formBoxShow = false;
    //     })
    //   }
    // },
    handDel: function(data,index){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() =>{
        return managerModel.delete(data.id)
      })
      .then(()=>{
        this.managerData.splice(index,1)

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
}
</script>

<style lang="less">
  .pg-main-body{
    margin-top: 20px;
  }
  .edit-button{
    width: 70px;
    height: 38px;
    background-color: #66b1ff;
    border-color: #409EFF;
    color: #fff;
    vertical-align: top;
  }
  .edit-button:hover{
    background-color:#66b1ff;
    opacity: .8;
    color: #fff;
  }
  .edit-button.del{
    background-color:#F56C6C;
    color: #fff;
    border:none;
  }
</style>
