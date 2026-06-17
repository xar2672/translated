export const messages = {
  'en': {
    LANGUAGE_NAME: 'English',
    FLAG_LINK: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg',

    // CHECAR COMENTÁRIOS ANTES
    //data: 'Data', //???

    COMMONS: {
      charts: 'Chart | Charts',
      filters: 'Filter | Filters',
      flows: 'Flow | Flows',
      layers: 'Layers',
      maps: 'Map | Maps',

      income_base: {
        'max': 'up to R$ {value}',
        'range': 'from R$ {min} to R$ {max}',
        'more_than': 'more than R$ {value}'
      },
      layers_filter: {
        spRailwayLines: 'SP Railway Lines',
        spSubwayLines: 'SP Subway Lines',
        spRailwayStations: 'SP Railway Stations',
        spSubwayStations: 'SP Subway Stations',

        sp_bikelane_ciclovia: 'Bike paths',
        sp_bikelane_ciclofaixa: 'Bike lanes',
        sp_bikelane_ciclorrota: 'Bike routes',
        sp_bikelane_ciclopassarela: 'Bike footbridge',

        sp_accidents: 'Bike accidents',

        cptm_lines: 'Railway lines',
        cptm_stations: 'Railway stations',
        subway_lines: 'Subway lines',
        subway_stations: 'Subway stations',
      },
    },

    BIKESCIENCEWEB: {
      appName: 'BikeScienceWeb',

      nav: {
        upload: 'Upload',
      },

      aboutPage: {
        buttons: {
          about: 'About',
          features: 'Features',
          team: 'Team',
          guide: 'User Guide',
        },
      },
      footer: {
        about: 'About',
        devMode: 'Developer Mode',
      },
      
      maps: {
        total_trips: '{total} trip | {total} trips',
        DEVELOPER_MODE_TRIPS: '{origin} -> {destination}\nids: {id}',
        
        toolTips: {
          numberZone: 'NumberZone: {numberZone}',
          nameZone: 'NameZone: {nameZone}',
          nameBorough: 'NameBorough: {nameBorough}',
          /**
           * numberRoute: 'NumeroZona: {feature.properties.NumeroZona}',
             nameZone: 'NomeZona: {feature.properties.NomeZona}',
             nameBorough: 'NomeMunici: ${feature.properties.NomeMunici}',
           */

          helpers: {
            bikeLane: '{name}<br>Extension: {extension} meter<br>Implementation date: {date} | {name}<br>Extension: {extension} meters<br>Implementation date: {date}',

            railway_line: 'Line {num} — {name}',
            railwayLines: {
              RUBI: 'Ruby',
              DIAMANTE: 'Diamond',
              ESMERALDA: 'Emerald',
              TURQUESA: 'Turquoise',
              CORAL: 'Coral',
              SAFIRA: 'Sapphire',
              JADE: 'Jade',
            },
            railway_station: 'Line {line} — {name} Station',

            subway_line: 'Line {num} — {name}',
            subwayLines: {
              AZUL: 'Blue',
              VERDE: 'Green',
              VERMELHA: 'Red',
              AMARELA: 'Yellow',
              LILAS: 'Lilac',
              PRATA: 'Silver',

              LARANJA: 'Orange',
              OURO: 'Gold',
            },
            subway_station: 'Line {line} — {name} Station',
            
            /**
             * bikeLane: '{name}<br>Extensão: {extension} metro<br>Data de implementação: {date} | {name}<br>Extensão: {extension} metros<br>Data de implementação: {date}',
             * 
             * railway_line: 'Linha {ltr_num} — {ltr_name}',
             * railwayLines: {
                RUBI: 'Rubi',
                DIAMANTE: 'Diamante',
                ESMERALDA: 'Esmeralda',
                TURQUESA: 'Turquesa',
                CORAL: 'Coral',
                SAFIRA: 'Safira',
                JADE: 'Jade',
              },
             * railway_station: 'Linha {etr_line} — {etr_name}',
              
             * subway_line: 'Linha {lmt_line} — {lmt_name}',
               subwayLines: {
                AZUL: 'Azul',
                VERDE: 'Verde',
                VERMELHA: 'Vermelha',
                AMARELA: 'Amarela',
                LILAS: 'Lilás',
                PRATA: 'Prata',

                LARANJA: 'Laranja',
                OURO: 'Ouro',
               },
             * subway_station: 'Linha {emt_line} — {emt_name}',
             * 
             * accidents: 'Data do acidente: {date}<br>Modal envolvido: {modal} | Data do acidente: {date}<br>Modais envolvidos: {modal}',
             * 
             * 
             */

            accidents: 'Date of the Accident: {date}<br>Transportation mode involved: {modal} | Date of the Accident: {date}<br>Transportation modes involved: {modal}',
            accidentModals: {
              automobile: 'automobile',
              bicycle: 'bicycle',
              bus: 'bus',
              motorcycle: 'motorcycle',
              pedestrian: 'pedestrian',
              truck: 'truck',

              /**
               * accidentModal: {
                  automobile: 'automóvel',
                  bicycle: 'bicicleta',
                  bus: 'ônibus',
                  motorcycle: 'caminhão',
                  pedestrian: 'pedestre',
                  truck: 'caminhão',
                }
               * 
               */

            },
          },
        },
      },
      tabs: {
        filters: {
          baseLayer: 'Base layer',
          baseLayerMap: {
            main: 'left map',
            second: 'right map',

            grid: 'Grid',
            zones: '2017 OD Zones',

            buttons: {
              getFlows: 'Recalculate flows',
              gridEditMode: 'Edit grid',
              onHover: {
                gridEditMode: 'Change grid settings',
              },
              gridOptions: {
                size: 'Size',
                west: 'West',
                east: 'East',
                north: 'North',
                south: 'South',
              },
            },
          },

          bikelane: {
            slider: {
              field: 'Sort by Year Implemented | Sort by Implementation Period',
              form: '{end} | {start} to {end}',
            }
          },
          
          forms: {
            aggregation: {
              category: {
                timeFilters: 'Time filters',
                populationFilters: 'Demographic filters',
                geographicFilters: 'Geographic filters',
                tripFilters: 'Trip filters',
              },
              filter: {
                months: 'By months',
                start_time: 'Start time',
                finish_time: 'Finish time',
                weekday: 'Day of the week',
                holidays: 'Holidays',

                avgSpeed: 'Average speed',
                distance: 'Trip distance',
                duration: 'Trip duration',
                reason: 'Reasons for choosing bike',

                sex: 'Cyclist sex',
                age: 'Cyclist age',
                income: 'Family income',
                attractors_emitters: 'Trip attractors/generators region',
              },
            },
            
            age: {
              field: 'Age of cyclists',
              form: '{end} year old | {end} years old | {start} to {end} years old',
            },
            attractor: {
              info:  'The heat map indicates the neighborhoods in which bicycle trips begin or end most, for the selected filters',
            },
            time: {
              morning: 'Morning (6:00 to 12:00)',
              afternoon: 'Afternoon (12:00 to 18:00)',
              evening: 'Evening (18:00 to 23:00)',
              specificTime: 'Specific time range',

              from: 'from',
              to: 'to',

              months: {
                jan: 'jan',
                feb: 'feb',
                mar: 'mar',
                apr: 'apr',
                may: 'may',
                jun: 'jun',
                jul: 'jul',
                aug: 'aug',
                sep: 'sep',
                oct: 'oct',
                nov: 'nov',
                dec: 'dec'
              },
            },
            distance: {
              form: '{end} km | {start} km to {end} km',
            },
            duration: {
              minutes: '{value} min | {value} mins',
              field: 'Trip duration',
              form: '{end} minute | {end} minutes | {start} to {end} minutes',
            },
            income: {
              field: 'Family income',
              form: 'R$ {end} | R$ {start} up to R$ {end}',
              intervals: 'Intervals',
              brackets: 'Income brackets',
            },
            reason: {
              smallDistance: 'Short distance',
              expensiveTransport: 'Public transport too expensive',
              publicTransportStationDistance: 'Distant access to public transport',
              publicTransportSlow: 'Slow public transport',
              publicTransportDistance: 'Long trip in public transport',
              crowdedPublicTransport: 'Crowded public transport',
              fitness: 'Fitness',
              others: 'Others',
            },
            sex: {
              male: 'Men',
              female: 'Women',
            },
            speed: {
              form: '{end} km/h | {start} km/h to {end} km/h',
            },
            tiers: {
              selectTiers: 'Show flows',
              notFoundTiers: 'No results found',
              emptyFlows: 'Flows not found. Try selecting different filters.',
            },
          },
        },
        layers: {
          category: {
            layers_highCapacityTransport: 'High capacity transports',
            layers_bikelanes: 'Bikelanes',
            layers_accidents: 'Accidents',
          },
          userLayers: 'User layers',
          editModal: {
            editLayer: 'Edit layer', //Editar camada
            removeLayer: 'Remove layer',
            layerEditMode: 'Editing layer {layer_name}',
          },
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
            colorToolTip: 'In hexadecimal form', //Cor em hexadecimal
          },
          validateInputs: {
            name: 'Name is required.',
            width: 'Width is required.',
            opacity: 'Opacity is required.',
            emptyColor: 'Color is required.',
            invalidColor: 'Color must be in hexadecimal form (for example: #ffffff).',

            noShapeFiles: 'Shapefiles não foram inseridos.',
            invalidFileFormat: 'Formato de arquivo inválido.',
            notSameFilesName: 'Os arquivos de um shapefile devem ter o mesmo nome.',
            cpgMissingFiles: 'Você deve adicionar 4 arquivos de um shapefile: .cpg, .dbf, .shp e .shx.',


            /**
             * 
              name: 'Nome é obrigatório',
              width: 'Espessura é obrigatória.',
              opacity: 'Opacidade é obrigatória.',
              emptyColor: 'Cor é obrigatória.',
              invalidColor: 'Cor deve ser informada em hexadecimal (#ffffff, por exemplo).', 



             * 
             */

          },

          button: 'Send',
        },
        flows: {
          hoverText: 'Flows with trip count between {min} and {max} trips',
          tierOptions: 'Tier {tier_prop}: {tier_count} flow | Tier {tier_prop}: {tier_count} flows',
        },
      },
      twoMaps: {
        leftMap: 'Left Map',
        rightMap: 'Right Map',

        mirroredChanges: 'Synchronize actions',
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
    },

    BIKESP: {
      appName: 'Bike SP Pilot - Analytics Dashboard',

      apply: 'Apply',
      selected: 'Selected',

      charts: {
        title: '{dataType} per {aggregation}',
        buttons: {
          open: 'Show options',
          close: 'Close options',
          tooltip: 'Toggle tooltip',
          pdf: 'Download PDF',
          csv: 'Download CSV',
          img: 'Download PNG',
          table: 'Toggle table',
          labels: 'Toggle labels',
          fullscreen: 'Toggle fullscreen',
          stack: 'Toggle stack mode',
          annotator: 'Toggle annotator'
          


          /**
           * 
              open: 'Abrir opções',
              close: 'Fechar opções',
              tooltip: 'Toggle tooltip',
              pdf: 'Baixar PDF',
              csv: 'Baixar CSV',
              img: 'Baixar PNG',
              table: 'Toggle table',
              labels: 'Toggle labels',
              fullscreen: 'Toggle fullscreen',
              stack: 'Toggle stack mode',
              annotator: 'Toggle annotator'
           * 
           * 
           */


        },
        table: {
          period: 'Period',
          total: 'Total'
        },
      },

      dataType: {
        changeDataType: 'Select data type',
        datatype_helper: 'Choose which metric you would prefer to view on the graph.',
        typeList: {
          TRIP_COUNT: 'Number of trips',
          TRIP_DURATION: 'Average trip length (in minutes)',
          TRIP_DISTANCE: 'Average distance traveled (km)',
          MEAN_SPEED: 'Average speed (km/h)',
          TOTAL_SAMPLES: 'Total of samples',
          TOTAL_TRIPS: 'Total of trips',
          SAMPLE_MEAN_SPEED: 'Average sample speed (km/h)',
        },
      },
      layers: {
        chooseMapLayer: 'Select map layers',
        selectMapLayer: 'Select map layer type',
        removeCategory: 'Remove category',
        category: {
          layers_highCapacityTransport: 'High-capacity public transport',
          layers_bikelanes: 'Cycling infrastructure',
          layers_accidents: 'Traffic accidents',

          /**
           * layers_highCapacityTransport: 'Transportes de alta capacidade',
             layers_bikelanes: 'Infraestrutura cicloviária',
             layers_accidents: 'Ocorrências de trânsito',
           */

        },
      },
      filters: {
        chooseFilter: 'Choose a filter',
        removeFilter: 'Remove filter',
        
        changeAggregation: 'Group data by',
        aggregation_helper: 'Choose one category to group the data shown on the graph.',
        aggregation: {
          GENDER: 'Gender',
          RACE: 'Race/skin color',
          WEEK: 'Week',
          HOUR: 'Day hour',
          DAY_OF_WEEK: 'Weekdays',
          PAYOUT_LEVEL: 'Payout (R$/km)',
          REMUNERATION: 'Level of income'
        },

        money_value: 'R$ {value}',
        day_week: {
          date: 'Date',
          chooseDateofWeek: 'Choose a day of the week',
          weekDays: {
            sun: 'Sunday',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
          },
        },
        gender: {
          chooseGender: 'Choose a gender',
          genderList: {
            feminine: 'Feminine',
            masculine: 'Masculine',
            nonBinary: 'Non-binary',
            na: 'Not informed',
          },
        },
        race: {
          chooseRace: 'Choose a race',
          raceList: {
            asian: 'Asian',
            black: 'Black',
            brown: 'Brown',
            indigenous: 'Indigenous',
            na: 'Not informed',
            white: 'White',
          },
        },
      },
      mapView: {
        changeViewType: 'Select view type',
        viewtype_helper: 'Choose the preferred way to view the data.',
        viewList: {
          voyager: 'Voyager',
          basic: 'Basic',
          bright: 'Bright',
          sat1x: 'Satellite Hybrid',
          sat2x: 'Satellite Hybrid 2x',
          streets: 'Streets',
          outdoor: 'Outdoor',
          toner: 'Toner',
          topo: 'Topo',
          topographique: 'Topographique'
        },
      }
    }
  },
  'pt': {
    LANGUAGE_NAME: 'Português',
    FLAG_LINK: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',

    BIKESCIENCEWEB: {
      nav: {
      

      },
      maps: {
        trips: 'trips',
      },
      tabs: {
        filters: {
          baseLayer: 'Base layer',
          baseLayerMap: {
            main: 'left map',
            second: 'right map',

            grid: 'Grid',
            zones: '2017 OD Zones',

            buttons: {
              getFlows: 'Recalculate flows',
              gridEditMode: 'Edit grid',
              onHover: {
                gridEditMode: 'Change grid settings',
              },
              gridOptions: {
                size: 'Size',
                west: 'West',
                east: 'East',
                north: 'North',
                south: 'South',
              },
            },
          },
          
          forms: {
            aggregation: {
              category: {
                timeFilters: 'Time filters',
                populationFilters: 'Demographic filters',
                tripFilters: 'Trip filters',
              },
              filter: {
                start_time: 'Start time',
                finish_time: 'Finish time',
                weekday: 'Day of the week',
                holidays: 'Holidays',

                avgSpeed: 'Average speed',
                distance: 'Trip distance',
                duration: 'Trip duration',
                reason: 'Reasons for choosing bike',

                sex: 'Cyclist sex',
                age: 'Cyclist age',
                income: 'Family income',
                attractors_emitters: 'Trip attractors/generators region',
              },
            },
            
            age: { //tem algo com ageField (preciso testar)
              field: 'Age of cyclists',
              form: '{start} to {end} years old',
            },
            attractor: {
              info:  'The heat map indicates the neighborhoods in which bicycle trips begin or end most, for the selected filters',
            },
            time: {
              morning: 'Morning (6:00 to 12:00)',
              afternoon: 'Afternoon (12:00 to 18:00)',
              evening: 'Evening (18:00 to 23:00)',
              specificTime: 'Specific time range',

              from: 'from',
              to: 'to',

              months: {
                jan: 'jan',
                feb: 'feb',
                mar: 'mar',
                apr: 'apr',
                may: 'may',
                jun: 'jun',
                jul: 'jul',
                aug: 'aug',
                sep: 'sep',
                oct: 'oct',
                nov: 'nov',
                dec: 'dec'
              }
            },
            distance: {
              form: '{start} km to {end} km',
            },
            duration: {
              field: 'Trip duration',
              form: '{start} to {end} minutes',
            },
            income: {
              intervals: 'Intervals',
              brackets: 'Income brackets',
            },
            reason: {
              smallDistance: 'Short distance',
              expensiveTransport: 'Public transport too expensive',
              publicTransportStationDistance: 'Distant access to public transport',
              publicTransportSlow: 'Slow public transport',
              publicTransportDistance: 'Long trip in public transport',
              crowdedPublicTransport: 'Crowded public transport',
              fitness: 'Fitness',
              others: 'Others',
            },
            sex: {
              male: 'Men',
              female: 'Women',
            },
            speed: {
              form: '{start} km/h to {end} km/h',
            },
            tiers: {
              selectTiers: 'Show flows',
              notFoundTiers: 'No results found',
              emptyFlows: 'Flows not found. Try selecting different filters.',
            },
          },
        },
        layers: {
          aggregation: {
            category: {
              layers_highCapacityTransport: 'High capacity transports',
              layers_bikelanes: 'AAAAA',
              layers_accidents: 'Accidents',
            },
          }
        }
      }
    },


    appName: 'BikeScienceWeb',
    data: 'Dados',
    filters: 'Filtros',
    layers: 'Camadas',
    zones: 'Zonas OD 2017',
    grid: 'Grid',
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
        editModal: {
          title: 'Editando camada',
        },
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
        validateInputs: {
          name: 'Nome é obrigatório.',
          width: 'Espessura é obrigatória.',
          opacity: 'Opacidade é obrigatória.',
          emptyColor: 'Cor é obrigatória.',
          invalidColor: 'Cor deve ser informada em hexadecimal, por exemplo #ffffff.',
        },
        button: 'Enviar',
      },
      flows: {
        hoverText: 'Fluxos contendo entre {min} e {max} viagens',
        tierOptions: 'Tier {tier_prop}: {tier_count} fluxo | Tier {tier_prop}: {tier_count} fluxos',
      },
    },
    twoMaps: {
      leftMap: 'Mapa da Esquerda',
      rightMap: 'Mapa da Direita',
      mirroredChanges: 'Espelhar alterações',
      hideRightControls: 'Ocultar controles da direita',
      independentControl: 'Mover os mapas separadamente',
      sameControl: 'Mover os mapas simultaneamente',
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
          validateInputs: {
            name: 'Nome é obrigatório.',
            width: 'Espessura é obrigatória.',
            opacity: 'Opacidade é obrigatória.',
            emptyColor: 'Cor é obrigatória.',
            invalidColor: 'Cor deve ser informada em hexadecimal, por exemplo #ffffff.',
          },
          button: 'Send',
        },
      },
    },
    // Layers
    chooseLayer: 'Escolha um filtro',
    
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
    ageForm: '{start} até {end} anos',
    minutes: 'minutos',
    from: 'de',
    to: 'a',
    more_than: 'mais de',
    intervals: 'Intervalos',
    income_brackets: 'Faixas de renda',
    income_base: {
      'max': 'até R$ {value}',
      'range': 'de R$ {min} até R$ {max}',
      'more_than': 'mais de R$ {value}'
    },
    morning: '',
    afternoon: '',
    evening: '',
    specificTime: '',
    mon: 'Segunda-feira',
    tue: 'Terça-feira',
    wed: 'Quarta-feira',
    thu: 'Quinta-feira',
    fri: 'Sexta-feira',
    sat: 'Sábado',
    sun: 'Domingo',
    filterBtn: 'Filtrar',
    selectTiers: 'Mostrar fluxos',
    tier: 'Quartil',
    notFoundTiers: 'Nenhum resultado encontrado',
    flow: 'fluxo | fluxos',
    flows: 'Fluxos',
    months: 'Meses',
    charts: 'Gráficos',
    durationField: 'Duração da viagem',
    durationForm: '{start} até {end} minutos',
    male: 'Homens',
    female: 'Mulheres',
    trips: 'viagens',
    attractor_info: 'O mapa de calor indica as vizinhanças nas quais as viagens de bicicletas mais começam ou terminam, dados os filtros selecionados',
    tripSpeed: 'Velocidade da viagem',
    speedForm: '{start} km/h até {end} km/h',
    distanceForm: '{start} km até {end} km',
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
    BIKESP: {
      appName: 'Piloto Bike SP - Painel Analítico',
      date: 'Data',
      layers: 'Camadas',
      filters: 'Filtros',
      chooseFilter: 'Escolha um filtro',
      removeFilter: 'Remover filtro',
      chooseDateofWeek: 'Escolha um dia da semana',
      gender: {
        feminine: 'Feminino',
        masculine: 'Masculino',
        nonBinary: 'Não binários',
        na: 'Não informado',
      },
      chooseGender: 'Escolha um gênero',
      race: {
        asian: 'Amarelo',
        black: 'Preto',
        brown: 'Pardo',
        indigenous: 'Indígena',
        na: 'Não Informado',
        white: 'Branco',
      },
      chooseRace: 'Escolha uma raça',
      apply: 'Aplicar',
      selected: 'Selecionado',
      // Data type
      dataType: {
        TRIP_COUNT: 'Número de viagens',
        TRIP_DURATION: 'Duração média das viagens (em minutos)',
        TRIP_DISTANCE: 'Distância média percorrida (km)',
        MEAN_SPEED: 'Velocidade média (km/h)',
        TOTAL_SAMPLES: 'Total de amostras',
        TOTAL_TRIPS: 'Total de viagens',
        SAMPLE_MEAN_SPEED: 'Velocidade média (km/h)',
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
        PAYOUT_LEVEL: 'Recompensa (R$/km)',
        REMUNERATION: 'Nível de renda'
      },
      changeAggregation: 'Agrupar dados por',
      aggregation_helper: 'Escolha uma categoria para agrupar os dados exibidos no gráfico.',
      // Map layer
      chooseMapLayer: 'Selecione as camadas do mapa',
      selectMapLayer: 'Selecione tipos de camadas do mapa',
      removeCategory: 'Remover categoria',
      // View type
      changeViewType: 'Selecione o tipo de visualização',
      viewtype_helper: 'Escolha a forma como deseja visualizar os dados.',
      map: 'Mapa',
      maps: {
        voyager: 'Voyager',
        basic: 'Basic',
        bright: 'Bright',
        sat1x: 'Satellite Hybrid',
        sat2x: 'Satellite Hybrid 2x',
        streets: 'Streets',
        outdoor: 'Outdoor',
        toner: 'Toner',
        topo: 'Topo',
        topographique: 'Topographique'
      },
      chart: 'Gráfico',
    },
  },
};
