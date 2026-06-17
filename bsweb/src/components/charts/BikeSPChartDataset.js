import { i18n } from '../../main.js';

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
        return !isLabelInList;
    }

    const filteredValues = data.filter(obj => filterStrategy(obj['label'])).map(obj => obj['value']);
    if (!filteredValues.length) {
        return [0];
    }
    return filteredValues;
}

function buildCustomDataset(data, name, filterLabels, color, shouldIncludeLabels = true) {
    return {
        ...defaultDataset(data),
        name: name,
        series: filterValues(data, filterLabels, shouldIncludeLabels),
        color: color,
    };
}

const getGenderLabel = (value) => i18n.global.t(`BIKESP.filters.gender.genderList.${value}`);
function buildGenderDataset(data) {
    return [
        buildCustomDataset(data, getGenderLabel('feminine'), ['F'], 'd5a6bd'),
        buildCustomDataset(data, getGenderLabel('masculine'), ['M'], '6fa8dc'),
        buildCustomDataset(data, getGenderLabel('nonBinary'), ['NB'], 'FFF430'),
        buildCustomDataset(data, getGenderLabel('na'), ['NA'], '808080'),
    ];
};

const getRaceLabel = (value) => i18n.global.t(`BIKESP.filters.race.raceList.${value}`);
function buildRaceDataset(data) {
    return [
        buildCustomDataset(data, getRaceLabel('asian'), ['Amarela'], 'FFF430'),
        buildCustomDataset(data, getRaceLabel('white'), ['Branca'], 'C9DAF8'),
        buildCustomDataset(data, getRaceLabel('brown'), ['Parda'], 'B97A57'),
        buildCustomDataset(data, getRaceLabel('indigenous'), ['Indígena'], 'FFD700'),
        buildCustomDataset(data, getRaceLabel('black'), ['Preta'], '000000'),
        buildCustomDataset(data, getRaceLabel('na'), ['Prefiro nã'], 'A9A9A9'),
    ];
};

function colorForValue(value) {
    return (value * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function buildPayoutLevelDataset(data) {
    const availablePayoutLevels = data.map(obj => obj['label']);
    return availablePayoutLevels.map( value => 
        buildCustomDataset(data, i18n.global.t('BIKESP.filters.money_value', {value: value}), [value], colorForValue(value)));
};

function buildHourDataset(data) {
    const hours = [...Array(24).keys()];

    const valuesByHour =  Object.fromEntries(data.map(item => [item.label, item.value]));

    const filledSeries = hours.map(hour => valuesByHour[hour] ?? 0);

    return [{
        ...defaultDataset(data, true),
        series: filledSeries,
        name: i18n.global.t('BIKESP.filters.aggregation.HOUR')
    }];
};

function buildDayOfWeekDataset(data) {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => i18n.global.t(`BIKESP.filters.day_week.weekDays.${day}`));
    return days.map( (dayName, index) => 
        buildCustomDataset(data, dayName, [index], colorForValue(index/days.length)));
};

function buildRemunerationDataSet(data) {
    const remuneration = [
        [-1, 820],
        [821, 1640],
        [1641, 3280],
        [3281, 4920],
        [4921, 8200],
        [8201, 16400],
        [16401, 32800],
        [32800, -1]
    ];

    const formatBRL = (val) => `R$ ${new Intl.NumberFormat('pt-BR', { useGrouping: true }).format(val)}`;
    const getHardCodedText = (min, max) => {
        if (min === -1) return `até ${formatBRL(max)}`;
        if (max === -1) return `mais de ${formatBRL(min)}`;
        return `entre ${formatBRL(min)} e ${formatBRL(max)}`;
    };

    return remuneration.map( ([min, max]) => {
        const HARDCODED = getHardCodedText(min, max);

        let label = '';
        if (min === -1) {
            label = i18n.global.t('COMMONS.income_base.max', {value: max});
        } else if (max === -1) {
            label = i18n.global.t('COMMONS.income_base.more_than', {value: min});
        } else {
            label = i18n.global.t('COMMONS.income_base.range', {min: min, max: max});
        }

        return buildCustomDataset(data, label, [HARDCODED], colorForValue(Math.random()));
    });   
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
