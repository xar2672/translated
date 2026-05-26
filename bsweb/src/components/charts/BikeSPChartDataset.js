import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const defaultDataset = (data) => {
    return {
        name: 'BikeSP',
        series: data.map(obj => obj['value']),
        type: 'bar',
        shape: 'circle',
        useArea: false,
        useProgression: false,
        dataLabels: true,
        smooth: true,
        dashed: false,
        useTag: 'none'
    };
};

function filterValues(data, labels, shouldIncludeLabels) {
    const filterStrategy = (label) => {
        const isLabelInList = labels.includes(label);
        if (shouldIncludeLabels) {
            return isLabelInList
        }
        return !isLabelInList
    }

    const filteredValues = data.filter(obj => filterStrategy(obj['label'])).map(obj => obj['value'])
    if (!filteredValues.length) {
        return [0]
    }
    return filteredValues;
}

function buildCustomDataset(data, name, filterLabels, color, shouldIncludeLabels = true) {
    return {
        ...defaultDataset(data),
        name: name,
        series: filterValues(data, filterLabels, shouldIncludeLabels),
        color: color,
    }
}

const getGenderLabel = (value) => {
  return t(`bikesp.gender.${value}`)
}
function buildGenderDataset(data) {
    return computed(() => [
        buildCustomDataset(data, getGenderLabel('feminine'), ['F'], 'd5a6bd'),
        buildCustomDataset(data, getGenderLabel('masculine'), ['M'], '6fa8dc'),
        buildCustomDataset(data, getGenderLabel('nonBinary'), ['NB'], 'FFF430'),
        buildCustomDataset(data, getGenderLabel('na'), ['NA'], '808080'),
    ]);
};

const getRaceLabel = (value) => {
  return t(`bikesp.race.${value}`)
}
function buildRaceDataset(data) {
    return computed(() => [
        buildCustomDataset(data, getRaceLabel('asian'), ['Amarela'], 'FFF430'),
        buildCustomDataset(data, getRaceLabel('white'), ['Branca'], 'C9DAF8'),
        buildCustomDataset(data, getRaceLabel('brown'), ['Parda'], 'B97A57'),
        buildCustomDataset(data, getRaceLabel('indigenous'), ['Indígena'], 'FFD700'),
        buildCustomDataset(data, getRaceLabel('black'), ['Preta'], '000000'),
        buildCustomDataset(data, getRaceLabel('na'), ['Prefiro nã'], 'A9A9A9'),
    ]);
};

function colorForValue(value) {
    return (value * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function buildPayoutLevelDataset(data) {
    const availablePayoutLevels = data.map(obj => obj['label']);
    return availablePayoutLevels.map( value => 
        buildCustomDataset(data, `R$ ${value}`, [value], colorForValue(value)));
};

function buildHourDataset(data) {
    const hours = [...Array(24).keys()]

    const valuesByHour =  Object.fromEntries(data.map(item => [item.label, item.value]));

    const filledSeries = hours.map(hour => valuesByHour[hour] ?? 0);

    return [{
        ...defaultDataset(data, true),
        series: filledSeries,
        name: t('bikesp.aggregation.HOUR')
    }]
};

function buildDayOfWeekDataset(data) {
    const days = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];
    return days.map( (dayName, index) => 
        buildCustomDataset(data, dayName, [index], colorForValue(index/days.length)));
};

function buildRemunerationDataSet(data) {
    const remuneration = [
        `${t('max')} R$ 820`,
        `${t('from')} R$ 821 ${t('max')} R$ 1.640`,
        `${t('from')} R$ 1.641 ${t('max')} R$ 3.280`,
        `${t('from')} R$ 3.281 ${t('max')} R$ 4.920`,
        `${t('from')} R$ 4.921 ${t('max')} R$ 8.200`,
        `${t('from')} R$ 8.201 ${t('max')} R$ 16.400`,
        `${t('from')} R$ 16.401 ${t('max')} R$ 32.800`,
        `${t('more_than')} R$ 32.800`
    ];

    return remuneration.map( (rem, index) => 
        buildCustomDataset(data, rem, [rem], colorForValue(Math.random())));
};

const datasets = {
    GENDER: buildGenderDataset,
    RACE: buildRaceDataset,
    PAYOUT_LEVEL: buildPayoutLevelDataset,
    HOUR: buildHourDataset,
    DAY_OF_WEEK: buildDayOfWeekDataset,
    REMUNERATION: buildRemunerationDataSet,
}

export function getDataset(state) {
    const dataset = datasets[state.activeDataConfig.aggregation];

    if (!dataset) {
        return [defaultDataset(state.data)];
    }
    return dataset(state.data);
}
