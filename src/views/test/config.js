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

// 卫星地图
const GAODE_IMG = {
  'type': 'raster',
  'tiles': [
    'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
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

// 点击标注点显示信息 style
export const PLACE_INFO_EXAMPLE_STYLE = {
  'version': 8,
  'name': 'PLACE_INFO_EXAMPLE',
  'sources': {
    'gaode-img': GAODE_IMG,
  },
  'layers': [
    {
      'id': 'img',
      'type': 'raster',
      'source': 'gaode-img',
      'minzoom': 1,
      'maxzoom': 18,
    },
  ],
};

// 点击标注点显示信息 geojson
export const PLACE_INFO_EXAMPLE_GEOJSON = {
  'type': 'geojson',
  'data': {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'description':
            `<strong>标题示例</strong>
            <div>此标点位置，通过 geojson 定义</div>
            <div>文字文字文字文字文字文字文字</div>
            <div class="custom-color">自定义的文字颜色</div>`,
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            120.62709987026642,
            31.276455231411447,
          ],
        },
      },
    ],
  },
};
