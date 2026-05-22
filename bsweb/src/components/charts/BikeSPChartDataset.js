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

function buildGenderDataset(data) {
    return [
        buildCustomDataset(data, 'Feminino', ['F'], 'd5a6bd'),
        buildCustomDataset(data, 'Masculino', ['M'], '6fa8dc'),
        buildCustomDataset(data, 'Não binários', ['NB'], 'FFF430'),
        buildCustomDataset(data, 'NA', ['NA'], '808080'),
    ]
};
//CHANGE?
function buildRaceDataset(data) {
    return [
        buildCustomDataset(data, 'Amarela', ['Amarela'], 'FFF430'),
        buildCustomDataset(data, 'Branca', ['Branca'], 'C9DAF8'),
        buildCustomDataset(data, 'Parda', ['Parda'], 'B97A57'),
        buildCustomDataset(data, 'Indígena', ['Indígena'], 'FFD700'),
        buildCustomDataset(data, 'Preta', ['Preta'], '000000'),
        buildCustomDataset(data, 'NA', ['Prefiro nã'], 'A9A9A9'),
    ]
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
        name: 'Hora do dia'
    }]
};

function buildDayOfWeekDataset(data) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return days.map( (dayName, index) => 
        buildCustomDataset(data, dayName, [index], colorForValue(index/days.length)));
};

function buildRemunerationDataSet(data) {
    const remuneration = [
        "até R$ 820",
        "entre R$ 821 e R$ 1.640",
        "entre R$ 1.641 e R$ 3.280",
        "entre R$ 3.281 e R$ 4.920",
        "entre R$ 4.921 e R$ 8.200",
        "entre R$ 8.201 e R$ 16.400",
        "entre R$ 16.401 e R$ 32.800",
        "mais de R$ 32.800"
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
