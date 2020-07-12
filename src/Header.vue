<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h3 class="title-text">Json-Pollock Playground</h3>
    </div>
    <div class='gistbtn' v-if="token && !loading">
      <a v-if="gistName && token" :href='gistUrl' target="_blank" v-tooltip.bottom="gistTitle">{{gistName}}</a>
      <span v-else-if="gistName && !token" class='gist-token-needed' @click="showDescription = true">Access token is required</span>
      <span v-else v-tooltip.bottom="'Load Gist by ID'" @click="showLoadGistInput = true">Load</span>
      <popup class="gist-input gist-input-id" v-model="showLoadGistInput" :leftOffset="8">
        <input ref="gistNameInput" v-model="gistId" placeholder="Gist ID..."/>
        <div v-if="gistId" class="gist-input-id-save" @click="loadGist">Go</div>
      </popup>
    </div>
    <div class="savebtn" @click="saveGist" v-if="token && !loading" :class="{disabled: saveDisabled}"
      v-tooltip.bottom="isGistOwner && gist ? 'Save' : 'Save as a new Gist'">
      <img v-if="!saving" src='./assets/save.svg'>
      <img v-if="saving" src='./assets/sync.svg' class="saving">
      Save
      <popup class="gist-input gist-input-name" v-model="showNewGistInput" :leftOffset="8">
        <input ref="gistNameInput" v-model="newGistName" placeholder="Gist Name..."/>
        <div v-if="newGistName" class="gist-input-name-save" @click="createGist">Save</div>
      </popup>
    </div>
    <div class="docu" v-tooltip.bottom="'Rich Content Documentation'" @click="gotoDocu">
      Documentation
    </div>
    
    <div class="info" @click="gotoGitHubIssues"
      v-tooltip.bottom="`
      For fixes and improvements of this tool: <br> 
      Click this button and open an issue on our GitHub repo! <br>
      &#9758; Be sure to mark your issue with the <span style='background-color:#9960ba;color: #000000;border-radius:2px;padding:1px 5px'>playground</span> label &#9756;`">
      <!-- &#9432; --> Feedback
    </div>
    <div class="loginbtn">
        <img v-if="!loading && !user" src='./assets/GitHub-Mark-32px.png' v-tooltip.bottom="'Login to GitHub'" @click="showDescription = true">
        <img v-else :src='user.avatar_url' v-tooltip.bottom='user && (user.name || user.login)' @click="showDescription = true">
        <popup class='gist-token-explanation' v-model="showDescription" :arrowLeftOffset="256" :autoPosition="false">
          In order to be able to load content from GitHub <a href="https://help.github.com/articles/about-gists/" target="_blank">Gists</a>  
          you must provide a <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank">Personal Access Token</a>
          - <b>make sure to check the 'gist' scope.</b><br>
          Once you have generated a token please update it here:<br>
          <input v-model="token"/>
          <button @click="saveToken" :disabled="!token">Save</button>
          <button @click="showDescription = false">Cancel</button>
        </popup>
    </div>
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
      showLoadGistInput: false,
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
        return `Open ${this.gistName} Gist on Github.com`;
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
        this.ga(['Gist', 'Load', this.gistId]);
        location.search = `?gist=${this.gistId}`;
      }
    },
    saveGist() {
      if (this.saveDisabled || this.saving) return;

      if (this.gistId && this.isGistOwner) {
        this.ga(['Gist', 'Save', this.gistId]);
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

      this.ga(['Gist', 'Create', name]);
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
    gotoGitHubIssues() {
      this.ga(['Issues', 'navigate']);
      window.open('https://github.com/LivePersonInc/json-pollock/issues', '_blank');
    },
    gotoDocu() {
      this.ga(['Documentation', 'navigate']);
      window.open('https://developers.liveperson.com/getting-started-with-rich-messaging-introduction.html', '_blank');
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
  },
  updated() {},
};
</script>

<style lang="scss" scoped>
  .header {

    .header-btn {
      position: absolute;
      top: 4px;
      font-weight: bold;
      cursor: pointer;
      border: solid #ff720b;
      border-radius: 6px;
      padding: 2px;
      cursor: hand;
      color: #fff;
      background-color: #ff720b;
    }

    input {
      border-radius: 3px;
      border: solid #a2aeb5 1px;
    }

    .title {
      position: absolute;
      top: -12px;
      width: 500px;
      color: #fff;
      margin-left: 10px;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

      img {
        float: left;
        width: 44px;
        cursor: pointer;
        margin-top: 16px;
        margin-right: 10px;
        cursor: hand;
      }
    }

    @media screen and (max-width: 992px) {
      .title {
        .title-text {
          display: none;
        }
      }
    }

    .docu {
      position: absolute;
      right: 146px;
      top: 4px;
      font-weight: bold;
      cursor: pointer;
      border: solid #ff720b;
      border-radius: 6px;
      padding: 2px;
      cursor: hand;
      color: #fff;
      background-color: #ff720b;
    }

    .savebtn {
      @extend .header-btn;
      right: 280px;
      padding-left: 25px;

      img {
        position: absolute;
        top: 1px;
        left: 0px;

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

    .info {
      @extend .header-btn;
      position: absolute;
      right: 54px;
    }

    

    .loginbtn {
      float: right;
      background: #fff;
      border: solid 2px #ff715b;
      border-radius: 30px;
      width: 34px;
      height: 34px;
      margin: 1px 8px;

      img {
        width: 34px;
        height: 34px;
        border-radius: 34px;
      }
    }

    .gistbtn {
      @extend .header-btn;
      position: absolute;
      right: 357px;

      a {
        color: #ffffff;
        text-decoration: none;
      }

      .gist-token-needed {
        color: red;
      }
    }

    .gist-input-name {
      top: 49px;

      input {
        margin: 7px 10px 7px 10px;
        max-width: 190px;
      }

      .gist-input-name-save {
        color: #000;
      }
    }

    .gist-input-id {
      top: 49px;

      input {
        margin: 7px 10px 7px 10px;
        max-width: 190px;
      }

      .gist-input-id-save {
        color: #000;
      }
    }

    .gist-token-explanation {
      width: 266px;
      padding: 5px 10px 5px 10px;
      right: 6px;
      top: 56px;


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
