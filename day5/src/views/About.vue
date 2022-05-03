<template>
  <div class="loginbox">
    <el-container>
      <el-header>
        <div class="header">
          <div><img src="../assets/111.png" alt="" /></div>
          <div>后台管理系统</div>
          <div>
            <el-button type="info" @click="open">退出</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isc ? '60px' : '200px'">
          <div @click="isc = !isc">|||</div>
          <!-- <el-row class="tac"> -->
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :unique-opened="true"
              router
            >
              <el-submenu
                :index="item.id + ''"
                v-for="item in list"
                :key="item.id"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <el-menu-item-group v-for="it in item.children" :key="it.id">
                  <el-menu-item :index="it.path">{{
                    it.authName
                  }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- </el-row> -->
        </el-aside>
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { leftMenu } from "@/http/api";
export default {
  data() {
    return {
      isc: false, // 是否显示隐藏
      list: [], // 接收菜单的数据
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    //   菜单
    async getMenus() {
      const res = await leftMenu();
      // console.log("左侧:", res);
      this.list = res;
    },
    open() {
      sessionStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.loginbox {
  width: 100%;
  height: 100%;
}

.isc {
  text-align: center;
}

.el-header,
.el-footer {
  background-color: #545c64;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  img {
    width: 60px;
  }
}

.el-aside {
  background-color: #545c64;
  color: white;
  text-align: center;
  // height: 100vh;
}

.el-container {
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  line-height: 60px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.el-menu {
  border: none;
  background-color: black;
  span {
    color: #fff;
  }
}
.el-col {
  margin-top: 20px;
}
</style>
