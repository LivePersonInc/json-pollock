<template>
  <div class='message'>
    <div v-for="(msg, index) in messages" :key="index" :class="msg.type">
      {{msg.text}}
    </div>
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
    z-index: 999;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    position: absolute;
    bottom: 11px;
    left: 11px;

    .error {
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
      padding: 10px;
    }

    .success {
      color: #3c763d;
      background-color: #dff0d8;
      border-color: #d6e9c6;
      padding: 10px;
    }
  }
</style>
