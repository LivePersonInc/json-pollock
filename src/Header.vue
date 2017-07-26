<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h1>Json-Pollock Playground</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    onLogoClick: () => {
      window.open('https://lpgithub.dev.lprnd.net/WebAgent/json-pollock', '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    color: #fff;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

    .title {
      position: absolute;
      left: 32%;
      top: -15px;
      width: 500px;

      img {
        float: left;
        width: 82px;
        cursor: pointer;
        margin-top: 16px;
        cursor: hand;
      }

      h1 {
        
      }
    }
    
  }
</style>
