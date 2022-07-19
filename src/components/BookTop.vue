<template>
  <div>
    <el-input
      class="ipt"
      v-model="searchIpt"
      placeholder="搜索-书本名称"
      @change="searchBook"
    ></el-input>
    <el-button type="primary" round>搜索</el-button>
    <el-form
      ref="bookMsg"
      :model="bookMsg"
      label-width="80px"
      class="demo-form-inline"
      :inline="true"
      :rules="rules"
    >
      <el-form-item prop="bookname">
        <el-input v-model="bookMsg.bookname" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item prop="author">
        <el-input v-model="bookMsg.author" placeholder="作者"></el-input>
      </el-form-item>
      <el-form-item prop="publisher">
        <el-input v-model="bookMsg.publisher" placeholder="出版社"></el-input>
      </el-form-item>
      <el-button type="primary" round @click="addBook">添加图书</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "MySearch",
  data() {
    return {
      searchIpt: "",
      bookMsg: {
        bookname: "",
        author: "",
        publisher: "",
      },
      rules: {
        bookname: [
          { required: true, message: "请输入书本名称", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
        ],
        publisher: [
          { required: true, message: "请输入出版社名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async searchBook() {
      if (!this.searchIpt.trim().length) {
        this.searchIpt = "";
        return alert("输入的内容不能为空");
      }
      try {
        const { data: res } = await this.$axios({
          url: "/api/getbooks",
          params: {
            bookname: this.searchIpt,
          },
        });
        this.$parent.list = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addBook() {
      if (
        this.bookMsg.bookname.trim().length == 0 ||
        this.bookMsg.author.trim().length == 0 ||
        this.bookMsg.publisher.trim().length == 0
      ) {
        this.bookMsg.bookname = "";
        this.bookMsg.author = "";
        this.bookMsg.publisher = "";
        return alert("输入的内容不能为空");
      }
      const { data: res } = await this.$axios({
        url: "/api/addbook",
        method: "POST",
        data: {
          bookname: this.bookMsg.bookname,
          author: this.bookMsg.author,
          publisher: this.bookMsg.publisher,
        },
      });
      console.log(res);
      if (res.status !== 201) {
        return alert("添加失败");
      }
      alert("添加成功");
      this.bookMsg.bookname = "";
      this.bookMsg.author = "";
      this.bookMsg.publisher = "";
      const { data: res2 } = await this.$axios({
        url: "/api/getbooks",
      });
      this.$parent.list = res2.data;
    },
  },
};
</script>

<style scoped>
.ipt {
  width: 167px;
  margin-right: 15px;
}
</style>
