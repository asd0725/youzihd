<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>热映列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-upload
      class="avatar-uploader"
      action="http://localhost:3000/api/reying/imgse/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->

    <div class="top">
      <div class="inputs">
        <el-input v-model="search_name" placeholder="请输入内容">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchreying"
          ></el-button>
        </el-input>
      </div>
      <div class="selects">
        <el-button type="primary" @click="insertMovie">添加电影</el-button>
      </div>
    </div>
    <div class="body">
      <el-card class="box-card">
        <el-table
          :data="reyingList"
          border
          style="width: 100%"
          stripe
          @row-dblclick="testclick"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="movie_id" label="电影id" width="80px">
          </el-table-column>
          <el-table-column prop="img" label="电影海报" width="100px">
            <template slot-scope="scope">
              <img
                :src="
                  scope.row.img == ''
                    ? 'https://s3.ax1x.com/2021/02/20/y5pGZ9.png'
                    : scope.row.img
                "
                min-width="70"
                height="70"
              />
            </template>
          </el-table-column>
          <el-table-column prop="movie_name" label="电影名"> </el-table-column>
          <el-table-column prop="tag" label="类型"> </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="movie_info"
            label="电影信息"
          >
          </el-table-column>
          <el-table-column prop="people_number" label="评价人数" width="80px">
          </el-table-column>
          <el-table-column prop="rate" label="评分" width="80px">
          </el-table-column>
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
              <el-button
                size="mini"
                type="info"
                @click="alterimg(scope.$index, scope.row)"
                >修改封面</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template prop="status" slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-text="已上映"
                inactive-text="未上映"
                @change="changestatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      title="修改电影信息"
      :visible.sync="reyingEdit"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="reyingForm"
        :rules="reyingrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="电影id" prop="movie_id">
          <el-input :disabled="true" v-model="reyingForm.movie_id"></el-input>
        </el-form-item>
        <el-form-item label="电影名" prop="movie_name">
          <el-input v-model="reyingForm.movie_name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="tag">
          <el-input v-model="reyingForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="电影信息" prop="movie_info">
          <el-input
            v-model="reyingForm.movie_info"
            type="textarea"
            maxlength="255"
            :autosize="{ minRows: 2, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="评价人数">
          <el-input
            v-model="reyingForm.people_number"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-input v-model="reyingForm.rate" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reyingEditSave">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改图片"
      :visible.sync="alertimgVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>点击上传图片</span>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/api/reying/imgse"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="{ movie_id: alert_movie_id }"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgsave">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除电影"
      :visible.sync="deleteMovieVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请输入超级密码</span>
      <el-form
        :model="deletemovieForm"
        :rules="deletemovieRule"
        ref="deletemovieruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="超级密码" prop="suposs">
          <el-input v-model="deletemovieForm.suposs" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deletemovie">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reyingList: [],
      reyingEdit: false,
      reyingForm: {
        img: "",
        movie_name: "",
        movie_id: "",
        movie_info: "",
        people_number: "",
        rate: "",
        tag: "",
        status: "",
      },
      reyingrules: {
        movie_name: [
          { required: true, message: "请输入电影名", trigger: "blur" },
        ],
        movie_info: [
          { required: true, message: "请输入电影信息", trigger: "blur" },
        ],
        tag: [{ required: true, message: "请输入电影信息", trigger: "blur" }],
        movie_id: [{ required: true, message: "请输入id", trigger: "blur" }],
      },

      deletemovieRule: {
        suposs: [
          { required: true, message: "请输入超级密码", trigger: "blur" },
        ],
      },

      edit_insert: false,
      search_name: "",
      imageUrl: "",
      alertimgVisible: false,
      alert_movie_id: {},
      imgcall: "",
      deleteMovieVisible: false,
      deletemovieForm: {
        movie_id: "",
        suposs: "",
      },
    };
  },
  created() {
    this.getreying();
  },
  mounted() {
    for (var item of this.reyingList) {
      item.status = 1;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgcall = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //获取热门中得电影信息
    async getreying() {
      const res = await this.axios({
        url: "reying/ryall",
        method: "get",
        params: {
          status: 1,
        },
      });
      for (var item of res.data.data) {
        item.status = true;
      }

      this.reyingList = res.data.data;
    },

    //表格编辑事件
    handleEdit(index, row) {
      this.reyingEdit = true;
      this.reyingForm.movie_id = row.movie_id;
      this.reyingForm.movie_name = row.movie_name;
      this.reyingForm.movie_info = row.movie_info;
      this.reyingForm.people_number = row.people_number;
      this.reyingForm.rate = row.rate;
      this.reyingForm.tag = row.tag;
      this.edit_insert = false;
    },

    //弹框关闭前事件
    handleClose(done) {
      this.$confirm("还未保存，是否关闭？")
        .then((_) => {
          done();
          this.reyingForm.movie_name = "";
          this.reyingForm.movie_id = "";
          this.reyingForm.movie_info = "";
          this.reyingForm.tag = "";
          this.reyingForm.people_number = "";
          this.reyingForm.rate = "";
        })
        .catch((_) => {});
    },

    //修改框保存
    reyingEditSave() {
      if (!this.edit_insert) {
        this.axios({
          url: "reying/reyingedit",
          method: "post",
          params: {
            img: "",
            movie_name: this.reyingForm.movie_name,
            movie_info: this.reyingForm.movie_info,
            tag: this.reyingForm.tag,
            movie_id: this.reyingForm.movie_id,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.reyingEdit = false;
            this.$router.go(0);
          } else {
            this.$message.success("修改失败，检查后重新提交");
          }
        });
      } else {
        this.axios({
          url: "reying/reyinginsert",
          method: "post",
          params: {
            img: "",
            movie_name: this.reyingForm.movie_name,
            movie_info: this.reyingForm.movie_info,
            tag: this.reyingForm.tag,
            movie_id: this.reyingForm.movie_id,
            status: 1,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.reyingEdit = false;
            this.$router.go(0);
          } else {
            this.$message.error("添加失败，检查后重新添加");
          }
        });
      }
    },

    //添加电影事件
    insertMovie() {
      this.reyingEdit = true;
      this.edit_insert = true;
    },

    //搜索电影名
    async searchreying() {
      const res = await this.axios({
        url: "reying/searchname",
        method: "post",
        params: {
          movie_name: this.search_name,
          status: 1,
        },
      });

      this.reyingList = res.data.data;
    },

    //修改图片
    alterimg(index, row) {
      this.alertimgVisible = true;
      this.alert_movie_id = row.movie_id;
    },

    //上传后保存图片
    imgsave() {
      if (this.imgcall.code == 200) {
        this.$message.success(this.imgcall.msg);
      } else {
        this.$message.error(this.imgcall.msg);
      }
      this.alertimgVisible = false;
      this.imageUrl = "";
      this.$router.go(0);
    },

    //删除电影
    handleDelete(index, row) {
      this.deleteMovieVisible = true;
      this.deletemovieForm.movie_id = row.movie_id;
    },

    //删除电影保存方法
    deletemovie() {
      console.log(this.deletemovieForm.suposs);
      this.$refs.deletemovieruleForm.validate((valid) => {
        if (!valid) return;
        this.axios({
          url: "reying/deletemovie",
          method: "post",
          params: {
            movie_id: this.deletemovieForm.movie_id,
            suposs: this.deletemovieForm.suposs,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.deleteMovieVisible = false;
            this.$router.go(0);
          } else if ((res.code = 400)) {
            this.$message.error(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },

    //修改电影状态
    changestatus(row) {
      if (!row.status) {
        this.axios({
          url: "/reying/editstatus",
          method: "post",
          params: {
            status: 0,
            movie_id: row.movie_id,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.axios({
          url: "/reying/editstatus",
          method: "post",
          params: {
            status: 1,
            movie_id: row.movie_id,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },

    testclick(row, column) {
      console.log(row);
      this.$router.push({
        name: "moviedetail",
        query: { movie_id: row.movie_id },
      });
    },
  },

  components: {},
};
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #2b0be0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #000000;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.top {
  display: flex;
  .inputs {
    width: 600px;
    margin-right: 50px;
  }
}
.body {
  margin-top: 20px;
}

.el-table-column {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.dialog-imags {
  margin-bottom: 20px;
}

//上传图片css
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
