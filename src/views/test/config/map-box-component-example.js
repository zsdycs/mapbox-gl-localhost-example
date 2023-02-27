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

// style
export const MAP_BOX_COMPONENT_EXAMPLE_STYLE = {
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

export const makeExampleMockGeojson = ({ placeInfos, coordinates }) => {
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
            <div>动态数据：${placeInfos[0]}</div>
            <div class="custom-color">自定义的文字颜色</div>`,
            icon: 'icon-target1'
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates[0],
          },
        },
        {
          type: 'Feature',
          properties: {
            description: `<strong>标题示例</strong>
            <div>此标点位置，通过 geojson 定义</div>
            <div>动态数据：${placeInfos[1]}</div>
            <div class="custom-color">自定义的文字颜色</div>`,
            icon: 'icon-target1'
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates[1],
          },
        },
        {
          type: 'Feature',
          properties: {
            description: `<strong>标题示例</strong>
            <div>此标点位置，通过 geojson 定义</div>
            <div>动态数据：${placeInfos[2]}</div>
            <div class="custom-color">自定义的文字颜色</div>`,
            icon: 'icon-target2'
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates[2],
          },
        },
        {
          type: 'Feature',
          properties: {
            description: `<strong>标题示例</strong>
            <div>此标点位置，通过 geojson 定义</div>
            <div>动态数据：${placeInfos[3]}</div>
            <div class="custom-color">自定义的文字颜色</div>`,
            icon: 'icon-target2'
          },
          geometry: {
            type: 'Point',
            coordinates: coordinates[3],
          },
        },
      ],
    }
  };
};

// 模拟 geojson 数据
export const MAP_BOX_COMPONENT_EXAMPLE_MOCK = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          description: `<strong>标题示例</strong>
          <div>此标点位置，通过 geojson 定义</div>
          <div>动态数据：${1111}</div>
          <div class="custom-color">自定义的文字颜色</div>`,
          icon: 'icon-target1'
        },
        geometry: {
          type: 'Point',
          coordinates: [120.62619987026642, 31.276355231411447],
        },
      },
      {
        type: 'Feature',
        properties: {
          description: `<strong>标题示例</strong>
          <div>此标点位置，通过 geojson 定义</div>
          <div>动态数据：${2222}</div>
          <div class="custom-color">自定义的文字颜色</div>`,
          icon: 'icon-target1'
        },
        geometry: {
          type: 'Point',
          coordinates: [
            120.62839928026642,
            31.276015232411447,
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          description: `<strong>标题示例</strong>
          <div>此标点位置，通过 geojson 定义</div>
          <div>动态数据：${3333}</div>
          <div class="custom-color">自定义的文字颜色</div>`,
          icon: 'icon-target2'
        },
        geometry: {
          type: 'Point',
          coordinates: [
            120.62659928026642,
            31.274035232411447,
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          description: `<strong>标题示例</strong>
          <div>此标点位置，通过 geojson 定义</div>
          <div>动态数据：${4444}</div>
          <div class="custom-color">自定义的文字颜色</div>`,
          icon: 'icon-target2'
        },
        geometry: {
          type: 'Point',
          coordinates: [
            120.62869928026642,
            31.274015232411447,
          ],
        },
      },
    ],
  }
};
