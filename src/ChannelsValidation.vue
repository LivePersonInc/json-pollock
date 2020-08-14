<template>
  <div class='channels-validation'>
    <div class='channels-validation-title'>Select a channel for validation </div>
    <div class="channel-validate-warpper">
      <div class="channel-validate">
        <toggle-button :color="{checked: '#6986D8', unchecked: '#a3a3a3'}"
          :width="40"
          :sync="true"
          v-model="validate_abc"/>
        <span class="channel-icon abc"></span>
        <span class="channel-name" @click="validate_abc = !validate_abc">Apple Business Chat</span>
        <img class="status-icon validating" v-if="validating_abc" src='./assets/sync.black.svg'>
        <span class="status-icon valid" v-if="results_abc && results_abc.valid" v-tooltip="'Validtion is OK'"></span>
        <span class="status-icon invalid" v-if="results_abc && !results_abc.valid" v-tooltip="'Validtion Failed'"></span>
        <span class="channel-show-link-error" v-if="results_abc && !results_abc.valid" @click="show_errors_abc = !show_errors_abc">errors</span>
      </div>
      <div class="channel-errors" v-if="validate_abc && results_abc && !results_abc.valid && show_errors_abc">
        <div v-for="(error, index) in getErrors('abc')" :key="index" class="channel-error" v-html="getErrorString(error)"></div>
      </div>
      <div class="channel-validate">
        <toggle-button :color="{checked: '#6986D8', unchecked: '#a3a3a3'}"
          :width="40"
          :sync="true"
          v-model="validate_fb"/>
        <span class="channel-icon fb"></span>
        <span class="channel-name" @click="validate_fb = !validate_fb">Facebook</span>
        <img class="status-icon validating" v-if="validating_fb" src='./assets/sync.black.svg'>
        <span class="status-icon valid" v-if="results_fb && results_fb.valid" v-tooltip="'Validtion is OK'"></span>
        <span class="status-icon invalid" v-if="results_fb && !results_fb.valid" v-tooltip="'Validtion Failed'"></span>
        <span class="channel-show-link-error"  v-if="results_fb && !results_fb.valid" @click="show_errors_fb = !show_errors_fb">errors</span>
      </div>
      <div class="channel-errors" v-if="validate_fb && results_fb && !results_fb.valid && show_errors_fb">
        <div v-for="(error, index) in getErrors('fb')" :key="index" class="channel-error" v-html="getErrorString(error)"></div>
      </div>
      <div class="channel-validate">
        <toggle-button :color="{checked: '#6986D8', unchecked: '#a3a3a3'}"
          :width="40"
          :sync="true"
          v-model="validate_line"/>
        <span class="channel-icon line"></span>
        <span class="channel-name" @click="validate_line = !validate_line">LINE</span>
        <img class="status-icon validating" v-if="validating_line" src='./assets/sync.black.svg'>
        <span class="status-icon valid" v-if="results_line && results_line.valid" v-tooltip="'Validtion is OK'"></span>
        <span class="status-icon invalid" v-if="results_line && !results_line.valid" v-tooltip="'Validtion Failed'"></span>
        <span class="channel-show-link-error"  v-if="results_line && !results_line.valid" @click="show_errors_line = !show_errors_line">errors</span>
      </div>
      <div class="channel-errors" v-if="validate_line && results_line && !results_line.valid && show_errors_line">
        <div v-for="(error, index) in getErrors('line')" :key="index" class="channel-error" v-html="getErrorString(error)"></div>
      </div>
      <div class="channel-validate">
        <toggle-button :color="{checked: '#6986D8', unchecked: '#a3a3a3'}"
          :width="40"
          :sync="true"
          v-model="validate_rcs"/>
        <span class="channel-icon rcs"></span>
        <span class="channel-name" @click="validate_rcs = !validate_rcs">RCS Business Messaging</span>
        <img class="status-icon validating" v-if="validating_rcs" src='./assets/sync.black.svg'>
        <span class="status-icon valid" v-if="results_rcs && results_rcs.valid" v-tooltip="'Validtion is OK'"></span>
        <span class="status-icon invalid" v-if="results_rcs && !results_rcs.valid" v-tooltip="'Validtion Failed'"></span>
        <span class="channel-show-link-error"  v-if="results_rcs && !results_rcs.valid" @click="show_errors_rcs = !show_errors_rcs">errors</span>
      </div>
      <div class="channel-errors" v-if="validate_rcs && results_rcs && !results_rcs.valid && show_errors_rcs">
        <div v-for="(error, index) in getErrors('rcs')" :key="index" class="channel-error" v-html="getErrorString(error)"></div>
      </div>
    </div>
    <div class="channel-validate-btns">
      <button class="btn-sml" @click="validate" :disabled="!validationSelected || validateDisabled">Validate</button>
      <button class="btn-sml" @click="resetAll" >Reset</button>
      <button class="btn-sml" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { each, get, isString, isObject } from 'lodash';
import { RichContentValidator, RcChannels } from 'lp-rich-content-validator';

const rcValidator = new RichContentValidator({ channel: RcChannels.WEB });

const channels = ['abc', 'fb', 'rcs', 'line'];
const dataObj = {};
each(channels, (channel) => {
  dataObj[`validate_${channel}`] = false;
  dataObj[`validating_${channel}`] = false;
  dataObj[`results_${channel}`] = undefined;
  dataObj[`show_errors_${channel}`] = false;
});

