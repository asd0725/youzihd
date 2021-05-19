<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <div class="top">
        <el-row>
          <el-col :span="10">
            <el-input placeholder="请输入昵称或用户名" v-model="search_info">
              <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>

      <div class="bodys">
        <template>
          <el-table :data="userDataList" border style="width: 100%" stripe>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="user_img" label="头像" width="180">
              <template slot-scope="scope">
                <img
                  :src="
                    scope.row.user_img == ''
                      ? 'https://s3.ax1x.com/2021/02/20/y5pGZ9.png'
                      : scope.row.user_img
                  "
                  min-width="70"
                  height="70"
                />
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="user_ur" label="用户名"> </el-table-column>
            <el-table-column prop="password" label="密码"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >

                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogEdit"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          :model="editruleForm"
          :rules="editRule"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="dialog-imags">
            <img
              v-bind:src="
                editruleForm.user_img == ''
                  ? 'https://s3.ax1x.com/2021/02/20/y5pGZ9.png'
                  : editruleForm.user_img
              "
              alt=""
            />
            <el-checkbox v-model="checked" :disabled="delif"
              >删除用户头像</el-checkbox
            >
          </div>

          <el-form-item label="昵称" prop="user_name">
            <el-input v-model="editruleForm.user_name"></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="user_ur">
            <el-input v-model="editruleForm.user_ur" disabled></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              :disabled="true"
              v-model="editruleForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editSave()">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="删除后不可恢复，请谨慎操作！"
        :visible.sync="deletedialog"
        width="30%"
        :before-close="canceldelete"
      >
        <el-form
          :model="deleteForm"
          :rules="deleteRules"
          ref="deleteruleForm"
          label-width="100px"
        >
          <el-form-item label="超级密码" prop="spassword">
            <el-input type="password" v-model="deleteForm.spassword"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canceldelete">取 消</el-button>
          <el-button type="primary" @click="deleteUser()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      userDataList: [],
      dialogEdit: false, //修改框的dialog
      deletedialog: false, //删除框的dialog

      //修改框预验证
      editRule: {
        user_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        user_ur: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },

      //删除框预验证
      deleteRules:{
        spassword:[{ required: true, message: "请输入超级密码", trigger: "blur" }]
      },



      editruleForm: {
        user_img: "",
        user_name: "",
        user_ur: "",
        password: "",
        user_id: "",
      },
      checked: false,
      delif: false,
      deleteForm:{
        spassword:''
      },
      guser_id:'',
      search_info:''
    };
  },
  created() {
    this.getuserList();
  },
  methods: {
    //获取用户列表信息
    async getuserList() {
      // this.axios({
      //   url: "http://localhost:3000/api/backuser/user",
      //   method: "get",
      // }).then((res) => {
      //   // console.log(res);
      //   this.userDataList = res.data.data;
      // });

      const res = await this.axios({
        url: "backuser/user",
        method: "get",
      });
      this.userDataList = res.data.data;
    },

    //编辑框事件
    handleEdit(index, row) {
      this.dialogEdit = true;
      this.editruleForm.user_img = row.user_img;
      this.editruleForm.user_name = row.user_name;
      this.editruleForm.user_ur = row.user_ur;
      this.editruleForm.password = row.password;
      this.editruleForm.user_id = row.user_id;
      this.delif = row.user_img == "" ? true : false;
    },

    //删除框事件
    handleDelete(index, row) {
      this.deletedialog = true;
      this.guser_id = row.user_id
    },

    //删除函数
    deleteUser() {
      //预验证
      this.$refs.deleteruleForm.validate((valid) => {
        if (!valid) return;
        this.axios({
          url: "backuser/deleteuser",
          method: "post",
          params: {
            supers: this.deleteForm.spassword,
            user_id: this.guser_id,
          },
        }).then((res) => {
          // console.log(res);
          if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.deletedialog = false
          }else if(res.data.code==400){
            this.$message.error(res.data.msg)
          }
      this.$router.go(0);

        });
      });
    },

    //

    //删除弹框关闭
    canceldelete(){
      this.deletedialog = false;
      this.deleteForm.spassword = ''
    },

    //dialog框关闭前询问
    handleClose(done) {
      this.$confirm("还未保存，是否关闭？")
        .then((_) => {
          done();
          this.checked = false;
          this.deleteForm.spassword = "";
        })
        .catch((_) => {});
    },

    //修改保存并出发预验证
    editSave() {
      this.$refs.editForm.validate(async(valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await this.axios({
          url: "backuser/edituser",
          method: "post",
          params: {
            user_img: this.checked ? "" : this.editruleForm.user_img,
            user_name: this.editruleForm.user_name,
            user_ur: this.editruleForm.user_ur,
            user_id: this.editruleForm.user_id,
          },
        });

        this.$message.success("修改成功")
        this.dialogEdit = false
      });

      //保存后刷新页面
      this.$router.go(0);
    },


    //搜索
    searchuser(){
      this.axios({
        url:'http://localhost:3000/api/backuser/searchuser',
        method:'post',
        params:{
          user_info:this.search_info
        }
      }).then((res)=>{
        // console.log(res);
        this.userDataList = res.data.data
      })
    },

  },
  components: {},
  mounted() {},
};
</script>

<style scoped lang="less">
.container {
  .bodys {
    margin-top: 10px;
  }
}

.dialog-imags {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  img {
    margin-left: 40px;
  }
}
.el-checkbox {
  height: 50px;
  line-height: 50px;
}
</style>
