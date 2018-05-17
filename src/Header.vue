<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h1>Json-Pollock Playground</h1>
    </div>
    <div class='gistbtn' :title="gistTitle" v-if="!loading">
      <img v-if="!loading && !user" src='./assets/GitHub-Mark-32px.png' title='Login to GitHub' @click="showDescription = true">
      <img v-else :src='user.avatar_url' :title='user && (user.name || user.login)' @click="showDescription = true">
      <div class="gist-input" v-if="!gistName">
        <input v-model="gistId" placeholder="Gist id..." :class="{ error: gistId && !gistName }" :title="gistIdInputTitle" @keyup.enter="loadGist"/>
        <div v-if="gistId" @click="loadGist">Go</div>
      </div>
      <a v-if="gistName && token" :href='gistUrl' target="_blank">{{gistName}}</a>
      <span v-if="gistName && !token" class='gist-token-needed' @click="showDescription = true">Access token is needed</span>      
    </div>
    <div class='gist-token-explanation' v-if="showDescription">
        In order to be able to load content from GitHub <a href="https://help.github.com/articles/about-gists/" target="_blank">Gists</a>  
        you must provide a <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank">Personal Access Token</a>
        (no scopes are required).<br>
        Once you have the token please update it here:<br>
        <input v-model="token"/>
        <button @click="saveToken" :disabled="!token">Save</button>
        <button @click="showDescription = false">Cancel</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GitHubHelper from './GitHubHelper';

export default {
  name: 'Header',
  data() {
    return {
      gistName: '',
      gistUrl: '',
      gistId: '',
      token: '',
      showDescription: false,
    };
  },
  computed: {
    ...mapGetters([
      'loading',
      'user',
    ]),
    gistTitle() {
      if (this.gistUrl) {
        return `Click to open ${this.gistName} Gist on GitHub.com`;
      }
      return '';
    },
    gistIdInputTitle() {
      if (this.gistId && !this.gistName) {
        return 'Gist is not loaded..';
      }

      if (!this.gistName) {
        return 'Add id of a Gist to load in the playground';
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
        GitHubHelper.saveToken(this.token);
        this.$store.commit('setMessage', { text: 'Token successfully saved! :) reload the page to load content from Gist', type: 'success' });
        this.showDescription = false;
      }
    },
    loadGist() {
      if (this.gistId) {
        location.search = `?gist=${this.gistId}`;
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
      state => state.gist.id,
      (id) => {
        this.gistId = id;
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

    input {
      border-radius: 3px;
      border: solid #a2aeb5 1px;
    }

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
        
      .gist-input {
        input {
          font-size: 15px;
          margin: 7px 0 7px 0;
          height: 25px;
          padding-left: 5px;          

          &.error {
            border-color: red;
          }
        }

        div {
          position: absolute;
          top: 10px;
          right: 13px;
          font-size: 14px;
          font-weight: bold;
          background: #fff;
          cursor: pointer;
          height: 23px;
          line-height: 23px;
          padding: 0 6px;
          display: none;
        }

        &:hover, &:focus {
          div {
            display: block;
          }
        }
      }

      a {
        color: #2c3e50;
        text-decoration: none;
      }

      img {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 32px;
        height: 32px;
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
