<template>
  <div>
    <div class="slider-container">
      <span class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridOptions.size') }}</span>
      <b-slider
        v-model="gridSize"
        type="is-success"
        size="is-small"
        :min="10"
        :max="100"
        :step="10"
        :tooltip="true"
        lazy
      />
      <div class="value">
        {{ gridSize }}
      </div>
    </div>
    <div class="slider-container">
      <span class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridOptions.west') }}</span>
      <b-slider
        v-model="grid_west"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">
        {{ grid_west }}
      </div>
    </div>
    <div class="slider-container">
      <span class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridOptions.east') }}</span>
      <b-slider
        v-model="grid_east"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">
        {{ grid_east }}
      </div>
    </div>
    <div class="slider-container">
      <span class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridOptions.north') }}</span>
      <b-slider
        v-model="grid_north"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">
        {{ grid_north }}
      </div>
    </div>
    <div class="slider-container">
      <span class="label">{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.gridOptions.south') }}</span>
      <b-slider
        v-model="grid_south"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">
        {{ grid_south }}
      </div>
    </div>
    <div class="center">
      <div class="get-flows-button" @click="getFlows()">
        <span>{{ $t('BIKESCIENCEWEB.tabs.filters.baseLayerMap.buttons.getFlows' ) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    mapkey: { type: String, required: true },
  },
  computed: {
    gridSize: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridSize;
      },
      set(gridSize) {
        this.updateGridSize({ gridSize, mapkey: this.mapkey });
        this.reloadGrid();
      },
    },
    gridOffset: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridOffset;
      },
    },
    grid_west: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridOffset.west;
      },
      set(value) {
        this.updateGridOffset({ key: 'west', value: Number(value), mapkey: this.mapkey });
      },
    },
    grid_east: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridOffset.east;
      },
      set(value) {
        this.updateGridOffset({ key: 'east', value: Number(value), mapkey: this.mapkey });
      },
    },
    grid_north: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridOffset.north;
      },
      set(value) {
        this.updateGridOffset({ key: 'north', value: Number(value), mapkey: this.mapkey });
      },
    },
    grid_south: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridOffset.south;
      },
      set(value) {
        this.updateGridOffset({ key: 'south', value: Number(value), mapkey: this.mapkey });
      },
    },
    ...mapGetters({
      filterParams: 'filters',
    }),
  },
  watch: {
    gridOffset: function() {
      this.reloadGrid();
    },
  },
  methods: {
    getFlows() {
      this.setLoading();
      this.resetMapResource({ mapkey: 'main', category: 'flows', type: 'polyline' });
      this.filterData(this.mapkey)
        .finally(() => {
          this.unsetLoading();
        });
      this.setGridEditModeOff(this.mapkey);
    },
    reloadGrid() {
      this.setLoading();
      this.fetchGrid(this.mapkey)
        .finally(() => {
          this.unsetLoading();
        });
    },
    ...mapActions([
      'filterData',
      'fetchZones',
      'fetchGrid',
      'resetMapResource',
      'updateGridSize',
      'updateGridOffset',
      'setGridEditModeOff',
    ]),
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
  },
};
</script>

<style scoped>
.value {
  min-width: 46px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: .85rem;
}
.slider-container {
  display: flex;
  margin: 0px 40px 0px 30px;
  align-items: center;
  height: 28px;
}

.label {
  min-width: 72px;
  font-weight: normal;
  font-size: .85rem;
}

.get-flows-button {
  cursor: pointer;
  border: 1px solid #167df0;
  border-radius: 5px;
  width: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 20px;
  padding: 2px 10px;
  font-size: .9rem;
  color: #167df0;
}
.get-flows-button:hover {
  color: #363636;
  background-color: #ddd;
}
</style>