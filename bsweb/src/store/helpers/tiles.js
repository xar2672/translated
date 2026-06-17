const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const tiles = [
  {
    id: 1,
    name: 'BIKESP.mapView.viewList.voyager',
    url: 'https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 2,
    name: 'BIKESP.mapView.viewList.basic',
    url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 3,
    name: 'BIKESP.mapView.viewList.bright',
    url: 'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 4,
    name: 'BIKESP.mapView.viewList.sat1x',
    url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: '4b',
    name: 'BIKESP.mapView.viewList.sat2x',
    url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 5,
    name: 'BIKESP.mapView.viewList.streets',
    url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 6,
    name: 'BIKESP.mapView.viewList.outdoor',
    url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
  // attribution,
  },
  {
    id: 7,
    name: 'BIKESP.mapView.viewList.toner',
    url: 'https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: true,
  // attribution,
  },
  {
    id: 8,
    name: 'BIKESP.mapView.viewList.topo',
    url: 'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    // attribution,
  },
  {
    id: 9,
    name: 'BIKESP.mapView.viewList.topographique',
    url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
  // attribution,
  },
];

export default tiles;