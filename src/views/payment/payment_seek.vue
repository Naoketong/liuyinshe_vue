<template>
  <div>
    <v-breadcrumb />
    <div class="pg-main-header">
    </div>
    <div >

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
      
    </div>
  </div>
</template>

<script>
import paymentModel from '@/models/payment'
import Breadcrumb from "@/components/BasicBreadcrumb.vue";

export default {
  data () {
    return {
      paymentData:[],
    }

  },
  created () {

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
