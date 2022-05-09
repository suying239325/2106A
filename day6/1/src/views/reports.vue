<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 主体 -->
    <el-card class="mtop16">
      <div ref="mychart" style="width: 100%; height: 600px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { summaryGraph } from "@/http/api";
export default {
  data() {
    return {
      mychart: null,
      preData: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  mounted() {
    this.getChart();

    window.addEventListener("resize", this.mychart.resize);
  },
  methods: {
    async getChart() {
      //1.获取dom
      const chartDom = this.$refs.mychart;
      //2.初始化
      this.mychart = echarts.init(chartDom);

      const res = await summaryGraph();

      //3.配置图表数据
      const option = { ...this.preData, ...res };

      //4.渲染生成图表
      this.mychart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
