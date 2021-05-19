<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/youzi_logo.jpg" alt="" />
        <span>柚子影评后台管理系统</span>
      </div>
      <div>
        <span>东方不白欢迎你</span>
        <span>2020-02-19 14:15</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#C1D1A3"
          text-color="#000000"
          active-text-color="#0078D7"
          unique-opened
          router
        >
          <!-- 一级菜单-->
          <el-submenu index="1">
            <!-- 一级菜单区域 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i class="el-icon-s-custom"></i>
              <!-- 一级菜单文本 -->
              <span>用户管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/user" @click="saveNavState('/user')">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户信息</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <!-- 一级菜单区域 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i class="el-icon-video-camera-solid"></i>
              <!-- 一级菜单文本 -->
              <span>电影管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/remen" @click="saveNavState('/remen')">
              <template slot="title">
                <i class="el-icon-monitor"></i>
                <span>热门电影</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/reying" @click="saveNavState('/reying')">
              <template slot="title">
                <i class="el-icon-s-platform"></i>
                <span>正在热映</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/wsy" @click="saveNavState('/wsy')">
              <template slot="title">
                <i class="el-icon-video-camera"></i>
                <span>即将上映</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <!-- 一级菜单区域 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i class="el-icon-s-comment"></i>
              <!-- 一级菜单文本 -->
              <span>评论管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/comment" @click="saveNavState('/comment')">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>用户评论</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <!-- 一级菜单区域 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i class="el-icon-s-data"></i>
              <!-- 一级菜单文本 -->
              <span>排行榜</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/rmrank" @click="saveNavState('/rmrank')">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>热门排行榜</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/ryrank" @click="saveNavState('/ryrank')">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>热映排行榜</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/kbrank" @click="saveNavState('/kbrank')">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>口碑排行榜</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/tjrank" @click="saveNavState('/tjrank')">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>推荐系列</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //二级菜单被激活的连接
      activePath: "",
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("active");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    saveNavState(active) {
      window.sessionStorage.setItem("active", active);
      this.activePath = active;
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background-color: #afbf90;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  font-size: 20px;
  color: white;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 12px;
  }
}
.el-aside {
  background-color: #c1d1a3;
}
.el-main {
  background-color: #eaedf1;
}
</style>
