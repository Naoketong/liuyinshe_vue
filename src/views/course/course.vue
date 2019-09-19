<template>
  <div>
    <v-breadcrumb />
    <div class="pg-main-header">
    	<div class="page-input">
        <el-input class="page-input-item" v-model="seekInput" placeholder="请输入课程名称"></el-input>
        <el-button class="page-input-button" type="primary" @click="seekButton">搜索</el-button>
      </div>
    <div class="page-seek" v-show="formBoxShow">
      <h2 icon="el-icon-eleme">搜索结果</h2>
      <i class="el-icon-close" 
        style="
          display: inline-block;
          margin-left: 30px;
          cursor: pointer;"
          @click="seekclose"
      >关闭</i>
      <!-- <h3 v-show="seeknone" style="text-align: center;font-size: 20px;color: #f43636;">查无此人</h3> -->
      <el-table
        :data="seekPaymentData"
        size="small"
        style="width: 100%">
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="description" label="课程描述"></el-table-column>
        <el-table-column prop="teacher" label="授课老师"></el-table-column>
        <el-table-column prop="teacher_phone" label="老师电话"></el-table-column>
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
    <el-pagination
        style="margin-top: 20px;"
        v-if="pagination.total > pagination.pageSize"
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="getData"
      >
    </el-pagination>
    </div>
    <div >
    </div>
    
    <div class="pg-main-body">
      <el-button type="primary" @click="handAdd">添加课程</el-button>
      <el-table
        :data="courseData"
        size="small"
        style="width: 100%">
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="description" label="课程描述"></el-table-column>
        <el-table-column prop="teacher" label="授课老师"></el-table-column>
        <el-table-column prop="teacher_phone" label="老师电话"></el-table-column>
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
import courseModel from '@/models/course'
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data () {
    return {
      courseData:[],
      seekPaymentData:[],
      formBoxShow:false,
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      seekInput:'',
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

      courseModel
        .list(params)
        .then(res => {
          this.courseData = res.data.datas;
          this.pagination.pageSize = Number(res.data.pagination.page_size);
          this.pagination.currentPage = Number(res.data.pagination.current_page);
          this.pagination.total = Number(res.data.pagination.total);
        })
    },
    handAdd: function() {
      this.$router.push({ name: "CourseCreate" });
    },
    handEdit: function(row){
      const { id } = row;
      this.$router.push({
        name: "CourseEdit",
        params: { id }
      });
    },
    handDel: function(data,index){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() =>{
        return courseModel.delete(data.id)
      })
      .then(()=>{
        this.courseData.splice(index,1)
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
    seekButton() {
      this.formBoxShow = true;
      let name = this.seekInput;
      courseModel.courseAlone({name}).then(res=>{
        console.log(res.data)
        this.seekPaymentData = res.data;
        console.log(this.seekPaymentData)
       
      })
      // axios.get('/api/payment/alone/',{params:{
      //   name:this.seekInput
      // }}).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    seekclose(){
      this.formBoxShow = false;
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
  .page-input{
    margin-top: 20px;
    .page-input-item{
      width: 200px;
      height: 30px;
      margin-right: 20px;
    }
  }
  .page-seek{
    border-bottom: 1px solid #F56C6C;
    margin-bottom: 30px;
    h2{
      display: inline-block;
      color: #F56C6C;
    }
  }

</style>
