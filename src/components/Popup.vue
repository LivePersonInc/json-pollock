<template>
  <div ref="popup" class="popup" v-if="value" tabindex="1" 
    @focusout="onFocusOut" @focusin="onFocusIn"
    :style="autoPosition && `left:${leftOffset || popupLeftOffset}px`">
    <div v-if="pinnable" class="popup_pin" :class="{'pinned': pinned}" v-tooltip="pinned ? '' : 'Pin Window'" @click="pinned = true" @mousedown="dragMouseDown"></div>
    <div v-if="!pinned" class="popup_arrow top" :style="`left:${topArrowLeftOffset}px`" v-show="hasTopArrow">
      <div class="popup_arrow_border"></div>
      <div class="popup_arrow_body"></div>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    leftOffset: {
      type: Number,
      required: false,
      default: 0,
    },
    arrowLeftOffset: {
      type: Number,
      required: false,
      default: 10,
    },
    // automatically close when popup is not focused
    autoClose: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasTopArrow: {
      type: Boolean,
      required: false,
      default: true,
    },
    autoPosition: {
      type: Boolean,
      required: false,
      default: true,
    },
    pinnable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {},
  watch: {
    value(newVal) {
      this.visible = newVal;
    },
  },
  methods: {
    show() {
      this.visible = true;
      this.$emit('input', true);
    },
    hide() {
      this.visible = false;
      this.pinned = false;
      this.$emit('input', false);
    },
    onFocusOut() {
      this.onfocus = false;
      setTimeout(() => {
        if (this.autoClose && !this.onfocus && !this.pinned) {
          this.hide();
        }
      }, 10);
    },
    onFocusIn() {
      this.onfocus = true;
    },
    alignPosition() {
      let popupInnerWidth = document.defaultView
        .getComputedStyle(this.$refs.popup, null)
        .getPropertyValue('width');
      popupInnerWidth = parseInt(popupInnerWidth, 10);
      let leftOffset = 0;

      const popupRect = this.$refs.popup.getBoundingClientRect();

      if (popupRect.right > window.innerWidth) {
        leftOffset = window.innerWidth - popupRect.right - 20;
        this.popupLeftOffset = leftOffset;
      }
      if (!this.topArrowLeftOffset) {
        this.topArrowLeftOffset = this.arrowLeftOffset;
        if (this.topArrowLeftOffset < popupInnerWidth) {
          this.topArrowLeftOffset =
            this.topArrowLeftOffset + Math.abs(leftOffset);
        } else {
          this.topArrowLeftOffset = popupInnerWidth + Math.abs(leftOffset);
        }
      }
    },
    dragMouseDown(e) {
      if (this.pinned) {
        e.preventDefault();
        this.positions.clientX = e.clientX;
        this.positions.clientY = e.clientY;
        document.onmousemove = this.elementDrag;
        document.onmouseup = this.closeDragElement;
      }
    },
    elementDrag(e) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - e.clientX;
      this.positions.movementY = this.positions.clientY - e.clientY;
      this.positions.clientX = e.clientX;
      this.positions.clientY = e.clientY;
      this.$refs.popup.style.top = `${this.$refs.popup.offsetTop - this.positions.movementY}px`;
      this.$refs.popup.style.left = `${this.$refs.popup.offsetLeft - this.positions.movementX}px`;
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
  data() {
    return {
      visible: false,
      onfocus: false,
      pinned: false,
      topArrowLeftOffset: 0,
      popupLeftOffset: 0,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  updated() {
    if (this.visible && !this.onfocus) {
      this.alignPosition();
      this.$refs.popup.focus();
      // here we can be sure that the slot contents are also available
      this.$emit('input', true);
    } else if (!this.visible) {
      this.pinned = false;
    }
  },
};
</script>

<style lang="scss">
.popup {
  position: absolute;
  background: #ffffff;
  box-shadow: 0 0 3px 1px rgba(81,82,84,0.23);
  z-index: 999;
  border-radius: 5px;
  outline: none;

  .popup_pin {
    margin: 13px;
    float: right;
    background: url('../assets/16x16-sprite.png') no-repeat -841px 0;
    width: 16px;
    height: 16px;

    &.pinned {
      width: 100%;
      background: #ebebeb;
      margin: 0px;
      border-radius: 5px 5px 0px 0px;
      height: 18px;
      position: absolute;
      cursor: move;
    }
  }

  .popup_arrow {
    position: absolute;

    &.top {
      top: -8px;
      .popup_arrow_border {
        height: 0;
        width: 0;
        overflow: hidden;
        position: absolute;
        top: -2px;
        left: 0;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent rgba(81, 82, 84, 0.25) transparent;
      }

      .popup_arrow_body {
        height: 0;
        width: 0;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #ffffff transparent;
      }
    }
  }
}
</style>
