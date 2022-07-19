<template>
  <div id="app">
    <MySearch></MySearch>
    <MyList :list="list"></MyList>
  </div>
</template>

<script>
import MySearch from "./components/BookTop.vue";
import MyList from "./components/BookList.vue";
export default {
  name: "App",
  components: {
    MySearch,
    MyList,
  },
  data() {
    return {
      list: [],
    };
  },
  async created() {
    try {
      const { data: res } = await this.$axios({
        url: "/api/getbooks",
      });
      this.list = res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
