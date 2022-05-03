<template>
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部提示框 -->
    <el-card class="mtop16">
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        effect="dark"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类 -->
      <el-row class="mtop16">
        <el-col :span="3">选择商品分类</el-col>
        <el-col :span="21">
          <!-- 联级框 -->
          <el-cascader
            v-model="value"
            :options="options"
            :props="defaultProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- tab框 -->
      <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="参数名称" name="many">
          <el-button type="primary" size="mini">添加参数</el-button>
          <!-- 表格 -->
          <el-table :data="manyParmsData" border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <div>
                  <el-button type="primary" size="mini">编辑</el-button>
                  <el-button type="danger" size="mini">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="属性管理">
          <el-button type="primary" size="mini">添加属性</el-button>
          <!-- 表格 -->
          <el-table :data="onlyParamsData" border>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template>
                <div>
                  <el-button type="primary" size="mini">编辑</el-button>
                  <el-button type="danger" size="mini">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getflList, getMoveQuietList } from "@/http/api";
export default {
  data() {
    return {
      activeName: "many",
      value: [], //分类ID
      options: [], //数据源
      manyParmsData: [], //动态参数
      onlyParamsData: [], //静态参数
      defaultProps: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
    };
  },
  computed: {
    cate_id() {
      return this.value[this.value.length - 1];
    },
  },
  created() {
    // 分类列表
    this.getfenleiList();
    // this.getspflList()
  },
  methods: {
    getfenleiList() {
      //获取数据
      getflList().then((res) => {
        // console.log(res);
        this.options = res;
      });
    },
    getspflList() {
      //获取商品分类参数
      if (this.value.length !== 3) {
        this.$message({
          message: "必须选择三级分类",
          type: "error",
        });
        return;
      }
      // 分类权限列表
      getMoveQuietList(this.cate_id, this.activeName).then((res) => {
        if (this.activeName === "many") {
          res.forEach((item) => {
            //字符串转换为数组
            item.attr_vals =
              item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
          });
          this.manyParmsData = res;
          console.log("this.manyParmsData", this.manyParmsData);
        } else if (this.activeName === "only") {
          this.onlyParamsData = res;
          console.log("this.onlyParamsData", this.onlyParamsData);
        }
      });
    },
    handleClick() {
      //TAB的点击事件
      this.getspflList();
    },
    handleChange() {
      //选择联级框数据改变触发
      this.getspflList();
    },
  },
};
</script>

<style>
.el-scrollbar {
  height: 300px;
}
</style>
<style lang="scss" scoped></style>
