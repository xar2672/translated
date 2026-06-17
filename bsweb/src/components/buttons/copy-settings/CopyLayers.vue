<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.layers.main.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.layers.main.title')"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.layers.option1.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.layers.option1.title')"
        :handle-click="() => copyTo('second')"
      />
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.layers.option2.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.layers.option2.title')"
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
    ...mapActions(['copySelectedLayersTo']),
    copyTo(mapkey) {
      this.copySelectedLayersTo(mapkey);
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