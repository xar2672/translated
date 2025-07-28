const heatmapConfig = {
    'TOTAL_SAMPLES': {
        title: 'Total de amostras',
        gradient: {
          0.0:   '#00ccbc',  // aqua
          0.025: '#a1e6a1', // light green
          0.1: '#ffff8c',  // yellow
          0.3: '#fede5d',  // light orange
          0.5:  '#f9d057',  // warm orange
          0.7:  '#f29e2e',  // deep orange
          1.0:   '#d7191c'   // red
        },
    },
    'SAMPLE_MEAN_SPEED': {
        title: 'Velocidade média',
        gradient: {
          0.0: '#2c7bb6',  // dark blue
          0.1: '#00ccbc',  // aqua
          0.3: '#90eb9d',  // light green
          0.5: '#ffff8c', // yellow
          0.75: '#f9d057',  // warm orange
          1.0: '#d7191c'   // red
        }
    }
}


function getHeatmapConfig(data_type) {
    console.log(data_type)
    const config = heatmapConfig[data_type]
    if (!config) {
        return {gradient: { 0.0: '#2c7bb6', 1.0: '#d7191c'} }
    }

    return config
}
export { getHeatmapConfig }