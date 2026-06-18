import iconCptmUrl from '@/assets/svg/icon-cptm.svg';
import iconMetroUrl from '@/assets/svg/icon-metro.svg';
import L from 'leaflet';

import { watch } from 'vue';
import { i18n } from '../../main.js';

const formatter = {year: 'numeric', month: 'long', day: 'numeric'};
const capitalize = (sentence) => {
  return sentence
    .toLowerCase()
    .replace(/(?<=^|[\s\p{Pd}])\p{L}/gu, match => match.normalize("NFC").toLocaleUpperCase('pt-BR'));
};
const minPopUp = {maxWidth: 600, minWidth: 100, autoPan: true};

const cptmIcon = new L.Icon({
  iconSize: [11, 11],
  popupAnchor: [0, -10],
  iconUrl: iconCptmUrl,
});

const metroIcon = new L.Icon({
  iconSize: [11, 11],
  popupAnchor: [0, -10],
  iconUrl: iconMetroUrl,
});

export const railway_station = {
  onEachFeature: function (feature, layer) {
    const station = capitalize(String(feature.properties.etr_nome));
    feature.properties.translationData = {
      main_key: 'BIKESCIENCEWEB.maps.toolTips.helpers.railway_station',
      line_key: `BIKESCIENCEWEB.maps.toolTips.helpers.railwayLines.${feature.properties.etr_linha}`,
      station_value: station
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const line = i18n.global.t(feature.properties.translationData.line_key);
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.main_key, { 
          line: line, 
          name: station 
        });
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: cptmIcon });
  },
};
export const railway_line = {
  onEachFeature: function (feature, layer) {
    feature.properties.translationData = {
      main_key: 'BIKESCIENCEWEB.maps.toolTips.helpers.railway_line',
      line_key: `BIKESCIENCEWEB.maps.toolTips.helpers.railwayLines.${feature.properties.ltr_nome}`,
      line_number: feature.properties.ltr_numero
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const ltr_name = i18n.global.t(feature.properties.translationData.line_key);
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.main_key, { 
          num: feature.properties.translationData.line_number, 
          name: ltr_name 
        });
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
};

export const subway_station = {
  onEachFeature: function (feature, layer) {
    const station = capitalize(String(feature.properties.emt_nome));
    feature.properties.translationData = {
      main_key: 'BIKESCIENCEWEB.maps.toolTips.helpers.subway_station',
      line_key: `BIKESCIENCEWEB.maps.toolTips.helpers.subwayLines.${feature.properties.emt_linha}`,
      station_value: station,
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const emt_line = i18n.global.t(feature.properties.translationData.line_key);
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.main_key, { 
          line: emt_line, 
          name: station 
        });
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: metroIcon });
  },
};
export const subway_line = {
  onEachFeature: function (feature, layer) {
    feature.properties.translationData = {
      main_key: 'BIKESCIENCEWEB.maps.toolTips.helpers.subway_line',
      line_key: `BIKESCIENCEWEB.maps.toolTips.helpers.subwayLines.${feature.properties.lmt_nome}`,
      line_number: feature.properties.lmt_linha,
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const ltr_name = i18n.global.t(feature.properties.translationData.line_key);
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.main_key, { 
          num: feature.properties.translationData.line_number, 
          name: ltr_name 
        });
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
};

export const bikeLane = {
  onEachFeature: function (feature, layer) {
    const [year, month, day] = feature.properties.inaugur.split('-');
    const extension = feature.properties.extensao_c;
    const nome = feature.properties.nome;

    feature.properties.translationData = {
      key: 'BIKESCIENCEWEB.maps.toolTips.helpers.bikeLane', 
      year, month, day, nome, extension
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const longFormatter = new Intl.DateTimeFormat(i18n.global.locale.value, formatter);
        const newDate = longFormatter.format(new Date(feature.properties.translationData.year, feature.properties.translationData.month, feature.properties.translationData.day));
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.key, {name: feature.properties.translationData.nome, extension: feature.properties.translationData.extension, date: newDate}, feature.properties.translationData.extension);
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
};

export const accidents = {
  onEachFeature: function (feature, layer) {
    const [year, month, day] = data_acidente.split('-');
    
    const {
      automovel,
      bicicleta,
      caminhao,
      motocicleta,
      onibus,
      pedestre,
      data_acidente
    } = feature.properties;
    let modais = [
      { type: 'automobile', val: automovel },
      { type: 'bicycle', val: bicicleta },
      { type: 'truck', val: caminhao },
      { type: 'motorcycle', val: motocicleta },
      { type: 'bus', val: onibus },
      { type: 'pedestrian', val: pedestre },
    ];

    feature.properties.translationData = {
      key: 'BIKESCIENCEWEB.maps.toolTips.helpers.accidents',
      key_modal: 'BIKESCIENCEWEB.maps.toolTips.helpers.accidentModals', 
      year, month, day, modais
    };

    const popupContent = document.createElement('div');
    let unwatch = null;

    layer.on('popupopen', () => {
      const updateTranslation = () => {
        const longFormatter = new Intl.DateTimeFormat(i18n.global.locale.value, formatter);
        const newDate = longFormatter.format(new Date(feature.properties.translationData.year, feature.properties.translationData.month, feature.properties.translationData.day));

        modais = modais.filter(item => item.val > 0).map(item => i18n.global.t(`${feature.properties.translationData.key_modal}.${item.type}`));

        const num = modais.length;
        const listFormat = new Intl.ListFormat(i18n.global.locale.value, {
          style: "long",
          type: "conjunction",
        });

        modais = listFormat.format(modais);
        popupContent.innerHTML = i18n.global.t(feature.properties.translationData.key, {date: newDate, modal: modais}, num);
        layer.getPopup().update();
      };

      updateTranslation();
      unwatch = watch(
        () => i18n.global.locale.value, 
        () => {
          updateTranslation();
        }
      );
    });

    layer.on('popupclose', () => {
      if (unwatch) {
        unwatch();
        unwatch = null;
      }
    });

    layer.bindPopup(popupContent, minPopUp);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, { radius: 3, opacity: 0.6, fillOpacity: 0.6, fillColor: '#bb0000', color: '#bb0000' });
  },
};
