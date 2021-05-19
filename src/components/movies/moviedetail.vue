<template>
  <div class="container">
    <el-card class="box-card">
      <h1>电影详情修改或添加</h1>

      <div class="imgse">
        <div class="titlte">电影海报</div>
        <div class="imgs">
          <img v-bind:src="this.moviedetailForm.movie_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':this.moviedetailForm.movie_img" alt="" />
        </div>
        <div class="uplods">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击上传更换电影封面"
            placement="top-start"
          >
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/imgse"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :data="{ movie_id:this.qmovie_id ,whete:this.alterorsave}"
            >
              <img v-if="movie_mimg" :src="movie_mimg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tooltip>
        </div>
      </div>
      <el-form
        :model="moviedetailForm"
        :rules="moviedetailRules"
        ref="moviedetailRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="电影id" prop="movie_id">
              <el-input :disabled="true" v-model="moviedetailForm.movie_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="电影名" prop="movie_name">
              <el-input v-model="moviedetailForm.movie_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="导演" prop="director">
              <el-input v-model="moviedetailForm.director"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="编剧" prop="Screenwriter">
              <el-input v-model="moviedetailForm.Screenwriter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="演员" prop="actor">
              <el-input v-model="moviedetailForm.actor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="类型" prop="type">
              <el-input v-model="moviedetailForm.type"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="地区" prop="area">
              <el-input v-model="moviedetailForm.area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="语言" prop="language">
              <el-input v-model="moviedetailForm.language"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="上映日期" prop="showtime">
              <el-input v-model="moviedetailForm.showtime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="时长" prop="movietime">
              <el-input v-model="moviedetailForm.movietime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" type="flex">
          <el-col :span="20">
            <el-form-item label="简介" prop="brief">
              <el-input
                v-model="moviedetailForm.brief"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                maxlength="255"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" type="flex">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="savemoviedetail"
                >保 存</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="12">
            <el-form-item>
              <el-button type="warning">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="actorarea">
        <h4>演职员</h4>
        <el-row>
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1"
              :data="{ movie_id: this.qmovie_id, derive: 1, whethe: this.alterorsave }"
            >
              <img v-if="directorimg"  :src="directorimg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="directorrole"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="directorinfo"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
              :data="{ movie_id: this.qmovie_id, derive: 2, whethe: this.alterorsave }"
            >
              <img v-if="actor2img" :src="actor2img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="actor2role"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="actor2info"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload3"
              :data="{ movie_id: this.qmovie_id, derive: 3, whethe: this.alterorsave }"
            >
              <img v-if="actor3img" :src="actor3img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="actor3role"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="actor3info"
            ></el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 30px">
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess4"
              :before-upload="beforeAvatarUpload4"
              :data="{ movie_id: this.qmovie_id, derive: 4, whethe: this.alterorsave }"
            >
              <img v-if="actor4img" :src="actor4img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="actor4role"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="actor4info"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess5"
              :before-upload="beforeAvatarUpload5"
              :data="{ movie_id: this.qmovie_id, derive: 5, whethe: this.alterorsave }"
            >
              <img v-if="actor5img" :src="actor5img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="actor5role"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="actor5info"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/movie/director"
              :show-file-list="false"
              :on-success="handleAvatarSuccess6"
              :before-upload="beforeAvatarUpload6"
              :data="{ movie_id: this.qmovie_id, derive: 6, whethe: this.alterorsave }"
            >
              <img v-if="actor6img" :src="actor6img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
              placeholder="角色"
              style="width: 60%; margin-bottom: 15px"
              v-model="actor6role"
            ></el-input>
            <el-input
              placeholder="姓名"
              style="width: 60%"
              v-model="actor6info"
            ></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
          <el-col :span="5">
            <el-button type="primary" @click="saveactorinfo">保 存</el-button>
          </el-col>
          <el-col :span="5">
            <el-button type="warning">重 置</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moviedetailForm: {
        movie_id: "",
        movie_name: "",
        movie_img: "",
        director: "",
        Screenwriter: "",
        actor: "",
        type: "",
        area: "",
        language: "",
        showtime: "",
        movietime: "",
        brief: "",
      },
      moviedetailRules: {
        movie_id: [
          { required: true, message: "请输入电影id", trigger: "blur" },
        ],
        movie_name: [
          { required: true, message: "请输入电影名", trigger: "blur" },
        ],
        director: [{ required: true, message: "请输入导演", trigger: "blur" }],
        Screenwriter: [
          { required: true, message: "请输入编剧", trigger: "blur" },
        ],
        actor: [{ required: true, message: "请输入演员", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        area: [{ required: true, message: "请输入地区", trigger: "blur" }],
        language: [{ required: true, message: "请输入语言", trigger: "blur" }],
        showtime: [
          { required: true, message: "请输入上映时间", trigger: "blur" },
        ],
        movietime: [{ required: true, message: "请输入时长", trigger: "blur" }],
        brief: [{ required: true, message: "请输入简介", trigger: "blur" }],
      },
      qmovie_id: "",
      alterorsave: false, //保存按钮的事件,true为添加内容，，，false 为修改内容
      movie_mimg: "",
      actorimgse: {},
      actor2img: "",
      directorimg: "",
      actor3img: "",
      actor4img: "",
      actor5img: "",
      actor6img: "",
      directorinfo: "",
      directorrole: "",

      actor2info: "",
      actor2role: "",

      actor3info: "",
      actor3role: "",

      actor4info: "",
      actor4role: "",

      actor5info: "",
      actor5role: "",

      actor6info: "",
      actor6role: "",
    };
  },
  created() {
    this.qmovie_id = this.$route.query.movie_id;
    // console.log(this.$route.query.movie_id);
    this.gethamovieDetail();
    this.getmovieactor();
  },
  methods: {
    //上传图片成功时的回调
    handleAvatarSuccess(res, file) {
      this.movie_mimg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" ||file.type==="image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG / PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //获取电影详情信息
    async gethamovieDetail() {
      let res = await this.axios({
        url: "/movie/movieDetail",
        method: "get",
        params: {
          movie_id: this.qmovie_id,
        },
      });
      if (res.data.data.length == 0) {
        this.alterorsave = true;
      } else {
        this.moviedetailForm = res.data.data[0];
        
      }
    },

    async getmovieactor(){
      let res = await this.axios({
        url:'/movie/movieDetailActor',
        method:'get',
        params:{
          movie_id:this.qmovie_id
        }
      })

      if(res.data.data.length==0){
        this.alterorsave = true;
        this.directorimg = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png';
        this.actor2img = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png'
        this.actor3img = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png'
        this.actor4img = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png'
        this.actor5img = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png'
        this.actor6img = 'https://s3.ax1x.com/2021/02/25/yj8vWT.png'
      }else{
        this.directorimg = res.data.data[0].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[0].actor_img;
        this.directorinfo = res.data.data[0].actor_name;
        this.directorrole = res.data.data[0].actor_role;
        this.actor2img = res.data.data[1].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[1].actor_img;
        this.actor3img = res.data.data[2].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[2].actor_img;
        this.actor4img = res.data.data[3].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[3].actor_img;
        this.actor5img = res.data.data[4].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[4].actor_img;
        this.actor6img = res.data.data[5].actor_img==''?'https://s3.ax1x.com/2021/02/25/yj8vWT.png':res.data.data[5].actor_img;
        this.actor2info = res.data.data[1].actor_name
        this.actor3info = res.data.data[2].actor_name
        this.actor4info = res.data.data[3].actor_name
        this.actor5info = res.data.data[4].actor_name
        this.actor6info = res.data.data[5].actor_name
        this.actor2role = res.data.data[1].actor_role
        this.actor3role = res.data.data[2].actor_role
        this.actor4role = res.data.data[3].actor_role
        this.actor5role = res.data.data[4].actor_role
        this.actor6role = res.data.data[5].actor_role


      }
    },

    //修改或添加电影封面后的保存
    savemoviedetail() {
      this.$refs.moviedetailRuleForm.validate((valid) => {
        if (!valid) return;
          this.axios({
            url: "movie/altermovie",
            method: "post",
            params: {
              movie_id: this.qmovie_id,
              movie_name: this.moviedetailForm.movie_name,
              director: this.moviedetailForm.director,
              Screenwriter: this.moviedetailForm.Screenwriter,
              actor: this.moviedetailForm.actor,
              type: this.moviedetailForm.type,
              area: this.moviedetailForm.area,
              language: this.moviedetailForm.language,
              showtime: this.moviedetailForm.showtime,
              movietime: this.moviedetailForm.movietime,
              brief: this.moviedetailForm.brief,
            },
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });

      });
    },

    //修改演员信息得保存
    async saveactorinfo() {
      const res = await this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.directorinfo,
          actor_role: this.directorrole,
          movie_id: this.qmovie_id,
          derive: 1,
        },
      });
      if (res.data.code == 200) {
        this.$message.success(res.data.msg);
      } else {
        this.$message.error(res.data.msg);
      }

      this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.actor2info,
          actor_role: this.actor2role,
          movie_id: this.qmovie_id,
          derive: 2,
        },
      });

      this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.actor3info,
          actor_role: this.actor3role,
          movie_id: this.qmovie_id,
          derive: 3,
        },
      });

      this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.actor4info,
          actor_role: this.actor4role,
          movie_id: this.qmovie_id,
          derive: 4,
        },
      });

      this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.actor5info,
          actor_role: this.actor5role,
          movie_id: this.qmovie_id,
          derive: 5,
        },
      });

      this.axios({
        url: "movie/alteracotrinfo",
        method: "post",
        params: {
          actor_name: this.actor6info,
          actor_role: this.actor6role,
          movie_id: this.qmovie_id,
          derive: 6,
        },
      });
    },

    //导演图片上传事件
    handleAvatarSuccess1(res, file) {
      console.log(file);
      this.directorimg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload1(file) {
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

    //演员上传图片事件
    handleAvatarSuccess2(res, file) {
      this.actor2img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload2(file) {
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

    //演员上传图片事件
    handleAvatarSuccess3(res, file) {
      console.log(file);
      this.actor3img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload3(file) {
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

    //演员上传图片事件
    handleAvatarSuccess4(res, file) {
      this.actor4img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload4(file) {
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

    //演员上传图片事件
    handleAvatarSuccess5(res, file) {
      this.actor5img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload5(file) {
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

    //演员上传图片事件
    handleAvatarSuccess6(res, file) {
      this.actor6img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload6(file) {
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

    //演员上传图片事件
    handleAvatarSuccess7(res, file) {
      this.actor7img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload7(file) {
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
  },
  components: {},
};
</script>

<style scoped lang="less">
.container {
  .imgse {
    margin-bottom: 20px;
    display: flex;
    margin-left: 45px;
    .titlte {
      height: 190px;
      line-height: 190px;
    }
    .imgs {
      width: 145px;
      height: 190px;
      img {
        width: 100%;
        height: 100%;
        margin-left: 20px;
      }
    }
    .uplods {
      margin-left: 50px;
    }
  }
  .actorarea {
  }
}

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
  width: 145px;
  height: 190px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 190px;
  display: block;
}
</style>
