<template>
  <div
    v-if="isOpen"
    :class="`modal-overlay ${isActive?'modal-overlay--active':''}`"
    @click.self="close()"
  >
    <div class="modal-wrapper">
      <div class="close-modal-wrapper">
        <img
          class="close-modal" :src="iconClose" @click="close"
        >
      </div>
      <slot :close="close" />
    </div>
    <slot name="child" />
  </div>
</template>

<script>
import iconClose from '@/assets/svg/icon-close.svg';

export default {
  name: 'Modal',
  props: {
    name: { type: String, required: true },
  },
  data() {
    return {
      iconClose,
    };
  },
  computed: {
    isActive() {
      return this.$store.getters['modals/active'] === this.name;
    },
    isOpen() {
      return this.$store.getters['modals/allOpen'].includes(this.name);
    },
  },
  beforeDestroy() {
    if (this.isOpen) this.close();
  },
  methods: {
    close() {
      this.$store.dispatch('modals/close', this.name);
    },
  },
};
</script>

<style scoped>
	*:focus {
		outline: none;
	}
	.modal-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: opacity 0.3s ease-in-out;
		width: 100%;
		z-index: 2000;
	}
	.modal-overlay--active {
		background-color: rgba(0, 0, 0, 0.4);
	}
	.modal-wrapper {
		background-color: #fff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		padding: 20px;
		transition: all 0.3s ease;
		height: 80%;
		max-width: 75%;
		width: 100%;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
	}
	.close-modal {
		width: 16px;
		cursor: pointer;
	}
	.close-modal-wrapper {
		display: flex;
		justify-content: flex-end;
		padding-bottom: 10px;
	}
</style>