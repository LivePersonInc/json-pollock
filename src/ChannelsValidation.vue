<template>
  <div class='channels-validation'>
    <div class='channels-validation-title'>Select a channel for validation </div>
    <div class="channel-validate">
      <input type="checkbox" v-model="validateAbc">
      <span class="channel-icon abc"></span>
      <span class="channel-name" @click="validateAbc = !validateAbc">Apple Business Chat</span>
      <img class="status-icon" src='./assets/sync.black.svg'>
    </div>
    <div class="channel-validate">
      <input type="checkbox" v-model="validateFB">
      <span class="channel-icon fb"></span>
      <span class="channel-name" @click="validateFB = !validateFB">Facebook</span>
    </div>
    <div class="channel-validate">
      <input type="checkbox" v-model="validateLine">
      <span class="channel-icon line"></span>
      <span class="channel-name" @click="validateLine = !validateLine">LINE</span>
    </div>
    <div class="channel-validate">
      <input type="checkbox" v-model="validateRcs">
      <span class="channel-icon rcs"></span>
      <span class="channel-name" @click="validateRcs = !validateRcs">RCS Business Messaging</span>
    </div>
    <div class="channel-validate-btns">
      <button class="btn-sml" :disabled="!validationSelected">Validate</button>
      <button class="btn-sml" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>

// import { RichContentValidator, RcChannels } from 'lp-rich-content-validator';

export default {
  name: 'channels-validation',
  data() {
    return {
      validateAbc: false,
      validateFB: false,
      validateLine: false,
      validateRcs: false,
    };
  },
  components: {
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    validationSelected() {
      return this.validateAbc ||
      this.validateFB ||
      this.validateLine ||
      this.validateRcs;
    },
  },
};


</script>

<style lang="scss">
  .channels-validation {
    color: #2c3e50;
    width: 400px;
    margin: 20px;
    max-height: 800px;
    overflow-x: auto;

    .channels-validation-title {
      margin-bottom: 10px;
    }

    .channel-validate {
      line-height: 30px;
      height: 30px;
      position: relative;

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
        top: 3px;
        position: absolute;
      }

      .channel-icon {
        position: absolute;
        left: 26px;
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
        margin-left: 46px;
      }
      .status-icon {
        position: absolute;
        left: 265px;
        top: 3px;
        // width: 21px;
        // height: 21px;
        // background: url("assets/sync black.svg");
        -webkit-animation:spin 1.5s linear infinite;
        -moz-animation:spin 1.5s linear infinite;
        animation:spin 1.5s linear infinite;
      }
    }

    .channel-validate-btns {
      margin-top: 10px;
    }
  }
</style>
