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
        buildCustomDataset(data, 'Outros', ['F', 'M'], '808080', false),
    ]
};

function buildRaceDataset(data) {
    return [
        buildCustomDataset(data, 'Amarela', ['Amarela'], 'FFD966'),
        buildCustomDataset(data, 'Branca', ['Branca'], 'C9DAF8'),
        buildCustomDataset(data, 'Pardos', ['Pardos'], 'B97A57'),
        buildCustomDataset(data, 'Outros', ['Amarela', 'Branca', 'Pardos'], 'A9A9A9', false),
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

const datasets = {
    GENDER: buildGenderDataset,
    RACE: buildRaceDataset,
    PAYOUT_LEVEL: buildPayoutLevelDataset,
    HOUR: buildHourDataset,
    DAY_OF_WEEK: buildDayOfWeekDataset,
}

export function getDataset(state) {
    const dataset = datasets[state.activeDataConfig.aggregation];

    if (!dataset) {
        return [defaultDataset(state.data)];
    }
    console.log(dataset(state.data))
    return dataset(state.data);
}
