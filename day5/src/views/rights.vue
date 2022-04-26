<template>
  <div class="rights">
    <el-card class="box-card">
      <div class="text item">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="authName" label="权限名称" width="300">
          </el-table-column>
          <el-table-column prop="path" label="路径" width="260">
          </el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scoped">
              <el-tag :type="scoped.row.level | tagtype">{{
                scoped.row.level | aa
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getRights } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getQxlist();
  },
  methods: {
    getQxlist() {
      getRights().then((res) => {
        console.log(res);
        this.tableData = res;
      });
    },
  },
  filters: {
    aa(ele) {
      if (ele == 0) {
        return "一级";
      } else if (ele == 1) {
        return "二级";
      } else if (ele == 2) {
        return "三级";
      }
    },
    //element ui button样式
    tagtype(ele) {
      if (ele == 0) {
        return "";
      } else if (ele == 1) {
        return "success";
      } else if (ele == 2) {
        return "warning";
      }
    },
  },
};
</script>

<style lang="scss"></style>
