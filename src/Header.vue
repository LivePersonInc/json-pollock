<template>
  <div class='header'>
    <div class='title'>
      <img src='./assets/logo.png' @click='onLogoClick'>
      <h3 class="title-text">Json-Pollock Playground</h3>
    </div>
    <div class="buttons-bar">
      <div class="loginbtn">
          <img v-if="!loading && !user" src='./assets/GitHub-Mark-32px.png' v-tooltip.bottom="'Sign in with Github to save this JSON'" @click="redirectToLoginPage">
          <img v-else :src='user.avatar_url' v-tooltip.bottom='user && (user.name || user.login)' @click="showDescription = true">
          <popup class='gist-token-explanation' v-model="showDescription" :arrowLeftOffset="90" :autoPosition="false">
            <div class="user-name">{{user.name}}</div>
            <button class="btn-logout" @click="logout">Sign out</button>            
          </popup>
      </div>
      <div class="go-to-source header-btn weak" v-if="!loading && gistName">
        <a :href='gistUrl' target="_blank" v-tooltip.bottom="gistTitle"><span class="header-btn-title">View on Github</span></a>       
      </div>
      <div class="gistbtn header-btn weak" v-if="!loading">        
        <span class="header-btn-title" v-tooltip.bottom="'Open Gist from list or by ID'" @click="showLoadGistInput = true">Open</span>
        <popup class="gist-input gist-input-id" v-model="showLoadGistInput">
          <my-gists-list v-if="userGists && userGists.length" :myGists="userGists"/>
          <span v-if="userGists && userGists.length" class="gist-input-title">Load Gist by id</span>
          <input ref="gistNameInput" v-model="newGistId" placeholder="Gist ID..."/>
          <div v-if="newGistId" class="action-btn gist-input-id-save" @click="loadGist(newGistId)">Go</div>
        </popup>
      </div>
      <div class="savebtn header-btn weak" @click="showGistDialog" v-if="!loading" :class="{disabled: saveDisabled}">
        <img v-if="!saving" src='./assets/save.svg'>
        <img v-if="saving" src='./assets/sync.svg' class="saving">
        <span class="header-btn-title" v-tooltip.bottom="'Save changes to a new Gist'">Save as</span>
        <popup class="gist-input gist-input-name" v-model="showNewGistInput">
          <div v-if="token">
            <input ref="gistNameInput" v-model="newGistName" placeholder="Gist Name..."/>
            <div v-if="newGistName" class="action-btn gist-input-name-save" @click="createGist">Save</div>
          </div>
          <div v-else class="login-to-save">
            You must be logged in to save
            <button class="btn-login" @click="redirectToLoginPage" v-tooltip.bottom="'Sign in with Github'">
              <img v-if="!loading && !user" src='./assets/GitHub-Mark-32px.png'>
              Sign in
            </button>
          </div>
        </popup>
      </div>
      <div class="savebtn header-btn weak" @click="saveGist" v-if="!loading && isGistOwner && gist" :class="{disabled: saveDisabled}"
        v-tooltip.bottom="`Save changes to ${this.gistName}`">
        <img v-if="!saving" src='./assets/save.svg'>
        <img v-if="saving" src='./assets/sync.svg' class="saving">
        <span class="header-btn-title">Save</span>       
      </div>
      <div class="docu header-btn weak" v-tooltip.bottom="'Rich Content Documentation'" @click="gotoDocu">
        <span class="header-btn-title">Documentation</span>
      </div>    
      <div class="info header-btn weak" @click="gotoGitHubIssues"
        v-tooltip.bottom="`
        For fixes and improvements of this tool: <br> 
        Click this button and open an issue on our GitHub repo! <br>
        Be sure to mark your issue with the <span style='background-color:#9960ba;color: #000000;border-radius:15px;padding:1px 8px';font-weight:bold;>playground</span> label`">
        <span class="header-btn-title">Feedback</span>
      </div>
      <div class="templates-btn header-btn strong">
        <span class="header-btn-title" v-tooltip.bottom="'Select a JSON template'" @click="showJsonTemplates = true">Templates</span>
        <popup class="template-list" v-model="showJsonTemplates">
          <json-template-list @selected="onTemplateSelected"></json-template-list>
        </popup>
      </div> 
      <div class="validate-btn header-btn strong">
        <span class="header-btn-title" v-tooltip.bottom="'Validate by Channels'" @click="showValidationDialog = true">Validate</span>
        <popup class="validation-dialog" v-model="showValidationDialog" :pinnable="true">
          <channels-validation @close="showValidationDialog = false" :validateDisabled="validateDisabled"></channels-validation>
        </popup>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Popup from './Popup';
import GitHubHelper from './GitHubHelper';
import JsonTemplateList from './JsonTemplateList';
import ChannelsValidation from './ChannelsValidation';
import MyGistsList from './MyGistsList';

export default {
  name: 'Header',
  data() {
    return {
      gistName: '',
      newGistName: '',
      gistUrl: '',
      gistId: '',
      newGistId: '',
      token: '',
      showDescription: false,
      saving: false,
      showNewGistInput: false,
      showLoadGistInput: false,
      showJsonTemplates: false,
      showValidationDialog: false,
      descriptionArrwPos: 0,
    };
  },
  components: {
    Popup,
    JsonTemplateList,
    ChannelsValidation,
    MyGistsList,
  },
  computed: {
    ...mapGetters([
      'loading',
      'user',
      'gist',
      'json',
      'jsonValid',
      'edited',
      'schemaValid',
      'userGists',
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
      return !this.jsonValid;
    },
    validateDisabled() {
      return !this.schemaValid;
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
    onTemplateSelected(template) {
      this.$emit('templateSelected', template);
      this.showJsonTemplates = false;
    },
    saveToken(token) {
      if (token) {
        GitHubHelper.saveToken(token);
        this.showDescription = false;
      }
    },
    deleteToken() {
      GitHubHelper.deleteToken();
      this.showDescription = true;
    },
    loadGist(newGist) {
      const gistToLoad = newGist || this.gistId;
      if (gistToLoad) {
        this.ga(['Gist', 'LoadById', gistToLoad]);
        location.search = `?gist=${gistToLoad}`;
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
      }
    },
    showGistDialog() {
      this.showNewGistInput = true;
      this.$nextTick(() => {
        this.$refs.gistNameInput.focus();
      });
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
    redirectToLoginPage() {
      const url = 'https://github.com/login/oauth/authorize';
      const clientIdParam = `client_id=${process.env.VUE_APP_CLIENT_ID}`;
      const scopeParam = 'scope=gist';
      const stateParam = `state=${Math.random().toString(16).substr(2, 8)}`;
      window.open(`${url}?${clientIdParam}&${scopeParam}&${stateParam}`, '_blank');

      window.addEventListener('message', this.waitForLoginResult, false);
    },
    logout() {
      this.$store.commit('removeToken');
      this.$store.commit('removeUser');
      this.$store.commit('removeUserGists');
      this.deleteToken();
      this.$store.commit('setMessage', { text: 'you have been successfully logged out', type: 'success' });
    },
    waitForLoginResult(event) {
      if (event.source.location.pathname === '/static/login.html') {
        this.$store.commit('setToken', event.data);
        this.saveToken(event.data);
        GitHubHelper.getUserDetails()
          .then((userDetails) => {
            if (userDetails) {
              this.$store.commit('setUser', userDetails);
              this.$store.commit('setMessage', { text: `Hello ${userDetails.name || userDetails.login}`, type: 'success' });
            }
          });
        window.removeEventListener('message', this.waitForLoginResult);
      }
    },
  },
  mounted() {
    this.$store.watch(
      state => state.gist.name,
      (name) => {
        if (name) {
          this.gistName = name;
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
      float: right;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
      padding: 2px;
      cursor: hand;
      color: #fff;
      margin: 13px 20px 13px 0;
      
      .header-btn-title {
        padding: 4px 14px;
      }

      &.strong {
        background-color: #ff720b;
        border: solid #ff720b;
      }

      &.weak {
        background-color: #6986D8;
        border: solid #6986D8;
      }

      @media screen and (max-width: 400px) {
        display: none;
      }
    }

    input {
      border-radius: 3px;
      border: solid #a2aeb5 1px;
    }

    .title {
      float: left;
      width: 300px;
      color: #fff;
      margin: -2px 20px;
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

    @media screen and (max-width: 1475px) {
      .title {
        width: 30px;
        .title-text {
          display: none;
        }
      }
    }

    .buttons-bar {
      float: right;

      .loginbtn {
        float: right;
        background: #fff;
        border: solid 2px #ff715b;
        border-radius: 30px;
        width: 34px;
        height: 34px;
        margin: 11px 15px 11px 0;
        cursor: pointer;

        img {
          width: 34px;
          height: 34px;
          border-radius: 34px;
        }
      }

      .docu {
        @media screen and (max-width: 1215px) {
          display: none;
        }
      }

      .savebtn {
        padding-left: 23px;
        position: relative;

        img {
          position: absolute;
          top: 1px;
          left: 8px;

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

        @media screen and (max-width: 750px) {
          display: none;
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

        .action-btn {
          position: absolute;
          bottom: 10px;
          right: 23px;
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
        @media screen and (max-width: 1215px) {
          display: none;
        }
      }

      .go-to-source {
        position: relative;
        a {
          color: #ffffff;
          text-decoration: none;
        }

        .gist-token-needed {
          color: red;
        }

        @media screen and (max-width: 900px) {
          display: none;
        }
      }

      .gistbtn {
        position: relative;
        a {
          color: #ffffff;
          text-decoration: none;
        }

        .gist-token-needed {
          color: red;
        }

        @media screen and (max-width: 750px) {
          display: none;
        }
      }

      .gist-input-name {
        top: 42px;

        input {
          margin: 8px 20px;
          width: 190px;
        }

        .gist-input-name-save {
          color: #000;          
        }

        .login-to-save {

          color: #000;
          margin: 10px;
          text-align: center;
          width: 140px;

          .btn-login {
            position: relative;
            height: 32px;
            padding-left: 26px;
            width: 100px;            
            border: 1px solid #d3d3d3;
            margin-top: 10px;
            border-radius: 8px;
            color: #000;
            font-weight: bold;
            margin: 5px;
            background: #ebebeb;
            font-size: 16px;
            cursor: pointer;

            img {
              position: absolute;
              top: 2px;
              left: 3px;
              height: 25px;
            }
          }
        }
      }

      .gist-input-id {
        top: 42px;

        .gist-input-title {
          color: #2c3e50;
          margin: 0px 20px;
        }

        input {
          margin: 8px 20px;
          width: 190px;
        }

        .gist-input-id-save {
          color: #000;          
        }
      }

      .gist-token-explanation {
        top: 62px;
        width: 110px;
        padding: 5px 10px 5px 10px;
        right: 6px;

        .user-name {
          text-align: center;
        }

        .btn-logout {
          width: 100px;
          height: 30px;
          border: 1px solid #d3d3d3;
          border-radius: 8px;
          color: #000;
          font-weight: bold;
          margin: 5px;
          background: #ebebeb;
          font-size: 16px;
          cursor: pointer;
        }


        input {
          font-size: 15px;
          width: 98%;
          margin: 7px 0 7px 0;
          height: 23px;
        }
      }

      .templates-btn {
        position: relative;

        .template-list {
          top: 42px;
        }
      }

      .validate-btn {
        position: relative;

        &.disabled {
          opacity: 0.3;
          cursor: default;
        }

        .validation-dialog {
          top: 42px;
        }
      }

    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    
  }
</style>
