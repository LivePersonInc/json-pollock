<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h1>Json-Pollock Playground</h1>
    </div>
    <div class='gistbtn' v-if="gistName" :title="gistTitle">
      <img src='./assets/GitHub-Mark-32px.png' @click="showDescription = true">
      <a v-if="token" :href='gistUrl' target="_blank">{{gistName}}</a>
      <span v-if="!token" class='gist-token-needed' @click="showDescription = true">Access token is needed</span>      
    </div>
    <div class='gist-token-explanation' v-if="showDescription">
        In order to be able to load content from GitHub Gists
        you must provide a <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank">Personal Access Token.</a><br>
        Once you have the token please update it here:<br>
        <input v-model="token"/>
        <button @click="saveToken" :disabled="!token">Save</button>
        <button @click="showDescription = false">Cancel</button>
      </div>
  </div>
</template>

<script>
import GistHelper from './GistHelper';

export default {
  name: 'Header',
  data() {
    return {
      gistName: '',
      gistUrl: '',
      token: '',
      showDescription: false,
    };
  },
  computed: {
    gistTitle() {
      if (this.gistUrl) {
        return `Click to open ${this.gistName} Gist on GitHub.com`;
      }
      return '';
    },
  },
  methods: {
    onLogoClick() {
      window.open('https://github.com/LivePersonInc/json-pollock', '_blank');
    },
    onGistClick() {
      if (this.gistUrl) {
        window.open(this.gistUrl, '_blank');
      }
    },
    saveToken() {
      if (this.token) {
        GistHelper.saveToken(this.token);
        this.$store.commit('setMessage', { text: 'Token successfully saved! :) reload the page to load content from Gist', type: 'success' });
        this.showDescription = false;
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

    this.$store.watch(
      state => state.token,
      (token) => {
        this.token = token;
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
        cursor: pointer;
        cursor: hand;
        
      a {
        color: #2c3e50;
        text-decoration: none;
      }

      img {
        position: absolute;
        top: 6px;
        left: 6px;
      }

      .gist-token-needed {
        color: red;
      }
    }

    .gist-token-explanation {
      position: absolute;
      z-index: 999;
      right: 29px;
      top: 56px;
      width: 266px;
      border: solid #000 1px;
      border-radius: 5px;
      padding: 5px 10px 5px 10px;
      background: white;

      input {
        font-size: 15px;
        width: 98%;
        margin: 7px 0 7px 0;
        height: 23px;
      }
    }
    
  }
</style>
