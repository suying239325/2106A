<template>
  <div class="users">
    <el-card class="box-card">
      <!-- 头部的输入框 -->
      <div class="box">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          @input="search"
          v-model="userInfo.query"
          clearable
        >
        </el-input>
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
      <!-- 用户管理的列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" width="180" type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editAdd(scope.row)"
              >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="remove(scope.row.id)"
              >
              </el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="role(scope.row)"
              >
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      class="mtop16"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userInfo.pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="userInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加的模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="45%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOK">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的模态框 -->
    <el-dialog title="编辑" :visible.sync="editss" width="30%">
      <el-form :model="edit">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="edit.username" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input v-model="edit.email"></el-input>
        </el-form-item>

        <el-form-item prop="mobile" label="手机号">
          <el-input
            v-model="edit.mobile"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editss = false">取 消</el-button>
        <el-button type="primary" @click="editOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- juese -->
    <el-dialog title="分配角色" :visible.sync="roles" width="30%">
      <div>
        当前的用户：<span>{{ roleData.username }}</span>
      </div>
      <div>
        当前的角色：<span>{{ roleData.juese }}</span>
      </div>
      <el-select v-model="jsid" placeholder="请选择">
        <el-option
          v-for="item in values"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        ></el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roles = false">取 消</el-button>
        <el-button type="primary" @click="jsqds">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  usersList,
  addUser,
  getUserdelet,
  getEdit,
  getrid,
  jsqd,
} from "@/http/api";
import _ from "lodash";
export default {
  data() {
    return {
      roles: false,
      values: [],
      roleData: {},
      jsid: "",
      username: "",
      tableData: [],
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      value: false, // 状态i
      total: 0,
      dialogVisible: false, // 添加的模态框
      //   添加
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //   修改
      edit: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editss: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await usersList(this.userInfo);
      // console.log(res);
      const { users, total } = res;
      this.tableData = users;
      this.total = total;
    },
    // 分页
    handleSizeChange(val) {
      this.userInfo.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.userInfo.pagenum = val;
      this.getUserList();
    },
    // 添加用户
    addUser() {
      //   console.log("添加用户");
      this.dialogVisible = true;
    },
    // 添加用户的确定事件
    addOK() {
      addUser(this.form).then((res) => {
        console.log(res);
        this.getUserList();
      });
      this.dialogVisible = false;
      this.form = {};
    },
    // 搜索 利用防抖来实现搜索的功能
    search: _.debounce(function () {
      this.getUserList();
    }, 1000),

    // 删除
    remove(id) {
      //删除
      getUserdelet(id).then((res) => {
        this.getUserList();
      });
    },
    // 编辑模态框出现
    editAdd(row) {
      console.log(row);
      this.editss = true;
      this.edit.id = row.id;
      this.edit.username = row.username;
      this.edit.email = row.email;
      this.edit.mobile = row.mobile;
      getEdit(this.edit).then((res) => {
        console.log(res);
      });
    },
    // 编辑 内容回填
    editOk() {
      getEdit(this.edit).then((res) => {
        console.log(res);
        this.getUserList();
      });
      this.editss = false;
    },
    role(row) {
      //角色框
      this.yhid = row.id;
      this.roleData.username = row.username;
      this.roleData.juese = row.role_name;
      this.roles = true;
      getrid().then((res) => {
        //  console.log(res);
        this.values = res;
      });
      // this.roleData=row
      // this.rol=res
      // this.roles=true
    },
    jsqds() {
      //角色框确定
      console.log(this.yhid);
      console.log(this.jsid);
      jsqd(this.yhid, this.jsid).then((res) => {
        this.getUserList();
      });
      this.roles = false;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 500px;
  display: inline-flex;
  justify-content: space-between;
  .el-button {
    height: 45px;
    margin-left: 20px;
    margin-top: 6px;
  }
}
</style>
