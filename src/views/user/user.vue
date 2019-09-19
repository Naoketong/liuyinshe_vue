<template>
  <div>
    <v-breadcrumb />
    <div class="pg-main-header">
      <el-button type="primary" @click="handAdd">添加学员</el-button> 
    </div>
    <div class="pg-main-body">
      <el-pagination
        style="margin-top: 20px;"
        v-if="pagination.total > pagination.pageSize"
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="getData"
      ></el-pagination>
      <el-table
        :data="userData"
        size="small"
        style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope" >
            <el-tag :type="scope.row.sex === 1 ? 'success' : ''" @click="handEdit(scope.row,scope.$index)">
              {{ scope.row.sex === 1 ? "男" : "女" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生年月"></el-table-column>
        <el-table-column prop="sms_name" label="紧急联系人姓名"></el-table-column>
        <el-table-column prop="sms_phone" label="紧急联系人电话"></el-table-column>
        <el-table-column prop="balance" label="账户余额"></el-table-column>
        <!-- <el-table-column prop="timestamp" label="创建时间"></el-table-column> -->
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button class="edit-button" type="text" icon="el-icon-edit" @click="handEdit(scope.row,scope.$index)">编辑</el-button>
            <el-button class="edit-button det"  type="text" icon="el-icon-link" @click="handDetails(scope.row,scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import userModel from '@/models/user'
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data () {
    return {
      userData:[],
      formBoxValue: {
        name: '',
        password: '',
        phone: '',
      },
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
    }

  },
  created () {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        current_page: this.pagination.currentPage,
        page_size: this.pagination.pageSize,
      };
      // console.log(params)
      userModel
        .list(params)
        .then(res => {
          console.log(res)
          this.userData = res.data.datas;
          this.pagination.pageSize = Number(res.data.pagination.page_size);
          this.pagination.currentPage = Number(res.data.pagination.current_page);
          this.pagination.total = Number(res.data.pagination.total);
        })
    },
    handAdd: function() {
      this.$router.push({ name: "UserCreate" });
    },

    handEdit: function(row){
      const { id } = row;
      this.$router.push({
        name: "UserEdit",
        params: { id }
      });
    },
    handDetails: function(row){
      const { id } = row;
      this.$router.push({
        name: 'UserItem',
        params: { id }
      })      
    },
    // handDel: function(data,index){
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //   .then((res) =>{
    //     return userModel.delete(data.id)
    //   })
    //   .then(()=>{
    //     this.userData.splice(index,1)

    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     });
    //   })
    //   .catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });    
    // },
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
  }
  .edit-button:hover{
    background-color:#66b1ff;
    opacity: .8;
    color:#fff;
  }
  .edit-button.det{
    background-color:#f1e05a;
    border-color: yellow;
  }
  .edit-button.det:hover{
    background-color:#f1e05a;
    opacity: .8;

  }
  .edit-button.next{
    background-color:#28a745;
    border:none;
  }
  .edit-button.prev{
    background-color:#0366d6;
    border:none;
  }
</style>
