<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>推荐列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="tjrankData" border style="width: 50%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="movie_name"
          label="电影"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="movie_id"
          label="姓名"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="tjrankVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
      :model="tjeditList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="电影名称" prop="movie_name">
          <el-input v-model="tjeditList.movie_name"></el-input>
        </el-form-item>
        <el-form-item label="电影id" prop="movie_id">
          <el-input v-model="tjeditList.movie_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSave"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tjrankData: [], //表格数据
      tjrankVisible: false, //dialog框
      tjeditList:{          //表单
        movie_name:'',
        movie_id:''
      },
      rules:{
        movie_name:[
          { required: true, message: '请输入电影名称', trigger: 'blur' }
        ],
        movie_id:[
          { required: true, message: '请输入电影id', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.gettjlist();
  },
  methods: {
    //dialog框关闭前询问
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.tjeditList.movie_name='';
          this.tjeditList.movie_id='';
        })
        .catch((_) => {});
    },

    //获取推荐表信息
    async gettjlist() {
      let res = await this.axios({
        url: "tuijian/tuijian",
        method: "get",
      });

      this.tjrankData = res.data.data;
    },

    //编辑事件
    handleEdit(index,row) {
      this.tjrankVisible = true;
      this.tjeditList.movie_name = row.movie_name;
      this.tjeditList.movie_id = row.movie_id
    },

    editSave(){
      this.axios({
        url:'tuijian/edittj',
        method:'post',
        params:{
          movie_name:this.tjeditList.movie_name,
          movie_id:this.tjeditList.movie_id
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.$message.success(res.data.msg)
          this.tjrankVisible = false
          this.$router.go(0)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
