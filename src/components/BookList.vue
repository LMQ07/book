<template>
  <div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="bookname" label="书名"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="publisher" label="出版社"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeBook(scope.row.id)"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="
              showMessage(
                scope.row.bookname,
                scope.row.author,
                scope.row.publisher
              )
            "
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MyList",
  props: ["list"],
  methods: {
    async removeBook(id) {
      const res = await this.$axios({
        url: "/api/delbook",
        params: {
          id: id,
        },
      });
      console.log(res);
      if (res.data.status !== 200) {
        alert("删除失败");
      }

      const { data: res2 } = await this.$axios({
        url: "/api/getbooks",
      });
      this.$parent.list = res2.data;
    },
    showMessage(a, b, c) {
      this.$alert(`书名：${a} \n 作者：${b} \n 出版社信息：${c}`, "书籍信息", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>

<style scoped></style>
