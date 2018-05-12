<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h1>Json-Pollock Playground</h1>
    </div>
    <div class='gistbtn' v-if="gistName" :title="gistTitle">
      <img src='./assets/GitHub-Mark-32px.png'>
      <a :href='gistUrl' target="_blank">{{gistName}}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      gistName: '',
      gistUrl: '',
    };
  },
  computed: {
    gistTitle() {
      return `Click to open ${this.gistName} Gist on GitHub.com`;
    },
  },
  methods: {
    onLogoClick: () => {
      window.open('https://github.com/LivePersonInc/json-pollock', '_blank');
    },
    onGistClick: () => {
      if (this.gistUrl) {
        window.open(this.gistUrl, '_blank');
      }
    },
  },
  mounted() {
    this.$store.watch(
      state => state.gist.name,
      (name) => {
        this.gistName = name;
      },
    );

    this.$store.watch(
      state => state.gist.url,
      (url) => {
        this.gistUrl = url;
      },
    );
  },
};
</script>

<style lang="scss" scoped>
  .header {

    .title {
      position: absolute;
      left: 32%;
      top: -15px;
      width: 500px;
      color: #fff;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

      img {
        float: left;
        width: 82px;
        cursor: pointer;
        margin-top: 16px;
        margin-right: 10px;
        cursor: hand;
      }

      h1 {
        
      }
    }

    .gistbtn {
        line-height: 42px;
        background: white;
        padding: 0px 10px 0px 46px;
        margin: 7px 30px 5px 5px;
        border: solid #000 1px;
        max-width: 250px;
        height: 44px;
        border-radius: 5px;
        float: right;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
      a {
        color: #2c3e50;
        text-decoration: none;
      }

      img {
        position: absolute;
        top: 6px;
        left: 6px;
      }
    }
    
  }
</style>
