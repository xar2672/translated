import L from 'leaflet';

class HeatmapLayer extends L.Layer {
  constructor(data, options = {}) {
    super();
    this._rawData = data;
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
    this._createBrushes();
    this._parseData(data);  
  }

  onAdd(map) {
    this._map = map;
    if (!this._canvas) {
      this._canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer');
      this._canvas.style.position = 'absolute';
      this._canvas.style.pointerEvents = 'none';
    }

    this._context = this._canvas.getContext('2d', { alpha: true });
    map.getPanes().overlayPane.appendChild(this._canvas);
    this._reset();
 
  }

  onRemove(map) {
    map.getPanes().overlayPane.removeChild(this._canvas);
  }

  _createBrushes() {
    this._brushes = [];
    const r = this.options.radius;
    
    for (let i = 0; i < 256; i++) {
      const brush = document.createElement('canvas');
      brush.width = r * 2;
      brush.height = r * 2;

      const brushContext = brush.getContext('2d');
      const color = this._getColorForValue(i / 255);

      const gradient = brushContext.createRadialGradient(r, r, r * 0.01, r, r, r);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${this.options.opacity})`);
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

      brushContext.fillStyle = gradient;
      brushContext.beginPath();
      brushContext.arc(r, r, r, 0, Math.PI * 2);
      brushContext.fill();
      
      this._brushes.push(brush);
    }
  }

  _parseData(rawData) {
    if (!rawData || rawData.length === 0) {
      this.data = [];
      return;
    }
    
    this.data = rawData.map(p => ({
      latLng: L.latLng(p[0], p[1]),
      value: p[2]
    }));
  }

  _reset() {
    if (!this._map) return;
    const topLeft = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, topLeft);

    const size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;

    this._draw();
  }

  _draw() {
    if (!this._map || !this.data || this.data.length === 0) return;

    const ctx = this._context;
    const width = this._canvas.width;
    const height = this._canvas.height;

    ctx.clearRect(0, 0, width, height);

    const bounds = this._map.getBounds();
    const radius = this.options.radius;
    const max = this.options.maxIntensity;
    const min = this.options.minIntensity;
    const range = max - min || 1;

    for (let i = 0; i < this._rawData.length; i++) {
      const point = this._rawData[i];
      const lat = point[0];
      const lng = point[1];

      if (lat < bounds.getSouth() || lat > bounds.getNorth() || 
          lng < bounds.getWest() || lng > bounds.getEast()) {
        continue;
      }

      const p = this._map.latLngToContainerPoint([lat, lng]);
      let intensity = (point[2] - min) / range;
      intensity = Math.max(0, Math.min(1, intensity));

      const brushIndex = Math.floor(intensity * 255);
      const brush = this._brushes[brushIndex];

      if (brush) {
        ctx.drawImage(brush, p.x - radius, p.y - radius);
      }
    }
  }

  redraw() {
    this._reset();
  }

  setData(data, maxIntensity) {
    if (!data || data.length === 0) {
      this._rawData = [];
      this._parseData([]);
      this._reset();
      return;
    }

    this._rawData = data;
    
    this.options.maxIntensity = maxIntensity || data[data.length-1][2];
    this.options.minIntensity = data[0][2] - 1;
    
    this._parseData(data);
    this._reset();
  }

  setGradient(gradient) {
    this.options.gradient = gradient
    this._grad = this._createColorRamp(gradient);
    this._createBrushes();
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