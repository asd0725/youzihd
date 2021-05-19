<template>
  <div class="container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/login_logo.jpg" alt="" />
      </div>

      <!-- 表单区域 -->
      <el-form
        class="demo-ruleForm login_form"
        :model="loginForm"
        :rules="loginrules"
        ref="loginFormRef"
      >
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "dsa0123",
        password: "dsa0123",
      },
      loginrules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods:{

      //重置表单
      resetLoginForm(){
        //   console.log(this);
        this.$refs.loginFormRef.resetFields();
      },
      login(){
          this.$refs.loginFormRef.validate(async (valid)=>{

              if(!valid) return;
             const res = await this.axios({
                  url:'backuser/backuser',
                  method:'post',
                  params:{
                      user_ur:this.loginForm.username,
                      password:this.loginForm.password
                  }
              })
                //   console.log(res.data.code);
                // if(res.data.code==400){
                //     this.$message.error("账号或者密码错误")
                // }else if(res.data.code==200){
                //     window.sessionStorage.setItem('token',res.data.token)

                // }
                if(res.data.code==400){
                    this.$message.error("账号或者密码错误")
                }else if(res.data.code==200){
                    window.sessionStorage.setItem('token',res.data.token)
                    this.$router.push({name:'index'})
                }
              
          })

      }
  },
  components: {},
};
</script>

<style scoped lang="less">
.container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
