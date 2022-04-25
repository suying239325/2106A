<template>
  <div class="login-container">
    <div class="login-box">
      <h2>后台管理系统</h2>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-goods"
            type="password"
            show-password
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btns">
          <el-button type="primary" @click="gologin">登录</el-button>
          <el-button type="info" @click="Reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LoginApi } from "@/http/api";
export default {
  data() {
    return {
      form: {
        password: "123456",
        username: "admin",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", tigger: "blur" },
          { min: 3, max: 5, message: "密码是3~5位之间", tigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", tigger: "blur" },
          { min: 3, max: 6, message: "密码是3~6位数之间", tigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //   登录的函数
    gologin() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return false;
        // console.log("登录成功！！");
        const res = await LoginApi(this.form);
        console.log(res);
        this.$router.push("/about");
      });
    },
    Reset() {
      console.log(this.$refs);
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login-box {
    border-radius: 10px;
    padding: 0 30px;
    box-sizing: border-box;
    text-align: center;
    width: 30%;
    min-width: 300px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .el-form {
      margin-top: 35px;
      .login-btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
