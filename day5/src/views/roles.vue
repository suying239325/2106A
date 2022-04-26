<template>
  <div class="roles">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <el-button type="primary" @click="addRole">添加角色</el-button>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column width="80">></el-table-column>
            <el-table-column prop="id" label="#" width="100"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="350">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="edit(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    @click="dele(scope.row.id)"
                  ></el-button>
                  <el-button
                    type="warning"
                    circle
                    icon="el-icon-setting"
                    size="mini"
                  ></el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加角色的模态框 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="45%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的模态框 -->
    <el-dialog title="编辑角色" :visible.sync="Isdialog" width="45%">
      <el-form
        :model="rulForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rulForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rulForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, Addroles, deleRoles, exitRole } from "@/http/api";
export default {
  data() {
    return {
      // 表格信息
      tableData: [],
      // 添加角色模态框内容
      dialogVisible: false,
      ruleForm: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        // 角色名称
        roleName: [
          { required: true, message: "请输入角色名称", tigger: "blur" },
          {
            min: 4,
            max: 10,
            required: true,
            message: "角色名称是4-10位之间",
            tigger: "blur",
          },
        ],
        // 角色描述
        roleDesc: [
          { required: true, message: "请输入角色描述", tigger: "blur" },
          {
            min: 4,
            max: 10,
            required: true,
            message: "角色描述是4-10位之间",
            tigger: "blur",
          },
        ],
      },
      // 修改
      Isdialog: false,
      rulForm: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 角色列表信息
    getRolesList() {
      getRoles().then((res) => {
        // console.log(res);
        this.tableData = res;
      });
    },
    // 添加角色弹框出现
    addRole() {
      this.dialogVisible = true;
    },
    //  添加角色到角色列表里
    addRoleOk() {
      Addroles(this.ruleForm).then((res) => {
        this.getRolesList();
        this.dialogVisible = false;
      });
    },
    // 删除角色列表的数据
    dele(id) {
      // console.log(id);
      deleRoles(id).then((res) => {
        // console.log(res);
        this.getRolesList();
      });
    },
    // 修改角色列表
    editOk() {
      //编辑确定
      exitRole(this.rulForm).then((res) => {
        // this.getRoles();
        this.getRolesList();
      });
      this.Isdialog = false;
    },
    edit(row) {
      //编辑模态框
      this.Isdialog = true;
      this.rulForm.id = row.id;
      this.rulForm.roleName = row.roleName;
    },
  },
};
</script>

<style lang="scss">
.el-card {
  width: 85vw;
}
</style>
