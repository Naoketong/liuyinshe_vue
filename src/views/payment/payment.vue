<template>
  <div>
    <v-breadcrumb />
    <div class="pg-main-header">
    </div>
    <div >
      <el-form label-position="right" inline label-width="80px">
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
        <el-form-item label="类型：">
          <el-select v-model="form.status">
            <el-option label="充值" :value="1" />
            <el-option label="消费" :value="2" />
            <el-option label="赠送" :value="3" />
          </el-select>
        </el-form-item>
        <div style="display: inline-block;">
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
      
      <div class="page-input">
        <el-input class="page-input-item" v-model="seekInput" placeholder="请输入姓名"></el-input>
        <el-button class="page-input-button" type="primary" @click="seekButton">搜索</el-button>
      </div>

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
          
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="created_at" label="时间"></el-table-column>
          <el-table-column prop="total" label="金额"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope" >
              <el-tag :type="scope.row.status === 1 ? 'success' : ''" @click="handEdit(scope.row,scope.$index)">
                {{ scope.row.status === 1 ? "充值" : "消费" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>

      </el-table>
    </div>
    <div class="pg-main-body">
      <el-table
        :data="paymentData"
        size="small"
        style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="created_at" label="时间"></el-table-column>
        <el-table-column prop="total" label="金额"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope" >
            <el-tag :type="scope.row.status === 1 ? 'success' : ''" @click="handEdit(scope.row,scope.$index)">
              {{ scope.row.status === 1 ? "充值" : "消费" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

      </el-table>
       <el-pagination
        style="margin-top: 20px;float: right;margin-right: 200px;"
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
  </div>
</template>

<script>
import paymentModel from '@/models/payment'
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
// import axios from "axios"

export default {
  data () {
    return {
      paymentData:[],
      seekPaymentData:[],
      formBoxShow:false,
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      seekInput:'',


      form: {
        status: "",
        date: []
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
        status: this.form.status//x
      };
      let formDate = this.form.date;
      if (formDate.length) {
        params.start_at = formDate[0];
        params.end_at = formDate[1];
      }//x
      paymentModel
        .list(params)
        .then(res => {
          this.paymentData = res.data.datas;
          console.log(res.data)
          this.pagination.pageSize = Number(res.data.pagination.page_size);
          this.pagination.currentPage = Number(res.data.pagination.current_page);
          this.pagination.total = Number(res.data.pagination.total);
        })
    },
    seekButton() {
      this.formBoxShow = true;
      let name = this.seekInput;
      paymentModel.paymentAlone({name}).then(res=>{
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
