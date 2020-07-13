<template>
  <div class='message'>
    <span v-for="(msg, index) in messages" :key="index" :class="msg.type">
      {{msg.text}}
    </span>
  </div>
</template>

<script>

export default {
  name: 'Message',
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.$store.watch(
      state => state.message,
      (msg) => {
        this.messages.push(msg);
        setTimeout(() => {
          this.messages.splice(this.messages.indexOf(msg), 1);
        }, 5000);
      },
    );
  },
};
</script>

<style lang="scss" scoped>
  .message {
    top: 24px;
    width: 50%;
    z-index: 999;
    position: absolute;
    left: 25%;
    text-align: center;

    .error {
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
      border-radius: 6px;
      padding: 10px;
    }

    .success {
      color: #3c763d;
      background-color: #dff0d8;
      border-color: #d6e9c6;
      border-radius: 6px;
      padding: 10px;
    }
  }
</style>
