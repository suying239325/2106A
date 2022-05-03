<template>
  <div class="rights">
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" width="40" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag :type="scope.row.level | tagType">{{
              scope.row.level | aa
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { quanxainList } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //   权限列表总数据
    getList() {
      quanxainList().then((res) => {
        // console.log(res);
        this.tableData = res;
      });
    },
  },
  //   过滤格式化权限等级
  filters: {
    tagType(ele) {
      if (ele == 0) {
        return "";
      } else if (ele == 1) {
        return "success";
      } else if (ele == 2) {
        return "warning";
      }
    },
    aa(ele) {
      if (ele == 0) {
        return "一级";
      } else if (ele == 1) {
        return "二级";
      } else if (ele == 2) {
        return "三级";
      }
    },
  },
};
</script>

<style lang="scss"></style>
