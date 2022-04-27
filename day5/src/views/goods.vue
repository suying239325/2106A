<template>
  <div class="goods">
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary">添加商品</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="#" width="50"> </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="400">
          </el-table-column>
          <el-table-column prop="goods_price" label="商品价格（元）">
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量">
          </el-table-column>
          <el-table-column prop="add_time" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.add_time | time }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoods } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      info: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getGoods(this.info);
      console.log(res);
      this.tableData = res.goods;
    },
  },
};
</script>

<style lang="scss"></style>
