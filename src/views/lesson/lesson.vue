<template>
  <div class="page-container">
    <v-breadcrumb />
    <div class="page-content" v-loading="loading">
      <h3>课时信息</h3>
      <el-form inline label-position="left" label-width="80px">
        <el-form-item label="开始时间" style="width:240px;">
          {{ lesson.start_time }}
        </el-form-item>
        <el-form-item label="结束时间" style="width:240px;">
          {{ lesson.end_time }}
        </el-form-item>
        <el-form-item label="课时状态" style="width:280px;">
          <el-select
            v-model="lesson.status"
            @change="handleChangeStatus"
            placeholder="课时状态"
          >
            <el-option :label="'已结束'" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <h3>报名学员</h3>
      <el-table
      	ref="multipleTable"
        :data="users"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        class="mb-20"
      >
        <el-table-column
          type="selection"
          :selectable="row => row.status === 2"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="name" label="学员名称"></el-table-column>
        <el-table-column label="点名情况">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未点名</el-tag>
            <el-tag v-if="scope.row.status === 1" type="danger">请假</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">已点名</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finish_at" label="时间"> </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="!selectUserIds.length"
          >点名</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Breadcrumb from "@/components/BasicBreadcrumb.vue";
import lessonModel from '@/models/lessons'

export default {
  data() {
    return {
      loading: true,
      users: [],
      selectUserIds: [],
      lesson: {
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      lessonModel
        .list(id)
        .then(res => {
          this.users = res.data.users;
          this.lesson = res.data.lesson;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleChangeStatus() {
      let id = this.$route.params.id;
      lessonModel
        .status(id, {
          status: this.lesson.status
        })
        .then(res => {
          if (res.code === 200) {
            this.$message.success("成功修改课时状态！");
          }
        });
    },
    handleSelectionChange(row) {
    	
      this.selectUserIds = row
        .filter(data => data.status)
        .map(data => data.id);
        console.log(this.selectUserIds)
    },
    handleSubmit: async function() {
      let id = this.$route.params.id;
      let selectUserIds = this.selectUserIds;
      console.log(id, selectUserIds)
      
      try {
        selectUserIds.forEach(async user_id => {
        	console.log(user_id)
          await lessonModel.callnow(id, { user_id });
        });
        this.handleResetUsers();
      } catch (e) {
        console.log(e);
      }
    },
    handleResetUsers() {
      this.users.forEach(data => {
        if (this.selectUserIds.includes(data.id)) {
          data.status = 2;
          data.finish_at = new Date().toJSON();
        }
      });
      this.selectUserIds = [];
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
  components: {
    "v-breadcrumb": Breadcrumb
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
