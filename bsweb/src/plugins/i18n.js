export const messages = {
  'en': {
    appName: 'BikeScienceWeb',
    data: 'Data',
    filters: 'Filters',
    layers: 'Layers',
    maps: 'Maps',
    zones: '2017 OD Zones',
    grid: 'Grid',
    language: 'Language',
    english: 'en',
    portuguese: 'pt',
    baseLayer: 'Base layer',
    noFilters: 'No filters added yet.',
    noLayers: 'No layers added yet.',
    timeFilters: 'Time filters',
    populationFilters: 'Demographic filters',
    tripFilters: 'Trip filters',
    geographicFilters: 'Geographic filters',
    tabs: {
      filters: 'Filters',
      layers: 'Layers',
      layersTab: {
        userLayers: 'User layers',
      },
      maps: {
        title: 'Multiple maps action',
        action: 'Activate additional map',
        tripsSource: 'Trips data source',
      },
      upload: {
        title: 'Upload your shapefiles here',
        text: 'Accepted file extensions',
        extensions: [
          'shapefile in a .zip file',
          'shapefiles (4 files: .cpg, .dbf, .shp and .shx)',
          '.kmz',
        ],
        inputs: {
          name: 'Name',
          width: 'Width (px)',
          opacity: 'Opacity',
          color: 'Color',
        },
        button: 'Send',
      },
      flows: {
        hoverText1: 'Flows with trip count between',
        hoverText2: 'and',
        hoverText3: '',
      },
    },
    twoMaps: {
      leftMap: 'Left Map',
      rightMap: 'Right Map',
      mirroredChanges: 'Mirrored actions',
      hideRightControls: 'Hide right controls',
      independentControl: 'Move maps individually',
      sameControl: 'Move maps together',
      copy: {
        flows: {
          main: {
            button: 'Copy selected flows',
            title: 'Copy selected flows between maps',
          },
          option1: {
            button: 'From left to right',
            title: 'Copy selected flows from left map to right map',
          },
          option2: {
            button: 'From right to left',
            title: 'Copy selected flows from right map to left map',
          },
        },
        filters: {
          main: {
            button: 'Copy selected filters',
            title: 'Copy selected filters between maps',
          },
          option1: {
            button: 'From left to right',
            title: 'Copy selected filters from left map to right map',
          },
          option2: {
            button: 'From right to left',
            title: 'Copy selected filters from right map to left map',
          },
        },
        layers: {
          main: {
            button: 'Copy selected layers',
            title: 'Copy selected layers between maps',
          },
          option1: {
            button: 'From left to right',
            title: 'Copy selected layers from left map to right map',
          },
          option2: {
            button: 'From right to left',
            title: 'Copy selected layers from right map to left map',
          },
        },
      },
    },
    // Layers
    layers_highCapacityTransport: 'High capacity transports',
    layers_bikelanes: 'Bikelanes',
    layers_accidents: 'Accidents',
    spRailwayLines: 'SP Railway Lines',
    spSubwayLines: 'SP Subway Lines',
    spRailwayStations: 'SP Railway Stations',
    spSubwayStations: 'SP Subway Stations',
    spBikelanes: 'SP Bikelanes',
    sp_bikelane_ciclovia: 'Ciclovias',
    sp_bikelane_ciclofaixa: 'Ciclofaixas',
    sp_bikelane_ciclorrota: 'Ciclorrotas',
    sp_bikelane_ciclopassarela: 'Ciclopassarela',
    sp_accidents: 'Bike accidents',
    // Filters (time)
    start_time: 'Start time',
    finish_time: 'Finish time',
    weekday: 'Day of the week',
    holidays: 'Holidays',
    // Filters (trips)
    tripDistance: 'Trip distance',
    tripDuration: 'Trip duration',
    avgSpeed: 'Average speed',
    tripReason: 'Reasons for choosing bike',
    // Filters (demographic)
    sex: 'Cyclist sex',
    age: 'Cyclist age',
    income: 'Family income',
    attractors_emitters: 'Trip-attractor/emitters locations',
    // Miscellaneous
    ageField: 'Age of cyclists',
    years: 'years old',
    minutes: 'minutes',
    from: 'from',
    to: 'to',
    more_than: 'more than',
    morning: 'Morning (6:00 to 12:00)',
    afternoon: 'Afternoon (12:00 to 18:00)',
    evening: 'Evening (18:00 to 23:00)',
    specificTime: 'Specific time range',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
    filterBtn: 'Filter',
    selectTiers: 'Show flows:',
    tier: 'Tier',
    notFoundTiers: 'No results found',
    flow: 'flow | flows',
    flows: 'Flows',
    months: 'By months',
    charts: 'Charts',
    durationField: 'Trip duration',
    male: 'Men',
    female: 'Women',
    intervals: 'Intervals',
    income_brackets: 'Income brackets',
    trips: 'trips',
    attractor_info: 'The heat map indicates the neighborhoods in which bicycle trips begin or end most, for the selected filters',
    max: 'up to',
    tripSpeed: 'Trip speed',
    smallDistance: 'Short distance',
    expensiveTransport: 'Public transport too expensive',
    publicTransportStationDistance: 'Distant access to public transport',
    publicTransportSlow: 'Slow public transport',
    publicTransportDistance: 'Long trip in public transport',
    crowdedPublicTransport: 'Crowded public transport',
    fitness: 'Fitness',
    others: 'Others',
    footer: {
      about: 'About',
      userGuide: 'User guide',
      survey: 'Survey',
      devMode: 'Developer Mode',
    },
    // Grid editor
    gridOptions: {
      size: 'Size',
      west: 'West',
      east: 'East',
      north: 'North',
      south: 'South',
    },
    toastr: {
      emptyFlows: 'Flows not found. Try selecting different filters.',
    },
    buttons: {
      getFlows: 'Recalculate flows',
      gridEditMode: 'Edit grid',
    },
    onHover: {
      gridEditMode: 'Change grid settings',
    },
    aboutPage: {
      buttons: {
        about: 'About',
        features: 'Features',
        team: 'Team',
        guide: 'User Guide',
      },
    },
    bikesp: {
      date: 'Date',
      layers: 'Layers',
      filters: 'Filters',
      chooseFilter: 'Choose filter',
      removeFilter: 'Remove filter',
      apply: 'Apply',
      selected: 'Selected',
      // Data type
      dataType: {
        TRIP_COUNT: 'Number of trips',
        TRIP_DURATION: 'Average trip length (in minutes)',
        TRIP_DISTANCE: 'Average distance traveled (Km)',
        MEAN_SPEED: 'Average speed (Km/h)',
        TOTAL_SAMPLES: 'Total of samples',
        TOTAL_TRIPS: 'Total of trips',
        SAMPLE_MEAN_SPEED: 'Average sample speed (Km/h)',
      },
      changeDataType: 'Select data type', //Selecionar tipo de dado
      datatype_helper: 'Choose which metric you would prefer to view on the grapth', //Escolha qual métrica você deseja visualizar no gráfico.
      // Aggregation
      chartTitle: '{dataType} per {aggregation}',
      aggregation: {
        GENDER: 'Gender',
        RACE: 'Race/skin color',
        WEEK: 'Week',
        HOUR: 'Day hour',
        DAY_OF_WEEK: 'Weekdays',
        PAYOUT_LEVEL: 'Payout (R$/Km)',
        REMUNERATION: 'Level of income'
      },
      changeAggregation: 'Group data by', //Agrupar dados por:
      aggregation_helper: 'Choose one category to group the shown data on the graph.', //Escolha uma categoria para agrupar os dados exibidos no gráfico.
      // Map layer
      selectMapLayer: 'Select map layers', //Selecione tipos de camadas do mapa
      removeCategory: 'Remove category', //Remover categoria
      // View type
      changeViewType: 'Select view type', //Selecione o tipo de visualização
      viewtype_helper: 'Choose the preferable way to view the data.', //Escolha a forma como deseja visualizar os dados.
      map: 'Map', //Mapa
      chart: 'Chart', //Gráfico

    },
    editModal: {
      title: 'Editing layer',
      inputs: {
        name: 'Name',
        width: 'Width (px)',
        opacity: 'Opacity',
        color: 'Color',
      },
      button: 'Send',
    },
  },
  'pt-br': {
    appName: 'BikeScienceWeb',
    data: 'Dados',
    filters: 'Filtros',
    layers: 'Camadas',
    maps: 'Mapas',
    zones: 'Zonas OD 2017',
    grid: 'Grid',
    language: 'Idioma',
    english: 'en',
    portuguese: 'pt',
    baseLayer: 'Camada de visualização',
    baseLayerMap: {
      main: 'mapa da esquerda',
      second: 'mapa da direita',
    },
    noFilters: 'Nenhum filtro adicionado.',
    noLayers: 'Nenhuma camada adicionada.',
    timeFilters: 'Filtros temporais',
    populationFilters: 'Filtros demográficos',
    tripFilters: 'Filtros de viagem',
    geographicFilters: 'Filtros geográficos',
    tabs: {
      filters: 'Filtros',
      layers: 'Camadas',
      layersTab: {
        userLayers: 'Camadas do usuário',
      },
      maps: {
        title: 'Opções para múltiplos mapas',
        action: 'Ativar mapa adicional',
        tripsSource: 'Origem dos dados das viagens',
      },
      upload: {
        title: 'Suba aqui seus arquivos georeferrenciados',
        text: 'Formatos de arquivos aceitos',
        extensions: [
          'shapefile em um arquivo .zip',
          'shapefile (4 arquivos: .cpg, .dbf, .shp e .shx)',
          '.kmz',
        ],
        inputs: {
          name: 'Nome',
          width: 'Espessura (px)',
          opacity: 'Opacidade',
          color: 'Cor',
        },
        button: 'Enviar',
      },
      flows: {
        hoverText1: 'Fluxos contendo entre',
        hoverText2: 'e',
        hoverText3: 'viagens',
      },
    },
    twoMaps: {
      leftMap: 'Mapa da Esquerda',
      rightMap: 'Mapa da Direita',
      mirroredChanges: 'Espelhar alterações',
      hideRightControls: 'Ocultar controles da direita',
      independentControl: 'Mover os mapas separadamente',
      sameControl: 'Mover os mapas simultaneament',
      copy: {
        flows: {
          main: {
            button: 'Copiar fluxos selecionados',
            title: 'Copiar fluxos entre os mapas',
          },
          option1: {
            button: 'Da esquerda para a direita',
            title: 'Copiar fluxos selecionados do mapa da esquerda para o da direita',
          },
          option2: {
            button: 'Da direita para a esquerda',
            title: 'Copiar fluxos selecionados do mapa da direita para o da esquerda',
          },
        },
        filters: {
          main: {
            button: 'Copiar filtros selecionados',
            title: 'Copiar filtros entre os mapas',
          },
          option2: {
            button: 'Da esquerda para a direita',
            title: 'Copiar filtros selecionados do mapa da esquerda para o da direita',
          },
          option1: {
            button: 'Da direita para a esquerda',
            title: 'Copiar filtros selecionados do mapa da direita para o da esquerda',
          },
        },
        layers: {
          main: {
            button: 'Copiar camadas selecionadas',
            title: 'Copiar camadas entre os mapas',
          },
          option1: {
            button: 'Da esquerda para a direita',
            title: 'Copiar camadas selecionadas do mapa da esquerda para o da direita',
          },
          option2: {
            button: 'Da direita para a esquerda',
            title: 'Copiar camadas selecionadas do mapa da direita para o da esquerda',
          },
        },
      },
    },
    // Layers
    layers_highCapacityTransport: 'Transportes de alta capacidade',
    layers_bikelanes: 'Infraestrutura cicloviária',
    layers_accidents: 'Ocorrências de trânsito',
    spRailwayLines: 'Linhas da CPTM',
    spSubwayLines: 'Linhas do Metrô',
    spRailwayStations: 'Estações da CPTM',
    spSubwayStations: 'Estações do Metrô',
    spBikelanes: 'Malha cicloviária',
    sp_bikelane_ciclovia: 'Ciclovias',
    sp_bikelane_ciclofaixa: 'Ciclofaixas',
    sp_bikelane_ciclorrota: 'Ciclorrotas',
    sp_bikelane_ciclopassarela: 'Ciclopassarela',
    sp_accidents: 'Ocorrências com bicicletas',
    // Filters (time)
    start_time: 'Horário de início',
    finish_time: 'Horário de término',
    weekday: 'Dia da semana',
    holidays: 'Feriados',
    // Filters (trips)
    tripDistance: 'Distância média',
    tripDuration: 'Duração média',
    avgSpeed: 'Velocidade média',
    tripReason: 'Motivos da viagem',
    // Filters (demographic)
    sex: 'Sexo',
    age: 'Idade',
    income: 'Renda familiar',
    // Filters (others)
    attractors_emitters: 'Regiões atratores e emissoras de viagens',
    // Miscellaneous
    ageField: 'Faixa etária dos ciclistas',
    years: 'anos',
    minutes: 'minutos',
    from: 'de',
    to: 'a',
    more_than: 'mais de',
    intervals: 'Intervalos',
    income_brackets: 'Faixas de renda',
    morning: 'Manhã (6h a 12h)',
    afternoon: 'Tarde (12h a 18h)',
    evening: 'Noite (18h a 23h)',
    specificTime: 'Horário específico',
    mon: 'Segunda-feira',
    tue: 'Terça-feira',
    wed: 'Quarta-feira',
    thu: 'Quinta-feira',
    fri: 'Sexta-feira',
    sat: 'Sábado',
    sun: 'Domingo',
    filterBtn: 'Filtrar',
    selectTiers: 'Mostrar fluxos:',
    tier: 'Quartil',
    notFoundTiers: 'Nenhum resultado encontrado',
    flow: 'fluxo | fluxos',
    flows: 'Fluxos',
    months: 'Meses',
    charts: 'Gráficos',
    durationField: 'Duração da viagem',
    male: 'Homens',
    female: 'Mulheres',
    trips: 'viagens',
    attractor_info: 'O mapa de calor indica as vizinhanças nas quais as viagens de bicicletas mais começam ou terminam, dados os filtros selecionados',
    max: 'até',
    tripSpeed: 'Velocidade da viagem',
    smallDistance: 'Curta distância',
    expensiveTransport: 'Preço alto do transporte público',
    publicTransportStationDistance: 'Difícil acesso ao transporte público',
    publicTransportSlow: 'Lentidão do transporte público',
    publicTransportDistance: 'Viagem muito demorada',
    crowdedPublicTransport: 'Transporte público lotado',
    fitness: 'Atividade física',
    others: 'Outros',
    footer: {
      about: 'Sobre',
      userGuide: 'Guia do usuário',
      survey: 'Pesquisa de opinião',
      devMode: 'Modo desenvolvedor',
    },
    // Grid editor
    gridOptions: {
      size: 'Tamanho',
      west: 'Oeste',
      east: 'Leste',
      north: 'Norte',
      south: 'Sul',
    },
    toastr: {
      emptyFlows: 'Nenhum fluxo encontrado. Tente selecionar outros filtros.',
    },
    buttons: {
      getFlows: 'Recalcular fluxos',
      gridEditMode: 'Editar grid',
    },
    onHover: {
      gridEditMode: 'Alterar configurações do grid',
    },
    aboutPage: {
      buttons: {
        about: 'Sobre',
        features: 'Funcionalidades',
        team: 'Equipe',
        guide: 'Guia do Usuário',
      },
    },
    bikesp: {
      date: 'Data',
      layers: 'Camadas',
      filters: 'Filtros',
      chooseFilter: 'Escolha um filtro',
      removeFilter: 'Remover filtro',
      chooseDateofWeek: 'Escolha um dia da semana', //CHANGER HERE
      gender: {
        feminine: 'Feminino',
        masculine: 'Masculino',
        nonBinary: 'Não binários',
        na: 'Não informado',
      },
      chooseGender: 'Escolha um gênero', //CHANGE HERE
      race: {
        asian: 'Amarelo',
        black: 'Preto',
        brown: 'Pardo',
        indigenous: 'Indígena',
        na: 'Não Informado',
        white: 'Branco',
      },
      chooseRace: 'Escolha uma raça', //CHANGE HERE
      apply: 'Aplicar',
      selected: 'Selecionado',
      // Data type
      dataType: {
        TRIP_COUNT: 'Número de viagens',
        TRIP_DURATION: 'Duração média das viagens (em minutos)',
        TRIP_DISTANCE: 'Distância média percorrida (Km)',
        MEAN_SPEED: 'Velocidade média (Km/h)',
        TOTAL_SAMPLES: 'Total de amostras',
        TOTAL_TRIPS: 'Total de viagens',
        SAMPLE_MEAN_SPEED: 'Velocidade média (Km/h)',
      },
      changeDataType: 'Selecionar tipo de dado',
      datatype_helper: 'Escolha qual métrica você deseja visualizar no gráfico.',
      // Aggregation
      chartTitle: '{dataType} por {aggregation}',
      aggregation: {
        GENDER: 'Gênero',
        RACE: 'Raça/cor',
        WEEK: 'Semana',
        HOUR: 'Hora do dia',
        DAY_OF_WEEK: 'Dia da semana',
        PAYOUT_LEVEL: 'Recompensa (R$/Km)',
        REMUNERATION: 'Nível de renda'
      },
      changeAggregation: 'Agrupar dados por',
      aggregation_helper: 'Escolha uma categoria para agrupar os dados exibidos no gráfico.',
      // Map layer
      chooseMapLayer: 'Selecione as camadas do mapa', //CHANGE HERE
      selectMapLayer: 'Selecione tipos de camadas do mapa',
      removeCategory: 'Remover categoria',
      // View type
      changeViewType: 'Selecione o tipo de visualização',
      viewtype_helper: 'Escolha a forma como deseja visualizar os dados.',
      map: 'Mapa',
      chart: 'Gráfico',
    },
    editModal: {
      title: 'Editando camada',
      inputs: {
        name: 'Nome',
        width: 'Espessura (px)',
        opacity: 'Opacidade',
        color: 'Cor',
      },
      validadeModal: {
        name: 'Nome é obrigatório.',
        width: 'Espessura é obrigatória.',
        opacity: 'Opacidade é obrigatória.',
        emptyColor: 'Cor é obrigatória.',
        invalidColor: 'Cor deve ser informada em hexadecimal, por exemplo #ffffff.',
      },
      button: 'Enviar',
    },
  },
};
