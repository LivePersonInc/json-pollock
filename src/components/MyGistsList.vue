<template>
  <div class='my-gists-list'>
    <div class="my-gists-title">My Gists</div>
    <div class="my-gists-wrapper">
      <div v-for="(gist, index) in myGists" :key="index" class='my-gists-item' @click="onGistSelected(gist)">
        <span class="my-gists-item-name">{{ gist.name }}</span><br>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'my-gists-list',
  props: {
    myGists: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {};
  },
  components: {
  },
  mounted() {
  },
  methods: {
    onGistSelected(gist) {
      this.ga(['Gist', 'LoadByUser', gist.id]);
      location.search = `?gist=${gist.id}`;
    },
  },
};


</script>

<style lang="scss">
  .my-gists-list {
    color: #2c3e50;
    width: 200px;
    margin: 20px;

    .my-gists-title {
      margin: 3px px;
      padding-bottom: 6px;
      border-bottom: solid 0.5px;
    }

    .my-gists-wrapper {
      max-height: 300px;
      overflow-x: auto;
    }

    .my-gists-item {
      margin: 3px 0px;
      border-bottom: solid 0.5px;
      padding-top: 3px;
      position: relative;

      .my-gists-item-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 300px;
        font-weight: normal;
        display: inline-block;
      }

      .my-gists-item-desc {
        font-size: 13px;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 400px;
        display: inline-block;
      }      
    }
  }
</style>
