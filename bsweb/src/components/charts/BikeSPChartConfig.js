const config = {
        theme: '',
        responsive: false,
        customPalette: ['1f77b4'],
        useCssAnimation: true,
        downsample: {
            threshold: 500
        },
        chart: {
            fontFamily: 'inherit',
            backgroundColor: '#FFFFFFff',
            color: '#1A1A1Aff',
            height: 300,
            width: 700,
            zoom: {
                show: true,
                color: '#CCCCCCff',
                highlightColor: '#4A4A4A',
                fontSize: 14,
                useResetSlot: false,
                startIndex: null,
                endIndex: null,
                enableRangeHandles: true,
                enableSelectionDrag: true,
                minimap: {
                    show: true,
                    smooth: false,
                    selectedColor: '#1F77B4',
                    selectedColorOpacity: 0.2,
                    lineColor: '#1A1A1A',
                    selectionRadius: 2,
                    indicatorColor: '#1A1A1A',
                    verticalHandles: false
                }
            },
            padding: {
                top: 36,
                right: 24,
                bottom: 48,
                left: 48
            },
            highlighter: {
                color: '#1A1A1Aff',
                opacity: 5,
                useLine: false,
                lineDasharray: 2,
                lineWidth: 1
            },
            highlightArea: {
                show: false,
                from: 0,
                to: 0,
                color: '#CCCCCCff',
                opacity: 20,
                caption: {
                    text: 'Caption',
                    fontSize: 20,
                    color: '#1A1A1Aff',
                    bold: false,
                    offsetY: 0,
                    width: 'auto',
                    padding: 3,
                    textAlign: 'center'
                }
            },
            timeTag: {
                show: false,
                backgroundColor: '#e1e5e8ff',
                color: '#1A1A1Aff',
                fontSize: 12,
                circleMarker: {
                    radius: 3,
                    color: '#1A1A1Aff'
                }
            },
            grid: {
                stroke: '#e1e5e8ff',
                showVerticalLines: false,
                showHorizontalLines: false,
                position: 'middle',
                frame: {
                    show: false,
                    stroke: '#E1E5E8ff',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeDasharray: 0
                },
                labels: {
                    show: true,
                    color: '#1A1A1Aff',
                    fontSize: 16,
                    axis: {
                        yLabel: '',
                        yLabelOffsetX: 0,
                        xLabel: '',
                        xLabelOffsetY: 14,
                        fontSize: 12
                    },
                    zeroLine: {
                        show: true
                    },
                    xAxis: {
                        showBaseline: true
                    },
                    yAxis: {
                        position: 'left',
                        showBaseline: true,
                        commonScaleSteps: 10,
                        useIndividualScale: false,
                        stacked: false,
                        gap: 12,
                        labelWidth: 40,
                        formatter: null,
                        scaleMin: null,
                        scaleMax: null,
                        groupColor: '#1A1A1A',
                        scaleLabelOffsetX: 0,
                        scaleValueOffsetX: 0
                    },
                    xAxisLabels: {
                        color: '#1A1A1Aff',
                        show: true,
                        values: [],
                        fontSize: 18,
                        showOnlyFirstAndLast: false,
                        showOnlyAtModulo: false,
                        modulo: 12,
                        yOffset: 8,
                        rotation: 0
                    }
                }
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 200,
                offsetX: 0,
                offsetY: 0
            },
            labels: {
                fontSize: 16,
                prefix: '',
                suffix: ''
            },
            legend: {
                color: '#1A1A1Aff',
                show: true,
                fontSize: 16
            },
            title: {
                text: 'BikeSP Data',
                color: '#1A1A1Aff',
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: '#CCCCCCff',
                    text: '',
                    fontSize: 16,
                    bold: false
                },
                show: true
            },
            tooltip: {
                show: true,
                color: '#1A1A1Aff',
                backgroundColor: '#FFFFFFff',
                fontSize: 14,
                customFormat: null,
                borderRadius: 4,
                borderColor: '#e1e5e8',
                borderWidth: 1,
                backgroundOpacity: 30,
                position: 'center',
                offsetY: 24,
                showTimeLabel: true,
                showValue: true,
                showPercentage: false,
                roundingValue: 0,
                roundingPercentage: 0
            },
            userOptions: {
                show: true,
                showOnChartHover: false,
                keepStateOnChartLeave: true,
                position: 'right',
                buttons: {
                    tooltip: true,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: true,
                    fullscreen: true,
                    sort: false,
                    stack: true,
                    animation: false,
                    annotator: true
                },
                buttonTitles: {
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
                },
                print: {
                    allowTaint: false,
                    backgroundColor: '#FFFFFFff',
                    useCORS: false,
                    onclone: null,
                    scale: 2,
                    logging: false
                }
            }
        },
        bar: {
            borderRadius: 2,
            useGradient: false,
            periodGap: 0.1,
            border: {
                useSerieColor: false,
                strokeWidth: 1,
                stroke: '#FFFFFFff'
            },
            labels: {
                show: true,
                offsetY: -8,
                rounding: 0,
                color: '#1A1A1Aff',
                formatter: null
            },
            serieName: {
                show: false,
                offsetY: -6,
                useAbbreviation: true,
                abbreviationSize: 3,
                useSerieColor: true,
                color: '#1A1A1Aff',
                bold: false
            }
        },
        line: {
            radius: 6,
            useGradient: false,
            strokeWidth: 2,
            cutNullValues: false,
            dot: {
                hideAboveMaxSerieLength: 62,
                useSerieColor: false,
                fill: '#FFFFFF',
                strokeWidth: 2
            },
            labels: {
                show: true,
                offsetY: -16,
                rounding: 0,
                color: '#1A1A1Aff',
                formatter: null
            },
            area: {
                useGradient: true,
                opacity: 20
            },
            tag: {
                followValue: true,
                formatter: null,
                fontSize: 14
            }
        },
        plot: {
            radius: 6,
            useGradient: true,
            dot: {
                useSerieColor: true,
                fill: '#FFFFFF',
                strokeWidth: 0.5
            },
            labels: {
                show: true,
                offsetY: -8,
                rounding: 0,
                color: '#1A1A1Aff',
                formatter: null
            },
            tag: {
                followValue: true,
                formatter: null,
                fontSize: 14
            }
        },
        table: {
            responsiveBreakpoint: 400,
            rounding: 0,
            sparkline: true,
            showSum: true,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: {
                backgroundColor: '#FAFAFAff',
                color: '#1A1A1Aff',
                outline: ''
            },
            td: {
                backgroundColor: '#FAFAFAff',
                color: '#1A1A1Aff',
                outline: ''
            }
        },
        showTable: false
    }

const noLabelsConfig = {
    chart: {
        grid: {
          labels: {
            xAxisLabels: {
              values:  [''],
              show: false,
            }
          }
        }
    }
}

const hourLabels = () => {
    return [...Array(24).keys()].map(hour => `${hour}h`)
}

const aggregationConfig = {
    GENDER: noLabelsConfig,
    RACE: noLabelsConfig,
    PAYOUT_LEVEL: noLabelsConfig,
    DAY_OF_WEEK: noLabelsConfig,
    HOUR: {
      chart: {
        legend: {
          show: false,
        },
        grid: {
          labels: {
            xAxisLabels: {
              values:  hourLabels(),
              fontSize: 12,
              rotation: 15,
            }
          }
        }
      }
    },
    WEEK: { 
      chart: {
        grid: {
          labels: {
            xAxisLabels: {
              show: true,
              modulo: 4,
              showOnlyAtModulo: false,
              fontSize: 12,
              rotation: 15 
            }
          }
        }
      }
    }
}

export {
   config,
   aggregationConfig
}