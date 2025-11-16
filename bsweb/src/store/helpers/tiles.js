const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const tiles = [
  {
    id: 1,
    name: 'Voyager',
    url: 'https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 2,
    name: 'Basic',
    url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 3,
    name: 'Bright',
    url: 'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 4,
    name: 'Satellite Hybrid',
    url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: '4b',
    name: 'Satellite Hybrid 2x',
    url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 5,
    name: 'Streets',
    url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    attribution,
  },
  {
    id: 6,
    name: 'Outdoor',
    url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
  // attribution,
  },
  {
    id: 7,
    name: 'Toner',
    url: 'https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: true,
  // attribution,
  },
  {
    id: 8,
    name: 'Topo',
    url: 'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
    // attribution,
  },
  {
    id: 9,
    name: 'Topographique',
    url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
    visible: false,
  // attribution,
  },
];

export default tiles;