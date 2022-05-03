<template>
  <div class="goods">
    <el-card class="box-card">
      <el-button type="primary" @click="toGoods">添加商品</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" width="40" type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | time }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editGoods(scope.row)"
            >
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delet(scope.row.goods_id)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      class="mtop16"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goods.pagenum"
      :page-sizes="[10, 20, 50, 300]"
      :page-size="goods.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 修改的模态框 -->
    <el-dialog title="编辑商品列表" :visible.sync="editShopList" width="45%">
      <el-form ref="editList" :model="editList" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="editList.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="editList.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="editList.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShopList = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { shopList, deleShop, editGoods } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      goods: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      //   编辑
      editShopList: false, // 模态框
      editList: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_id: "",
      },
    };
  },
  created() {
    this.getShoplist();
  },
  methods: {
    //   商品列表总数据
    async getShoplist() {
      const res = await shopList(this.goods);
      const { goods, total } = res;
      this.tableData = goods;
      this.total = total;
    },
    handleSizeChange(val) {
      this.goods.pagesize = val;
      this.getShoplist();
    },
    handleCurrentChange(val) {
      this.goods.pagenum = val;
      this.getShoplist();
    },
    // 删除
    delet(id) {
      console.log(id);
      deleShop(id).then((res) => {
        // console.log(res);
        this.getShoplist();
      });
    },
    // 编辑
    editGoods(row) {
      console.log(row);
      this.editShopList = true;
    },
    // 编辑确定
    editGoodsOk() {
      editGoods(this.editList).then((res) => {
        console.log(res);
        this.getShoplist();
      });
      this.editShopList = false;
    },
    // 页面跳转
    toGoods() {
      this.$router.push("/addGoods");
    },
  },
};
</script>

<style lang="scss"></style>
