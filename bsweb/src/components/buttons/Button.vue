<template>
  <div
    class="custom-btn" :title="title" @click="handleClick"
  >
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false, default: '' },
    text: { type: String, required: true },
    handleClick: { type: Function, required: true },
  },
};
</script>

<style scoped>
.custom-btn {
  cursor: pointer;
  border: 1px solid #167df0;
  border-radius: 5px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 25px;
  padding: 0 5px;
  font-size: .85rem;
  color: #167df0;
}
.custom-btn:hover {
  color: #363636;
  background-color: #ddd;
}
</style>