<template>
  <div class="orders">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mtop16">
      <el-input placeholder="请输入内容" clearable icon="el-icon-search">
      </el-input>
      <el-button type="primary" size="mini">搜索</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" width="180" type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="180">
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="xiugai"
              ></el-button>
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                @click="wuliu"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pagenum"
      :page-sizes="[5, 10, 15, 27]"
      :page-size="pageInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 修改地址 -->
    <el-dialog title="修改地址" :visible.sync="dialogDress" width="40%">
      <el-cascader
        v-model="value"
        :options="city"
        :props="defaultProps"
        @change="handleChange"
      >
      </el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDress = false">取 消</el-button>
        <el-button type="primary" @click="adressOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息 -->
    <el-dialog title="物流信息" :visible.sync="dialog" width="40%">
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          >{{ activity.context }}</el-timeline-item
        >
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import city from "@/assets/city.js";
import { getOrdersList, wuliuList } from "@/http/api";
export default {
  data() {
    return {
      city,
      tableData: [],
      pageInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      dialogDress: false,
      value: [],
      options: [],
      defaultProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      reverse: true,
      activities: [
        {
          time: "2018-05-10 09:39:00",
          ftime: "2018-05-10 09:39:00",
          context: "已签收,感谢使用顺丰,期待再次为您服务",
          location: "",
        },
        {
          time: "2018-05-10 08:23:00",
          ftime: "2018-05-10 08:23:00",
          context:
            "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          location: "",
        },
        {
          time: "2018-05-10 07:32:00",
          ftime: "2018-05-10 07:32:00",
          context: "快件到达 [北京海淀育新小区营业点]",
          location: "",
        },
        {
          time: "2018-05-10 02:03:00",
          ftime: "2018-05-10 02:03:00",
          context:
            "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          location: "",
        },
        {
          time: "2018-05-09 23:05:00",
          ftime: "2018-05-09 23:05:00",
          context: "快件到达 [北京顺义集散中心]",
          location: "",
        },
        {
          time: "2018-05-09 21:21:00",
          ftime: "2018-05-09 21:21:00",
          context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          location: "",
        },
        {
          time: "2018-05-09 13:07:00",
          ftime: "2018-05-09 13:07:00",
          context: "顺丰速运 已收取快件",
          location: "",
        },
        {
          time: "2018-05-09 12:25:03",
          ftime: "2018-05-09 12:25:03",
          context: "卖家发货",
          location: "",
        },
        {
          time: "2018-05-09 12:22:24",
          ftime: "2018-05-09 12:22:24",
          context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          location: "",
        },
        {
          time: "2018-05-08 21:36:04",
          ftime: "2018-05-08 21:36:04",
          context: "商品已经下单",
          location: "",
        },
      ],
      dialog: false,
    };
  },
  created() {
    this.getOrdersList();
  },
  methods: {
    getOrdersList() {
      getOrdersList(this.pageInfo).then((res) => {
        // console.log(res);
        const { goods, total } = res;
        this.tableData = goods;
        this.total = total;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pagesize = val;
      this.getOrdersList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pagenum = val;
      this.getOrdersList();
    },
    // 修改地址
    xiugai() {
      this.dialogDress = true;
    },
    adressOk() {
      this.dialogDress = false;
    },
    handleChange() {
      this.getOrdersList();
    },
    wuliu() {
      this.dialog = true;
    },
    dialogOk() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss">
.el-input {
  width: 300px;
  margin-right: 15px;
}
.el-cascader-panel {
  height: 180px;
}
</style>
