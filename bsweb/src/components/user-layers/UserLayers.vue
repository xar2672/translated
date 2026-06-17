<template>
  <div>
    <div class="category-wrapper">
      <div class="category-toggle" @click="toggleCategory">
        <img :src="iconArrow" :class="['arrow', { active: isActive }]">
        <h3 class="category-name">
          {{ $t('BIKESCIENCEWEB.tabs.layers.userLayers') }}
        </h3>
      </div>
      <div v-show="isActive" class="category-options">
        <div
          v-for="(layer, index) in uploadedLayers"
          :key="index"
        >
          <UserLayerController
            :index="index" :layer-name="layer.name" :mapkey="mapkey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserLayerController from './UserLayerController';
import iconArrow from '@/assets/svg/icon-arrow-dropdown.svg';

export default {
  components: {
    UserLayerController,
  },
  props: {
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      isActive: false,
      iconArrow,
    };
  },
  computed: {
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
  },
  methods: {
    toggleCategory() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.category-name {
  font-size: .9rem;
  font-weight: bold;
}
.category-wrapper{
  margin-bottom: 10px;
}
.category-toggle {
  cursor: pointer;
  display: flex;
}
.category-options {
  margin-left: 8px;
}
.arrow {
  transition: all ease-in-out 0.2s;
  transform: rotate(-90deg);
  width: 12px;
  margin-right: 4px;
}
.arrow.active {
  transform: none
}
</style>
