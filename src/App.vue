<template>
  <div id="app">
    <Header class="header_container"></Header>
    <JSONEditor class="jsoneditor_container"></JSONEditor>
    <JSONPollock class="jsonpollock_container"></JSONPollock>
  </div>
</template>

<script>
import Header from './Header';
import JSONEditor from './JSONEditor';
import JSONPollock from './JSONPollock';
import GistHelper from './GistHelper';

const defaultContent = '{"type":"vertical","elements":[{"type":"image","url":"https://cdn.bgr.com/2016/08/iphone-8-concept.jpg?quality=98&strip=all","tooltip":"image tooltip","click":{"actions":[{"type":"navigate","name":"Navigate to store via image","lo":23423423,"la":2423423423}]}},{"type":"carousel","padding":0,"elements":[{"type":"vertical","elements":[{"type":"text","text":"SIM only plan","tooltip":"SIM only plan","rtl":false,"style":{"bold":false,"italic":false,"color":"#000000","size":"large"}},{"type":"text","text":"Twelve month plan BYO mobile","tooltip":"Twelve month plan BYO mobile","rtl":false,"style":{"bold":true,"italic":false,"color":"#000000"}},{"type":"button","tooltip":"Choose a plan","title":"Choose a plan","click":{"metadata":[{"type":"ExternalId","id":"ANOTHER_ONE_1"}],"actions":[{"type":"publishText","text":"SIM only plan"}]}}]},{"type":"vertical","elements":[{"type":"text","text":"Swap plan","tooltip":"Swap plan","rtl":false,"style":{"bold":false,"italic":false,"color":"#000000","size":"large"}},{"type":"text","text":"Two year plan leasing a mobile","tooltip":"Two year plan leasing a mobile","rtl":false,"style":{"bold":true,"italic":false,"color":"#000000"}},{"type":"button","tooltip":"Choose a plan","title":"Choose a plan","click":{"metadata":[{"type":"ExternalId","id":"ANOTHER_ONE_2"}],"actions":[{"type":"publishText","text":"Two year plan leasing a mobile"}]}}]},{"type":"vertical","elements":[{"type":"text","text":"Mobiles on a plan","tooltip":"Mobiles on a plan","rtl":false,"style":{"bold":false,"italic":false,"color":"#000000","size":"large"}},{"type":"text","text":"Two year plan with a mobile","tooltip":"Two year plan with a mobile","rtl":false,"style":{"bold":true,"italic":false,"color":"#000000"}},{"type":"button","tooltip":"Choose a plan","title":"Choose a plan","click":{"metadata":[{"type":"ExternalId","id":"ANOTHER_ONE_3"}],"actions":[{"type":"publishText","text":"Mobiles on a plan"}]}}]}]},{"type":"text","text":"product name (Title)","tooltip":"text tooltip","style":{"bold":true,"size":"large"}},{"type":"text","text":"product name (Title)","tooltip":"text tooltip"},{"type":"button","tooltip":"button tooltip","title":"Add to cart","click":{"actions":[{"type":"link","name":"Add to cart","uri":"https://example.com"}]}},{"type":"horizontal","elements":[{"type":"button","title":"Buy","tooltip":"Buy this broduct","click":{"actions":[{"type":"link","name":"Buy","uri":"https://example.com"}]}},{"type":"button","title":"Find similar","tooltip":"store is the thing","click":{"actions":[{"type":"link","name":"Buy","uri":"https://search.com"}]}}]},{"type":"button","tooltip":"button tooltip","title":"Publish text","click":{"actions":[{"type":"publishText","text":"my text"}]}},{"type":"map","lo":64.128597,"la":-21.89611,"tooltip":"map tooltip"},{"type":"button","tooltip":"button tooltip","title":"Navigate","click":{"actions":[{"type":"publishText","text":"my text"},{"type":"navigate","name":"Navigate to store via image","lo":23423423,"la":2423423423}]}}]}';

export default {
  name: 'app',
  components: {
    Header,
    JSONEditor,
    JSONPollock,
  },
  mounted() {
    const loadDefault = () => {
      this.$store.commit('setJson', JSON.parse(defaultContent));
      this.$store.commit('setLoading', false);
    };
    const gistExpr = location.search.replace('?', '').split('?').find(str => str.indexOf('gist=') === 0);
    if (gistExpr) {
      this.$store.commit('setLoading', true);
      const gistId = gistExpr.slice(5);
      GistHelper.load(gistId)
      .then((gist) => {
        if (gist) {
          this.$store.commit('setJson', JSON.parse(gist.content));
          this.$store.commit('setLoading', false);
        } else {
          loadDefault();
        }
      })
      .catch(() => {
        loadDefault();
      });
    } else {
      loadDefault();
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;  
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  background: url(assets/pollock-paint.jpg);
}

.header_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 12px;
  height: 60px;
  background-color: #EBEBEB;
}

.editor_container {
  width: 48%;
  top: 90px;  
  height:calc(100% - 120px);
  position: absolute;
  background-color: #FFFFFF;
}

.jsoneditor_container {
  @extend .editor_container;
}

.jsonpollock_container {
  @extend .editor_container;

  left: 50%;
  border: solid rgb(56, 131, 250) 1px;
  overflow: auto;
}
</style>
