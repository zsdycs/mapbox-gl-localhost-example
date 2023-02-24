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

const GAODE_VEC = {
  'type': 'raster',
  'tiles': [
    'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'http://webrd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'http://webrd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
  ],
  'tileSize': 256,
};

// 基础例子 style
export const BASE_EXAMPLE_MAP_STYLE = {
  'version': 8,
  'name': 'BASE_EXAMPLE_MAP',
  'sources': {
    'gaode-lbl': GAODE_LBL,
    'gaode-vec': GAODE_VEC,
  },
  'layers': [
    {
      'id': 'img',
      'type': 'raster',
      'source': 'gaode-vec',
      'minzoom': 1,
      'maxzoom': 18,
    },
  ],
};