export default {
  name: 'channels-validation',
  props: {
    validateDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return dataObj;
  },
  components: {
  },
  mounted() {
  },
  methods: {
    validate() {
      this.resetResults();
      const gaInput = [];
      if (this.validate_abc) {
        this.validating_abc = true;
        gaInput.push('abc');
        this.$nextTick(() => {
          this.results_abc = this.validateChannel(RcChannels.ABC);
          this.validating_abc = false;
        });
      }
      if (this.validate_fb) {
        this.validating_fb = true;
        gaInput.push('fb');
        this.$nextTick(() => {
          this.results_fb = this.validateChannel(RcChannels.FB);
          this.validating_fb = false;
        });
      }
      if (this.validate_line) {
        this.validating_line = true;
        gaInput.push('line');
        this.$nextTick(() => {
          this.results_line = this.validateChannel(RcChannels.LINE);
          this.validating_line = false;
        });
      }
      if (this.validate_rcs) {
        this.validating_rcs = true;
        gaInput.push('rbm');
        this.$nextTick(() => {
          this.results_rcs = this.validateChannel(RcChannels.RBM);
          this.validating_rcs = false;
        });
      }
      this.ga(['Validation', 'validate', gaInput.join(',')]);
    },
    validateChannel(channel) {
      rcValidator.setChannelTo(channel);
      return rcValidator.validateRcBody(this.json);
    },
    resetAll() {
      each(channels, (channel) => {
        dataObj[`validate_${channel}`] = false;
        dataObj[`validating_${channel}`] = false;
        dataObj[`results_${channel}`] = undefined;
        dataObj[`show_errors_${channel}`] = false;
      });
    },
    resetResults() {
      each(channels, (channel) => {
        this[`results_${channel}`] = undefined;
      });
    },
    getErrors(channel) {
      const errors = get(this[`results_${channel}`], 'errors', []);
      return isString(errors) ? [errors] : errors;
    },
    getErrorString(error) {
      if (isString(error)) {
        return error;
      }
      //  dataPath array locations ([0], [1], etc) will be replaced with [?] as the validation index
      //  is not reliable due to reordering made by the validaton lib
      return `<span class="channel-error-type">${isString(error.data) ? error.data : error.data.type || ''}</span>
      <span class="channel-error-path">${(error.dataPath || '').replace(/\[\d+\]/g, '[?]')}</span>
      <span class="channel-error-msg">${error.message} ${isObject(error.params) ? JSON.stringify(error.params) : error.params}</span>`;
    },
  },
  computed: {
    ...mapGetters([
      'json',
    ]),
    validationSelected() {
      let isSelected = false;
      each(channels, (channel) => {
        if (this[`validate_${channel}`]) {
          isSelected = true;
          return false;
        }
        return true;
      });
      return isSelected;
    },
    availableChannels() {
      return channels;
    },
  },
};


</script>

<style lang="scss">
  .channels-validation {
    color: #2c3e50;
    width: 400px;
    margin: 20px;

    .channels-validation-title {
      margin-bottom: 10px;
    }

    .channel-validate-warpper {
      overflow: auto;
      max-height: 700px;
      .channel-validate {
        line-height: 30px;
        height: 30px;
        position: relative;

        .channel-icon {
          position: absolute;
          left: 56px;
          top: 6px;
          width: 16px;
          height: 16px;

          &.abc {
            background: url("assets/16x16-sprite.png") no-repeat -2280px 0;
          }
          &.fb {
            background: url("assets/16x16-sprite.png") no-repeat -2700px 0;
          }
          &.line {
            background: url("assets/16x16-sprite.png") no-repeat -2880px 0;
          }
          &.rcs {
            background: url("assets/16x16-sprite.png") no-repeat -2900px 0;
          }
          &.web {
            background: url("assets/16x16-sprite.png") no-repeat -1441px -1px;
          }
        }
        .channel-name {
          margin-left: 41px;
        }
        .status-icon {
          position: absolute;
          left: 297px;

          &.validating {
            top: 15px;
            -webkit-animation:spin1 1.5s linear infinite;
            -moz-animation:spin 1.5s linear infinite;
            animation:spin 1.5s linear infinite;
            -webkit-transform-origin: top;
            -moz-transform-origin: top;
            -o-transform-origin: top;
            transform-origin: top;
          }

          &.valid {
            width: 18px;
            height: 18px;
            top: 6px;
            background: url("assets/16x16-sprite.png") no-repeat -259px 1px;
          }

          &.invalid {
            width: 18px;
            height: 18px;
            top: 6px;
            background: url("assets/16x16-sprite.png") no-repeat -600px 1px;
          }
        }

        .channel-show-link-error {
          position: absolute;
          left: 344px;
          text-decoration: underline;

          &:hover {
            color: #008CBA;
          }
        }
      }

      .channel-errors {
        max-height: 200px;
        overflow: auto;
        border-top: solid 0.5px;
        border-bottom: solid 0.5px;
        font-size: 14px;
        margin-bottom: 10px;

        .channel-error {
          border-top: solid #a3a3a3 0.5px;
          padding: 4px;

          .channel-error-type {
            font-weight: bold;
            display: block;
          }
          .channel-error-path {
            font-style: italic;
            font-weight: normal;
            display: block;
          }
          .channel-error-msg {
            font-weight: bold;
          }

        }
      }
    }

    .channel-validate-btns {
      margin-top: 10px;
    }
  }
</style>
