<template>
  <div class='actions' ref="actions">
    <div v-for="(action, index) in actions" :key="index" class='action-line'>
      {{index + 1}}. {{action.actionData}}
    </div>
    <div class="empty" v-show="!actionsExists ">NO ACTIONS</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { get } from 'lodash';

export default {
  name: 'ActionsViewer',
  data() {
    return {};
  },
  components: {
  },
  mounted() {
    this.$store.watch(
      state => state.actions,
      () => {
        this.$refs.actions.scrollTop = this.$refs.actions.scrollHeight;
      },
    );
  },
  computed: {
    ...mapGetters([
      'actions',
    ]),
    actionsExists() {
      return !!get(this.actions, 'length');
    },
  },
};


</script>

<style lang="scss" scoped>
  .actions {
    font-size: 13px;
    .empty {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 143px;
      padding-left: 0;
    }
    div {
      padding-left: 4px;
    }
    div:nth-child(2n-1) {
      background: #ebebeb;
    }
  }
</style>
