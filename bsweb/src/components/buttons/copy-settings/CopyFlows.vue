<template>
  <div v-if="secondMapIsActive">
    <div v-if="!copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.flows.main.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.flows.main.title')"
        :handle-click="activate"
      />
    </div>
    <div v-if="copying">
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.flows.option1.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.flows.option1.title')"
        :handle-click="() => copyTo('second')"
      />
      <Button
        :text="$t('BIKESCIENCEWEB.twoMaps.copy.flows.option2.button')"
        :title="$t('BIKESCIENCEWEB.twoMaps.copy.flows.option2.title')"
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
    ...mapActions('flows', ['copySelectedFlowsTo']),
    copyTo(mapkey) {
      this.copySelectedFlowsTo(mapkey);
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