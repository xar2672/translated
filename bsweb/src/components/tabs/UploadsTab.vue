<template>
  <div class="wrapper">
    <p>{{ $t('tabs.upload.title') }}</p>
    <p class="text">
      {{ $t('tabs.upload.text') }}:
      <ul>
        <li v-for="extension in $tm('tabs.upload.extensions')" :key="extension">
          {{ extension }}
        </li>
      </ul>
    </p>
    <form @submit.prevent="submitFiles">
      <div class="file-btn-wrapper">
        <input
          id="files"
          type="file"
          multiple
          @change="onFileChange"
        >
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.name') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="name"
            type="text"
            class="input is-info is-small"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.width') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="weight"
            type="number"
            class="input is-info is-small"
            min="0"
            step="0.1"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label">{{ $t('tabs.upload.inputs.opacity') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="opacity"
            type="number"
            class="input is-info is-small"
            min="0"
            max="1"
            step="0.01"
          >
        </div>
      </div>

      <div class="columns">
        <div class="column label-wrapper">
          <label class="custom-label" title="Cor em hexadecimal">{{ $t('tabs.upload.inputs.color') }}</label>
        </div>
        <div class="column is-two-thirds is-flex is-align-items-center">
          <input
            v-model="color"
            type="text"
            class="input is-info is-small"
          >
        </div>
      </div>
      <div class="center">
        <button type="submit" class="custom-btn">
          {{ $t('tabs.upload.button') }}
        </button>
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const type = ref('layer');
const name = ref('');
const weight = ref(3);
const opacity = ref(0.9);
const color = ref('#ff0000');
const files = ref(null);
const error = ref(null);
const fileType = ref(null);

const secondMapIsActive = computed(() => store.getters['map/secondMapIsActive']);
const mirrorControl = computed({
  get: () => store.state.layers.mirrorControl,
  set: () => toggleMirrorLayerControl(),
});

const toggleMirrorLayerControl = () => {
  store.dispatch('layers/toggleMirrorLayerControl');
};
const setHideSecondMapLayerControl = () => {
  store.dispatch('layers/setHideSecondMapLayerControl');
};
const shapefileToGeoJson = (payload) => {
  store.dispatch('user_shapefiles/shapefileToGeoJson', payload);
};

const onFileChange = (e) => {
  error.value = null;
  const selectedFiles = e.target.files || e.dataTransfer.files;
  if (selectedFiles && !selectedFiles.length) {
    error.value = 'Você deve adicionar @@@';
    // error.value = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx';
    return;
  }
  files.value = selectedFiles;
  validateFiles();
};

const submitFiles = () => {
  error.value = null;
  const filesValidationResult = validateFiles();
  const fieldsValidationResult = validateFields();
  if (!filesValidationResult || !fieldsValidationResult) return;

  const formData = new FormData();

  if (fileType.value === 'shp') {
    const cpg = [...files.value].filter(n => /.+\.cpg$/.test(n.name))[0];
    const dbf = [...files.value].filter(n => /.+\.dbf$/.test(n.name))[0];
    const shp = [...files.value].filter(n => /.+\.shp$/.test(n.name))[0];
    const shx = [...files.value].filter(n => /.+\.shx$/.test(n.name))[0];
    formData.append('cpg', cpg);
    formData.append('dbf', dbf);
    formData.append('shp', shp);
    formData.append('shx', shx);
  } else if (fileType.value === 'kmz') {
    const kmz = files.value[0];
    formData.append('kmz', kmz);
  } else if (fileType.value === 'zip') {
    const zip = files.value[0];
    formData.append('zip', zip);
  }

  const props = {
    style: {
      opacity: opacity.value,
      color: color.value,
      weight: weight.value,
    },
    name: name.value,
  };

  shapefileToGeoJson({ formData, props, fileType: fileType.value });
};

// Erros
const validateFiles = () => {
  if (!files.value || ![1, 4].includes(files.value.length)) {
    error.value = 'Você deve adicionar @@@';
    // error.value = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx.';
    files.value = null;
    return false;
  }

  if (files.value.length == 1) {
    if (!['.kmz', '.zip'].some(n => files.value[0].name.includes(n))) {
      error.value = 'Formato de arquivo inválido';
      files.value = null;
      return false;
    }
    if (files.value[0].name.includes('.kmz'))
      fileType.value = 'kmz';
    else fileType.value = 'zip';
  } else { // Shapefile (cpg, dbf, shp, shx)
    const fileName = files.value[0].name.match('(.*)\\.')[1];
    [...files.value].forEach(file => {
      const name = file.name.match('(.*)\\.')[1];
      if (name !== fileName) {
        error.value = 'Os arquivos de um shapefile devem ter o mesmo nome.';
        files.value = null;
        return false;
      }
    });

    const extensions = ['.cpg', '.dbf', '.shp', '.shx'];
    for (const file of files.value) {
      const found = extensions.some(ext => file.name.includes(ext));
      if (!found) {
        error.value = 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx.';
        files.value = null;
        return false;
      }
    }
    fileType.value = 'shp';
  }

  error.value = null;
  return true;
};

const validateFields = () => {
  if (name.value.length === 0) {
    error.value = 'Nome é obrigatório.';
    return false;
  }
  if (weight.value.length === 0) {
    error.value = 'Espessura é obrigatória.';
    return false;
  }
  if (opacity.value.length === 0) {
    error.value = 'Opacidade é obrigatória.';
    return false;
  }
  if (color.value.length === 0) {
    error.value = 'Cor é obrigatória.';
    return false;
  }
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(color.value)) {
    error.value = 'Cor deve ser informada em hexadecimal, por exemplo #ffffff.';
    return false;
  }
  return true;
};
</script>

<style scoped>
.label-wrapper {
  display: flex;
  justify-content: right;
  display: flex;
  align-items: center;
}
.custom-label {
  font-size: 12px;
  width: fit-content;
  text-align: right !important;
}

.field-label {
  text-align: right;
  width: 300px;
}
.view-option {
  font-size: 12px;
}
.file-btn-wrapper {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-btn {
  cursor: pointer;
  border: 1px solid #167df0;
  border-radius: 5px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0 5px;
  font-size: 12px;
  color: #167df0;
  height: 18px;
  background-color: #fff
}
.custom-btn:hover {
  color: #363636;
  background-color: #ddd;
}
.error {
  color: red;
  font-size: 12px;
}

p.text {
  font-size: 12px;
}

ul {
  list-style: disc;
  margin: 0 22px;
}
</style>