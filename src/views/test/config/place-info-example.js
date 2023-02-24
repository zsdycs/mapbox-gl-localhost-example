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

// 点击标注点显示信息 style
export const PLACE_INFO_EXAMPLE_STYLE = {
  'version': 8,
  'name': 'PLACE_INFO_EXAMPLE',
  'sources': {
    'gaode-img': GAODE_IMG,
  },
  'glyphs': 'http://localhost:9528/font/{fontstack}/{range}.pbf',
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
export const makePlaceInfoExampleGeojson = ({ placeInfo, coordinates }) => {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            description: `<strong>标题示例</strong>
            <div>此标点位置，通过 geojson 定义</div>
            <div>动态数据：${placeInfo.example}</div>
            <div class="custom-color">自定义的文字颜色</div>`,
          },
          geometry: {
            type: 'Point',
            coordinates,
          },
        },
      ],
    }
  };
};
