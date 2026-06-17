<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.filters.main.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.filters.main.title')"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.filters.option1.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.filters.option1.title')"
        :handle-click="() => copyTo('second')"
      />
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.filters.option2.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.filters.option2.title')"
        :handle-click="() => copyTo('main')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/buttons/Button.vue';

export default {
  components: {
    Button,
  },
  data() {
    return {
      copying: false,
    };
  },
  computed: {
    ...mapGetters(['secondMapIsActive']),
  },
  methods: {
    ...mapActions(['copySelectedFiltersTo']),
    copyTo(mapkey) {
      this.copySelectedFiltersTo(mapkey);
      this.copying = false;
    },
    activate() {
      this.copying = true;
    },
  },
};
</script>

<style scoped>
</style>