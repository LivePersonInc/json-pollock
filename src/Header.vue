<template>
  <div class='header'>
    <div class="savebtn" @click="saveGist" v-if="token && !loading" :class="{disabled: saveDisabled}">
      <img v-if="!saving" src='./assets/baseline-save-24px.svg'>
      <img v-if="saving" src='./assets/baseline-sync-24px.svg' class="saving">
      <span v-if="isGistOwner" v-tooltip="'Save to Gist'">Save</span>
      <span v-if="!gist || !isGistOwner" v-tooltip="saveAsNewTitle">Save as new Gist</span>
    </div>
    <popup class="gist-input gist-input-name" v-model="showNewGistInput" :leftOffset="8">
      <input ref="gistNameInput" v-model="newGistName" placeholder="Gist Name..."/>
      <div v-if="newGistName" @click="createGist">Save</div>
    </popup>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h1>Json-Pollock Playground</h1>
    </div>
    <div class='gistbtn' v-if="!loading" ref="gistBtn">
      <img v-if="!loading && !user" src='./assets/GitHub-Mark-32px.png' v-tooltip="'Login to GitHub'" @click="showDescription = true">
      <img v-else :src='user.avatar_url' v-tooltip='user && (user.name || user.login)' @click="showDescription = true">
      <div class="gist-input" v-if="!gistName">
        <input v-model="gistId" placeholder="Gist id..." :class="{ error: gistId && !gistName }" v-tooltip="gistIdInputTitle" @keyup.enter="loadGist"/>
        <div v-if="gistId" @click="loadGist">Go</div>
      </div>
      <a v-if="gistName && token" :href='gistUrl' target="_blank" v-tooltip="gistTitle">{{gistName}}</a>
      <span v-if="gistName && !token" class='gist-token-needed' @click="showDescription = true">Access token is required</span>      
    </div>
    <popup class='gist-token-explanation' v-model="showDescription" :arrowLeftOffset="descriptionArrwPos" :autoPosition="false">
      In order to be able to load content from GitHub <a href="https://help.github.com/articles/about-gists/" target="_blank">Gists</a>  
      you must provide a <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank">Personal Access Token</a>
      - <b>make sure to check the 'gist' scope.</b><br>
      Once you have generated a token please update it here:<br>
      <input v-model="token"/>
      <button @click="saveToken" :disabled="!token">Save</button>
      <button @click="showDescription = false">Cancel</button>
    </popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Popup from './Popup';
import GitHubHelper from './GitHubHelper';

export default {
  name: 'Header',
  data() {
    return {
      gistName: '',
      newGistName: 'StructuredContent.json',
      gistUrl: '',
      gistId: '',
      token: '',
      showDescription: false,
      saving: false,
      showNewGistInput: false,
      descriptionArrwPos: 0,
    };
  },
  components: {
    Popup,
  },
  computed: {
    ...mapGetters([
      'loading',
      'user',
      'gist',
      'json',
      'jsonValid',
      'edited',
    ]),
    isGistOwner() {
      return !!(this.gist && this.user && this.gist.ownerId === this.user.id);
    },
    gistTitle() {
      if (this.gistUrl) {
        return `Open ${this.gistName} Gist on GitHub.com`;
      }
      return '';
    },
    gistIdInputTitle() {
      if (this.gistId && !this.gistName) {
        let msg = 'Gist is not loaded <br>';
        if (!this.user) {
          msg += 'Make sure that your Access Token is valid';
        } else {
          msg += 'Make sure that the Gist Id is correct';
        }
        return msg;
      }

      if (!this.gistName) {
        return 'Add id of a Gist to load in the playground';
      }

      return '';
    },
    saveDisabled() {
      return !this.edited || !this.jsonValid;
    },
    saveAsNewTitle() {
      return this.gistName ? 'You are not the owner of this Gist,<br> You can save this content into a new Gist' : '';
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
        this.$store.commit('setMessage', { text: 'Token successfully saved! :) refresh the page to load content from Gist', type: 'success' });
        this.showDescription = false;
      }
    },
    loadGist() {
      if (this.gistId) {
        location.search = `?gist=${this.gistId}`;
      }
    },
    saveGist() {
      if (this.saveDisabled || this.saving) return;

      if (this.gistId && this.isGistOwner) {
        this.saving = true;
        GitHubHelper.saveGist(this.gistId, this.gistName, this.json)
          .then((res) => {
            this.saving = false;
            if (res.isGist) {
              this.$store.commit('setMessage', { text: 'Gist successfully saved! :)', type: 'success' });
            } else {
              this.$store.commit('setMessage', { text: `Fail to save Gist :( - reason: ${res.message}`, type: 'error' });
            }
          });
      } else {
        this.showNewGistInput = true;
        this.$nextTick(() => {
          this.$refs.gistNameInput.focus();
        });
      }
    },
    createGist() {
      const name = this.newGistName || this.gistName;
      if (!name) return;

      this.saving = true;
      this.showNewGistInput = false;
      GitHubHelper.createGist(name, this.json)
        .then((gist) => {
          this.saving = false;
          const gistId = gist && gist.id;
          if (gistId) {
            this.gistId = gistId;
            this.loadGist();
          } else {
            this.saving = false;
            this.$store.commit('setMessage', { text: `Fail to save Gist :( - reason: ${gist.message}`, type: 'error' });
          }
        });
    },
  },
  mounted() {
    this.$store.watch(
      state => state.gist.name,
      (name) => {
        if (name) {
          this.gistName = name;
          this.newGistName = name;
        }
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
    if (this.$refs.gistBtn) {
      this.descriptionArrwPos = 298 - this.$refs.gistBtn.offsetWidth;
    }
  },
  updated() {
    if (this.$refs.gistBtn) {
      this.descriptionArrwPos = 298 - this.$refs.gistBtn.offsetWidth;
    }
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
    }

    .savebtn {
      line-height: 30px;
      background: white;
      padding: 0px 5px 0px 35px;
      margin: 14px 0px 0px 11px;
      border: solid #000 1px;
      max-width: 250px;
      height: 30px;
      border-radius: 5px;
      float: left;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      img {
        position: absolute;
        top: 3px;
        left: 6px;

        &.saving {
          -webkit-animation:spin 1.5s linear infinite;
          -moz-animation:spin 1.5s linear infinite;
          animation:spin 1.5s linear infinite;
        }
      }

      &.disabled {
        opacity: 0.3;
        cursor: default;
      }
    }

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
        width: 32px;
        height: 32px;
      }

      .gist-token-needed {
        color: red;
      }
    }

    .gist-input-name {
      top: 59px;

      input {
        margin: 7px 10px 7px 10px;
        max-width: 190px;
      }
    }

    .gist-token-explanation {
      width: 266px;
      padding: 5px 10px 5px 10px;
      right: 29px;
      top: 66px;


      input {
        font-size: 15px;
        width: 98%;
        margin: 7px 0 7px 0;
        height: 23px;
      }
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    
  }
</style>
