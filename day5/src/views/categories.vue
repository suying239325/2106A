<template>
  <div class="">
    <el-card class="mtop16">
      <el-button type="primary" class="mtop16" @click="addTO"
        >添加分类</el-button
      >
      <el-table :data="tableData" border row-key="cat_id">
        <el-table-column align="center" type="index" label="#" width="80">
          <template slot-scope="scope">
            <div>
              {{ scope.row.index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" height="80">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" height="80">
          <template slot-scope="scope">
            <div>
              <i
                class="el-icon-success el-icon-skyblue"
                v-if="scope.row.cat_deleted"
              ></i>
              <i class="el-icon-error el-icon-pink" v-else></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序" height="80">
          <template slot-scope="scope">
            <div>
              <el-tag :type="Tag[scope.row.cat_level]">标签一</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goods_id" label="操作" height="80">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="revise(scope.row)"
              >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="remove(scope.row.cat_id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mtop16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="list.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="list.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="添加商品分类" :visible.sync="classification" width="30%">
      <el-form :model="addingGoods">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addingGoods.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类">
          <el-cascader
            v-model="value"
            :options="options"
            :props="defaultProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="classification = false">取 消</el-button>
        <el-button type="primary" @click="addingGoodsAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改商品分类 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="modifyClassification"
      width="30%"
    >
      <el-form :model="reviseArr">
        <el-form-item label="修改分类">
          <el-input v-model="reviseArr.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyClassification = false">取 消</el-button>
        <el-button type="primary" @click="reviseAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getflList, removeflList, reviseList, addGoodsApi } from "@/http/api";
export default {
  data() {
    return {
      tableData: [],
      classification: false, //添加模态框
      value: [], //选中级联框的id
      options: [], //数据源
      defaultProps: {
        //
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
        checkStrictly: true,
      },
      addingGoods: {
        //添加数据框
        cat_name: "",
        cat_level: 0,
        cat_pid: 0,
      },
      modifyClassification: false, //修改分类
      reviseArr: {
        //修改数据框
        cat_id: "",
        cat_name: "",
      },
      list: {
        //传递数据
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      Tag: ["", "success", "warning"], //一二三级颜色style
      total: 0, //分页总数
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //获取数据
      getflList(this.list).then((res) => {
        res.result.forEach((item, index) => {
          item.index = index + 1;
        });
        this.tableData = res.result;
        this.total = res.total;
        console.log(this.tableData);
      });
    },
    addTO() {
      //添加模态框显示
      this.classification = true;
      getflList({
        type: 2,
      }).then((res) => {
        this.options = res;
        console.log(res);
      });
    },
    handleChange() {},
    addingGoodsAdd() {
      //添加确定
      if (this.value.length > 0) {
        this.addingGoods.cat_pid = this.value[this.value.length - 1];
        this.addingGoods.cat_level = this.value.length;
      } else {
        this.addingGoods.cat_pid = 0;
        this.addingGoods.cat_level = 0;
      }
      addGoodsApi(this.addingGoods).then((res) => {
        this.getList();
      });
      this.addingGoods.cat_name = "";
      this.value = [];
      this.classification = false;
    },
    revise(row) {
      //修改-编辑
      this.modifyClassification = true;
      this.reviseArr.cat_id = row.cat_id;
      this.reviseArr.cat_name = row.cat_name;
    },
    reviseAdd() {
      //修改的确定按钮
      reviseList(this.reviseArr).then((res) => {
        this.getList();
      });
      this.modifyClassification = false;
    },
    remove(id) {
      //删除分类
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeflList(id).then((res) => {
            this.getList();
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
    handleSizeChange(val) {
      //分页每页个数
      this.list.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //分页当前页数
      this.list.pagenum = val;
      this.getList();
    },
  },
  components: {},
};
</script>

<style lang="scss"></style>
