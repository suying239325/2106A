<template>
  <div class="roles">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <el-button type="primary" @click="addRole">添加角色</el-button>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column width="80" type="expand">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.children.length > 0">
                    <el-row v-for="item in scope.row.children" :key="item.id">
                      <el-col :span="6">
                        <el-tag closable>{{ item.authName }}</el-tag>
                      </el-col>
                      <el-col :span="18">
                        <el-row v-for="item2 in item.children" :key="item2.id">
                          <el-col :span="6">
                            <el-tag type="success" closable>{{
                              item2.authName
                            }}</el-tag>
                          </el-col>
                          <el-col :span="18">
                            <el-tag
                              v-for="item3 in item2.children"
                              :key="item3.id"
                              type="warning"
                              closable
                              @close="dele(scope.row.id, item3.id)"
                              >{{ item3.authName }}</el-tag
                            >
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-else>暂无数据</div>
                </div>
              </template>
            </el-table-column>
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
                    @click="edRoles(scope.row)"
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
    <!-- 分配权限的模态框 -->

    <el-dialog
      title="提示"
      :visible.sync="isRoleDialog"
      width="45%"
      :before-close="handleClose"
    >
      <el-tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkArr"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="treeOks">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoles,
  Addroles,
  deleRoles,
  exitRole,
  getTrees,
  getRights,
  setReightRole,
  deleRole,
} from "@/http/api";
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
      // 分配权限的模态框
      isRoleDialog: false,
      defaultProps: {
        label: "authName",
        children: "children",
      },
      treeData: [],
      checkArr: [],
      currentRoleid: 0,
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
      this.$confirm("此操作将永久删除该用户角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(id);
          deleRoles(id).then((res) => {
            // console.log(res);
            this.getRolesList();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
    // 分配角色列表成功
    edRoles(row) {
      console.log(row);
      getRights("tree").then((res) => {
        console.log(res);
        this.treeData = res;
      });
      this.currentRoleid = row.id;
      this.getCheckedIdsArr(row, this.checkArr);
      this.isRoleDialog = true;
    },
    getCheckedIdsArr(row, checkArr) {
      if (!row.children) {
        return checkArr.push(row.id);

        row.children.forEach((item) => {
          this.getCheckedIdsArr(item, checkArr);
        });
      }
    },
    // 模态框关闭的函数
    handleClose() {
      this.checkArr = [];
    },
    // 分配权限的关闭
    treeOks() {
      // 全选的id
      const allChecked = this.$refs.treeRef.getCheckedKeys();
      // console.log(allChecked);
      // 半选得到id
      const helfChecked = this.$refs.treeRef.getCheckedKeys();
      // console.log(helfChecked);
      // 将上面的数据进行合并
      const mergCheckedArr = [...allChecked, ...helfChecked];
      // console.log(mergCheckedArr);
      // 将合并的数组转成字符串
      const mergCheckedStr = mergCheckedArr.join(",");
      // console.log(mergCheckedStr);
      const res = setReightRole(this.currentRoleid, mergCheckedStr);
    },
    dele(roleId, rightId) {
      deleRole(roleId, rightId).then((res) => {
        console.log(res);
        this.edRoles();
      });
    },
  },
};
</script>

<style lang="scss">
.el-card {
  width: 85vw;
}
</style>
