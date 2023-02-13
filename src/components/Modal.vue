<template>
  <div class="vue-modal" v-show="open">
    <transition name="slide">
      <div class="veu-modal-inner">
        <div class="vue-modal-content">
          <slot />

          <div class="input-content" v-if="closeBtn">
            <input
              class="cancel-btn"
              type="button"
              value="Fechar"
              @click="$emit('close')"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    closeBtn: Boolean,
  },
};
</script>
<style scoped>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  margin-top: 50px;
  padding: 10%;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}
.cancel-btn {
  background-color: rgb(220, 214, 214);
  color: #3b3a39;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 10px auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: var(--color-primary-light);
  color: #222;
}
.cancel-btn:hover {
  background-color: var(--color-danger);
  color: rgb(241, 234, 234);
}
.input-content {
  width: 100%;
  display: flex;
}

@media (min-width: 700px) {
  .vue-modal {
    padding: 10% 30%;
  }
}
</style>
