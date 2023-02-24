const GAODE_LBL = {
  'type': 'raster',
  'tiles': [
    'https://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    'https://webst02.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    'https://webst03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    'https://webst04.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
  ],
  'tileSize': 256,
};

// canvas style
export const CANVAS_EXAMPLE_MAP_STYLE = {
  'version': 8,
  'name': 'NATURAL_EARTH_EXAMPLE_MAP_STYLE',
  'sources': {
    'gaode-lbl': GAODE_LBL,
  },
  'layers': [
    {
      'id': 'img',
      'type': 'raster',
      'source': 'gaode-lbl',
      'minzoom': 1,
      'maxzoom': 18,
    },
  ],
};
