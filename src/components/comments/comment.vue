<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            v-model="searchcomment"
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchc"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="value"
            placeholder="选择排序"
            @change="selecto($event)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-table
        :data="commentsList"
        border
        style="width: 100%; margin-top: 20px"
        stripe
      >
            <el-table-column type="index" width="50"> </el-table-column>

        <el-table-column prop="img" label="电影海报" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column prop="movie_name" label="电影" width="180">
        </el-table-column>
        <el-table-column prop="user_name" label="用户名"> </el-table-column>
        <el-table-column
          prop="comment"
          label="评论"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="rate" label="评分"> </el-table-column>
        <el-table-column prop="time" label="时间"> </el-table-column>
        <el-table-column prop="zan" label="赞成"> </el-table-column>
        <el-table-column prop="cai" label="反对"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentsList: [],
      options: [],
      value: "",
      searchcomment: "",
    };
  },
  created() {
    this.getcomments();
    this.getseloptions();
  },
  methods: {
    async getcomments() {
      let res = await this.axios({
        url: "comment/comments",
        method: "get",
      });
      this.commentsList = res.data.data;
    },

    async getseloptions() {
      let res = await this.axios({
        url: "comment/seloptions",
        method: "get",
      });
      this.options = res.data.data;
    },

    //删除row函数
    handleDelete(index, row) {
      this.axios({
        url: "comment/deletecomment",
        method: "post",
        params: {
          id: row.id,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.$router.go(0);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    selecto(row) {
      this.axios({
        url: "comment/order",
        method: "get",
        params: {
          value: row,
        },
      }).then((res) => {
        this.commentsList = res.data.data;
      });
    },

    searchc(){
      this.axios({
        url:'comment/searchcomment',
        method:'post',
        params:{
          comment:this.searchcomment
        }
      }).then((res)=>{
        this.commentsList = res.data.data
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
