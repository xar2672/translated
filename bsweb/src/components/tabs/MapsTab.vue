<template>
  <div>
    <BaseLayer mapkey="main" />
    <BaseLayer mapkey="second" />
    <ODSelection mapkey="main" />
    <ODSelection mapkey="second" />
    <p class="title-options">
      {{ $t('BIKESCIENCEWEB.tabs.maps.title') }}
    </p>
    <div class="my-1">
      <b-field>
        <b-checkbox v-model="secondMapIsActive" type="is-info" size="is-small">
          <span class="view-option">{{ $t('BIKESCIENCEWEB.tabs.maps.action') }}</span>
        </b-checkbox>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseLayer from '@/components/filters/BaseLayer.vue';
import ODSelection from '@/components/filters/ODSelection.vue';

export default {
  components: {
    BaseLayer,
    ODSelection,
  },
  computed: {
    ...mapGetters(['secondMapIsActive', 'centerMain', 'centerSecond']),
    secondMapIsActive: {
      get() {
        return this.$store.state.map.secondMapIsActive;
      },
      set() {
        this.toggleSecondMap();
      },
    },
  },
  methods: {
    ...mapActions(['toggleSecondMap']),
  },
};
</script>

<style scoped>
.title-options {
  font-size: .9rem;
  font-weight: bold;
}
.view-option {
  font-size: .9rem;
}
</style>
