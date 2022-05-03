<template>
  <div class="roles">
    <el-card class="box-card">
      <el-button type="primary" @click="addRoles">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="" width="60"> </el-table-column>
        <el-table-column label="#" width="180" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色列表" width="120">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editRole(scope.row)"
              >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="dele(scope.row.id)"
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
    <!-- 添加角色的模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="45%">
      <el-form ref="roles" :model="roles" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolesOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialog" width="45%">
      <el-form ref="editRoles" :model="editRoles" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="roleS" width="60%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :default-checked-keys="array"
        :props="defaultProps"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="roleS = false">取 消</el-button>
        <el-button type="primary" @click="fpqd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { jueseList, addRole, deleRole, editRoeles, getsqjs } from "@/http/api";
export default {
  data() {
    return {
      array: [],
      data: {},
      tree: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
      roleS: false,
      tableData: [],
      // 角色列表
      roles: {
        roleName: "",
        roleDesc: "",
      },
      // 角色模态框
      dialogVisible: false,
      // 编辑模态框
      dialog: false,
      editRoles: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  created() {
    this.juese();
  },
  methods: {
    // 角色表格数据
    juese() {
      jueseList().then((res) => {
        // console.log(res);
        this.tableData = res;
      });
    },
    // 添加角色
    addRoles() {
      this.dialogVisible = true;
    },
    // 角色确定
    rolesOk() {
      addRole(this.roles).then((res) => {
        // console.log(res);
        this.juese();
      });
      this.dialogVisible = false;
    },
    // 角色删除
    dele(id) {
      // console.log(id);
      deleRole(id).then((res) => {
        this.juese();
      });
    },
    // 编辑
    editRole(row) {
      console.log(row);
      this.dialog = true;
      this.editRoles.roleName = row.roleName;
      this.editRoles.roleDesc = row.roleDesc;
      this.editRoles.id = row.id;
      editRoeles(this.editRoles).then((res) => {
        console.log(res);
      });
    },
    // 编辑确定
    editRoleOk() {
      editRoeles(this.editRoles).then((res) => {
        console.log(res);
        this.juese();
      });
      this.dialog = false;
    },
    // 分配权限确定
    fpqd() {
      let isArrayYes = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ];
      // console.log(isArrayYes.join(','));
      getsqjs(this.sqid, isArrayYes.join(",")).then((res) => {
        this.getlist();
      });
      this.roleS = false;
    },
    // 分配权限
    role(row) {
      this.roleS = true;
      console.log("row:", row);
      this.sqid = row.id;
      this.dg(row, this.array);
    },
    dg(row, arr) {
      if (!row.children) {
        return arr.push(row.id);
      }
      row.children.forEach((item) => this.dg(item, arr));
    },
  },
};
</script>

<style lang="scss"></style>
