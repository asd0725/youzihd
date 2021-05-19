<template>
 <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>热映榜列表</el-breadcrumb-item>
    </el-breadcrumb>     

        <el-card class="box-card">
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="searchry">
            <el-button slot="append" icon="el-icon-search" @click="getsearchry"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="rmrankList" stripe border style="width: 100%;margin-top:20px">
            <el-table-column type="index" width="50"> </el-table-column>

        <el-table-column prop="movie_id" label="电影id"> </el-table-column>

        <el-table-column prop="img" label="电影海报" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column prop="movie_name" label="电影" width="180">
        </el-table-column>
        <el-table-column prop="tag" label="标签"> </el-table-column>
        <el-table-column prop="movie_info" label="电影信息" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="people_number" label="评论人数"> </el-table-column>
        <el-table-column prop="rate" label="评分"> </el-table-column>

      </el-table>
    </el-card>
 </div>
</template>

<script>
export default {
 data() {
 return {
      rmrankList:[],
      searchry:''

 }
 },
  created(){
    this.getryrank();
  },
  methods:{
     async getryrank(){
       let res = await this.axios({
         url:'reying/ryrank',
         method:'get'
       })
        console.log(res);
       this.rmrankList = res.data.data
    },

    getsearchry(){
        this.axios({
            url:'reying/rysearch',
            method:'post',
            params:{
                movie_name:this.searchry
            }
        }).then((res)=>{
            this.rmrankList = res.data.data
        })
    }
  },
 components: {

 }
}
</script>

<style scoped lang="less">

</style>
