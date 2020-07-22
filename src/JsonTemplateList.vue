<template>
  <div class='json-template-list'>
    <div v-for="(tmpl, index) in templates" :key="index" class='json-template-item' @click="$emit('selected', tmpl)">
      <span class="json-template-item-name">{{ tmpl.name }}</span><br>
      <span class="json-template-item-desc" v-tooltip="tmpl.description">{{ tmpl.description }}</span>
      <div class="json-template-item-channels">
        <div v-for="(type, index) in tmpl.types" :key="index" class="json-template-item-channel" :class="type" v-tooltip="getChannelName(type)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import allTemplates from './json-templates';

export default {
  name: 'json-template-list',
  data() {
    return {};
  },
  components: {
  },
  mounted() {
  },
  methods: {
    getChannelName(channel) {
      switch (channel) {
        case 'web':
          return 'Web';
        case 'fb':
          return 'Facebook';
        case 'line':
          return 'LINE';
        case 'abc':
          return 'Apple Business Chat';
        case 'rcs':
          return 'RCS Business Messaging';
        default:
          return '';
      }
    },
  },
  computed: {
    templates() {
      return allTemplates;
    },
  },
};


</script>

<style lang="scss">
  .json-template-list {
    color: #2c3e50;
    width: 400px;
    margin: 20px;
    max-height: 300px;
    overflow-x: auto;

    .json-template-item {
      margin: 3px 0px;
      border-bottom: solid 0.5px;
      padding-top: 3px;
      position: relative;

      .json-template-item-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 300px;
        display: inline-block;
      }

      .json-template-item-desc {
        font-size: 13px;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 400px;
        display: inline-block;
      }

      .json-template-item-channels {
        position: absolute;
        right: 0px;
        top: 5px;
  
        .json-template-item-channel {
          margin-left: 4px;
          &.web {
            float: right;
            width: 16px;
            height: 16px;
            background: url("assets/16x16-sprite.png") no-repeat -1441px -1px;
          }
          &.fb {
            float: right;
            width: 16px;
            height: 16px;
            background: url("assets/16x16-sprite.png") no-repeat -2700px 0;
          }
          &.line {
            float: right;
            width: 16px;
            height: 16px;
            background: url("assets/16x16-sprite.png") no-repeat -2880px 0;
          }
          &.abc {
            float: right;
            width: 16px;
            height: 16px;
            background: url("assets/16x16-sprite.png") no-repeat -2280px 0;
          }
          &.rcs {
            float: right;
            width: 16px;
            height: 16px;
            background: url("assets/16x16-sprite.png") no-repeat -2900px 0;
          }
        }
      }
    }
  }
</style>
