class HeatmapLayer extends L.Layer {
  constructor(data, options = {}) {
    super();
    this.data = data;
    this.options = {
      radius: 7,
      blur: 15,
      opacity: 1.0,
      maxIntensity: 1.0,
      minIntensity: 0.0,
      gradient: {
        0.0: '#2c7bb6', // dark blue
        0.5: '#ffff8c', // yellow
        1.0: '#d7191c'  // red
      },
      ...options
    };

    this._grad = this._createColorRamp(this.options.gradient);
  }

  onAdd(map) {
    this._map = map;

    this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer');
    this._canvas.style.position = 'absolute';
    this._context = this._canvas.getContext('2d');

    const size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;

    map.getPanes().overlayPane.appendChild(this._canvas);

    this._reset();
  }

  onRemove(map) {
    map.getPanes().overlayPane.removeChild(this._canvas);
  }

  _reset() {
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, topLeft);

    const size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;

    this._draw();
  }

  _draw() {
    const ctx = this._context;
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    const radius = this.options.radius;
    const max = this.options.maxIntensity;
    const min = this.options.minIntensity;

    for (const point of this.data) {
      const latLng = L.latLng(point[0], point[1]);
      const intensity = (point[2] - min) / max;
      const color = this._getColorForValue(intensity);

      const p = this._map.latLngToContainerPoint(latLng);
      const gradient = ctx.createRadialGradient(p.x, p.y, radius * 0.01, p.x, p.y, radius);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${this.options.opacity})`);
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  redraw() {
    this._reset();
  }

  setData(data) {
    this.data = data;
    this.options.maxIntensity = data[data.length-1][2];
    this.options.minIntensity = data[0][2] -1;
    this._reset();
  }

  setGradient(gradient) {
    this.options.gradient = gradient
    this._grad = this._createColorRamp(gradient);
    this._reset();
  }

  _createColorRamp(gradientStops) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);

    const sortedStops = Object.entries(gradientStops)
        .map(([k, v]) => [parseFloat(k), v])
        .sort((a, b) => a[0] - b[0]);

    for (const [stop, color] of sortedStops) {
      gradient.addColorStop(stop, color);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
    return ctx.getImageData(0, 0, 1, 256).data; 
  }

  _getColorForValue(value) {
    const id = Math.floor(value * 255) * 4;
    const id_clamped = Math.min(Math.max(id, 0), 1020);
    const r = this._grad[id_clamped];
    const g = this._grad[id_clamped + 1];
    const b = this._grad[id_clamped + 2];
    return [r, g, b];
  }
}

export { HeatmapLayer }