<template>
	<div>
    <v-breadcrumb />
    <div class="pg-main-header"  v-loading="loading">
      <el-form label-position="right" inline label-width="80px">
          <el-form-item label="班名：">
            <el-input v-model="form.name" placeholder="请输入班名" />
          </el-form-item>
          <el-form-item label="课程：">
            <el-select v-model="form.course_id">
              <el-option label="全部" :value="''" />
              <el-option
                v-for="item in courseData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.status">
              <el-option label="全部" :value="''" />
              <el-option label="未开启" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="已结束" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <div>
            <el-button type="primary" @click="getSelect">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form>
        <el-button type="primary" style="margin-top: 10px;" @click="handAdd">添加班级</el-button>


    </div>
    <div class="pg-main-body">
      <el-table
      :data="classData"
        size="small"
        style="width: 100%">
        <el-table-column prop="name" label="班级名称"></el-table-column>
        <el-table-column prop="course_name" label="课程"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="start_at" label="开始时间"></el-table-column>
        <el-table-column prop="end_at" label="结束时间"></el-table-column>
				<el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未开启</el-tag>
            <el-tag v-if="scope.row.status === 1" type="">进行中</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">已结束</el-tag>
          </template>
        </el-table-column>
        
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
import courseModel from '@/models/course'
import classModel from '@/models/class'  
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data () {
    return {
    	loading: true,
      classData:[],
      courseData:[],
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
      form: {
        name: "",
        status: "",
        date: [],
        course_id: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    }

  },
  created () {
    this.getCourse();
    this.getSelect();
  },
  methods: {
  	getCourse: function(){
  		courseModel.list().then( res => {
  			
	      this.courseData = res.data.datas;
	      console.log(this.courseData)
	    })
  	},
  	getSelect: function(){
  		console.log(11)
			let params = {
			    current_page: this.pagination.currentPage,
			    page_size: this.pagination.pageSize,
			    status: this.form.status,
			    course_id: this.form.course_id,
			    name: this.form.name
			  };
			  console.log(params);
			  let formDate = this.form.date;
			  if (formDate.length) {
			    params.start_at = formDate[0];
			    params.end_at = formDate[1];
			  }

			  classModel
			    .list(params)
			    .then(res => {
            console.log(res.data)
			      this.classData = res.data.datas;
			      this.pagination.pageSize = Number(res.data.pagination.page_size);
			      this.pagination.currentPage = Number(
			        res.data.pagination.current_page
			      );
			      this.pagination.total = Number(res.data.pagination.total);
			    })
			    .finally(() => {
			      this.loading = false;
			    });
  	},
  	getData() {
      
    },
    handAdd: function() {
      this.$router.push({ name: "ClassCreate" });
    },
    
    handEdit: function(row){
      const { id } = row;
      this.$router.push({
        name: "ClassEdit",
        params: { id }
      });
    },

    handDetails: function(row){
    	const { id } = row;
      this.$router.push({
        name: "ClassItem",
        params: { id }
      });
    },
    handleReset() {
      this.form.status = "";
      this.form.date = [];
      this.pagination.currentPage = 1;
      this.getData();
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
  .edit-button.det{
    background-color:#f1e05a;
    border-color: yellow;
  }
</style>
