<template>
  <div class="full-box">
    <div class="flex-box">
      <!-- 基础 -->
      <!-- <div class="example-box">
        <p class="title">基础</p>
        <div ref="baseExample" class="map-content" />
      </div> -->
      <!-- 点击标注点显示信息 -->
      <!-- <div class="example-box">
        <p class="title">点击标注点显示信息 {{ placeInfo.example }}</p>
        <div id="place-info-example" class="map-content" />
      </div> -->
      <!-- canvas -->
      <!-- <div class="example-box">
        <p class="title">canvas</p>
        <canvas ref="canvasID" width="500" height="500">Canvas not supported</canvas>
        <div id="canvas-example" class="map-content" />
      </div> -->
      <!-- 组件使用 -->
      <div class="example-box">
        <!-- <p class="title">组件使用</p> -->
        <span
          class="info"
        >zoom: {{ zoom }}, lng: {{ center.lng }}, lat: {{ center.lat }}</span>
        <MapBoxComponent
          ref="mapBoxRef"
          :map-style="MAP_BOX_COMPONENT_EXAMPLE_STYLE"
          :map-info-mark-geojson="mapBoxComponent_mapInfoMarkGeojson"
          :map-options="mapBoxComponent_mapOptions"
          :icon-sprit-img="mapBoxComponent_iconSpritImg"
          :title-marker="mapBoxComponent_titleMarker"
          class="map-content"
          @mouseenterInfoMarkLayer="mouseenterInfoMarkLayer"
          @clickInfoMarkLayer="clickInfoMarkLayer"
          @move="onMapBoxComponentMove"
          @zoom="onMapBoxComponentZoom"
          @load="onMapBoxComponentLoad"
        />
      </div>
    </div>
    <button class="btn" @click="updatedMapBoxComponentData()">更新数据</button>
    <!-- <button class="btn" @click="startRecording()">开始记录数据</button>
    <button class="btn" @click="endRecording()">结束记录数据</button> -->
  </div>
</template>

<script>
// import mapboxgl from '@/utils/mapbox-gl/mapbox-gl.js';
// import '@/utils/mapbox-gl/mapbox-gl.css';
// import { BASE_EXAMPLE_MAP_STYLE } from './config/base-example';
// import {
//   PLACE_INFO_EXAMPLE_STYLE,
//   makePlaceInfoExampleGeojson,
// } from './config/place-info-example';
// import { CANVAS_EXAMPLE_MAP_STYLE } from './config/canvas-example';
// import { Circle } from './config/index';
import MapBoxComponent from '@/components/MapBoxComponent/index.vue';
import {
  MAP_BOX_COMPONENT_EXAMPLE_STYLE,
  MAP_BOX_COMPONENT_EXAMPLE_MOCK,
  makeExampleMockGeojson,
  SUZHOU_LAYER_SOURCE_GEOJSON,
  ROUTE_LAYER_SOURCE_GEOJSON1,
  ROUTE_LAYER_SOURCE_GEOJSON2,
  HIGHLIGHT_AREA_SOURCE_GEOJSON,
  OCCLUSION_AREA_SOURCE_GEOJSON,
} from './config/map-box-component-example';

export default {
  components: { MapBoxComponent },
  data() {
    return {
      // baseExampleMap: null,
      // placeInfoExample: null,
      // canvasExample: null,
      // placeInfo: {
      //   example: 0,
      // },
      // placeInfoInterval: null,
      MAP_BOX_COMPONENT_EXAMPLE_STYLE,
      mapBoxComponent_mapInfoMarkGeojson: null,
      mapBoxComponent_mapOptions: {
        zoom: 14,
        center: [120.62528289632445, 31.308716691586113],
        hash: false,
        maxZoom: 17,
        minZoom: 2,
        projection: 'mercator',
      },
      mapBoxComponent_iconSpritImg: {
        spritUrl: 'http://localhost:9528/icon-sprite.png', // 雪碧图url地址
        iconInfos: [
          {
            key: 'icon-target1', // 图标的唯一key
            width: 30, // 图标宽度
            height: 30, // 图标高度
            x: 0, // 左上角位于雪碧图的x坐标
            y: 0, // 左上角位于雪碧图的y坐标
          },
          {
            key: 'icon-target2', // 图标的唯一key
            width: 30, // 图标宽度
            height: 30, // 图标高度
            x: 30, // 左上角位于雪碧图的x坐标
            y: 0, // 左上角位于雪碧图的y坐标
          },
        ],
      },
      mapBoxComponent_titleMarker: {
        element: `<div class="place-title">标记点名称</div>`, // html 字符串
      },
      mapBoxComponent_setTimeout: null,
      zoom: 0,
      center: {
        lng: 0,
        lat: 0,
      },
      recordingInterval: null,
      recordingData: [],
    };
  },
  mounted() {
    // 加载 基础 例子
    // this.loadBaseExample();
    // 加载 点击标注点显示信息 例子
    // this.loadPlaceInfoExample();
    // 加载 canvas 例子
    // this.loadCanvasExample();
    // 五秒更新一次 infoMarkLayer
    // this.placeInfoInterval = setInterval(() => {
    //   //  随机生成数据
    //   this.placeInfo.example = Math.floor(Math.random() * 1000);
    //   // 更新 infoMarkLayer
    //   this.updatedInfoMarkLayer({ placeInfo: this.placeInfo });
    // }, 5000);

    // 模拟API在一秒后返回“组件使用例子”的 Geojson
    this.mapBoxComponent_setTimeout = setTimeout(() => {
      this.mapBoxComponent_mapInfoMarkGeojson = MAP_BOX_COMPONENT_EXAMPLE_MOCK;
    }, 1000);

    // 添加地图中心点标记
    // this.$refs.mapBoxRef.$el.insertAdjacentHTML(
    //   'afterbegin',
    //   `<div class="canter-mark"></div>`
    // );
  },
  updated() {},
  destroyed() {
    // clearInterval(this.placeInfoInterval);
    clearTimeout(this.mapBoxComponent_setTimeout);
  },
  methods: {
    // // 加载 基础
    // loadBaseExample() {
    //   this.baseExampleMap = new mapboxgl.Map({
    //     container: this.$refs.baseExample,
    //     zoom: 17,
    //     center: [120.62709987026642, 31.276455231411447],
    //     style: BASE_EXAMPLE_MAP_STYLE,
    //     hash: false,
    //     maxZoom: 17,
    //     minZoom: 2,
    //   });
    // },
    // // 加载 点击标注点显示信息
    // loadPlaceInfoExample() {
    //   this.placeInfoExample = new mapboxgl.Map({
    //     container: 'place-info-example',
    //     zoom: 17,
    //     center: [120.62709987026642, 31.276455231411447],
    //     style: PLACE_INFO_EXAMPLE_STYLE,
    //     hash: false,
    //     maxZoom: 17,
    //     minZoom: 2,
    //   });
    //   // 点击标注点显示信息 load 事件
    //   this.onLoadPlaceInfoExample({ placeInfo: this.placeInfo });
    //   // 点击标注点显示信息 单击事件处理
    //   // this.clickPlaceInfoExample();
    //   // 点击标注点显示信息 鼠标事件处理
    //   this.mouseEventPlaceInfoExample();
    // },
    // // 点击标注点显示信息 load 事件
    // onLoadPlaceInfoExample() {
    //   this.placeInfoExample.on('load', () => {
    //     this.loadPlaceInfoExampleInfoMarkLayer();
    //   });
    // },
    // // 点击标注点显示信息 加载 infoMarkLayer
    // loadPlaceInfoExampleInfoMarkLayer() {
    //   const canvas = document.createElement('canvas');
    //   const ctx = canvas.getContext('2d', { willReadFrequently: true });
    //   const iconSpritImg = new Image();
    //   iconSpritImg.src = 'http://localhost:9528/icon-sprite.png';
    //   iconSpritImg.onload = () => {
    //     canvas.width = iconSpritImg.width;
    //     canvas.height = iconSpritImg.height;
    //     ctx.drawImage(iconSpritImg, 0, 0);
    //     const iconList = [
    //       {
    //         key: 'icon-target1',
    //         width: 30,
    //         height: 30,
    //         x: 0,
    //         y: 0,
    //       },
    //       {
    //         key: 'icon-target2',
    //         width: 30,
    //         height: 30,
    //         x: 30,
    //         y: 0,
    //       }
    //     ];
    //     iconList.forEach((itemIcon) => {
    //       const { key, width, height, x, y } = itemIcon;
    //       const data = ctx.getImageData(x, y, width, height).data;
    //       this.placeInfoExample.addImage(key, { width, height, data });
    //     });
    //     // TODO 请求 API 返回数据后 => 1.赋值 this.placeInfo，2.加载点位
    //     const coordinates = [
    //       120.62709987026642,
    //       31.276455231411447,
    //     ];
    //     this.placeInfoExample.addSource(
    //       'infoMarkLayerSource',
    //       makePlaceInfoExampleGeojson({ placeInfo: this.placeInfo, coordinates })
    //     );
    //     const el = document.createElement('div');
    //     el.innerHTML = `<div class="place-title">标记点名称</div>`;
    //     new mapboxgl.Marker(el, { offset: [35, -25] })
    //       .setLngLat(coordinates)
    //       .addTo(this.placeInfoExample);

    //     // 添加显示 places 的图层
    //     this.placeInfoExample.addLayer({
    //       id: 'infoMarkLayer',
    //       type: 'symbol',
    //       source: 'infoMarkLayerSource',
    //       layout: {
    //         'icon-image': ['get', 'icon'],
    //         'icon-allow-overlap': true,
    //       },
    //     });
    //   };
    // },
    // // 更新 infoMarkLayer
    // updatedInfoMarkLayer({ placeInfo }) {
    //   if (this.placeInfoExample.getLayer('infoMarkLayer')) {
    //     this.placeInfoExample.removeLayer('infoMarkLayer');
    //   }
    //   if (this.placeInfoExample.getSource('infoMarkLayerSource')) {
    //     this.placeInfoExample.removeSource('infoMarkLayerSource');
    //   }
    //   // TODO 请求 API 返回数据后 => 1.赋值 this.placeInfo，2.加载点位
    //   const coordinates = [
    //     120.62709987026642,
    //     31.276455231411447,
    //   ];
    //   this.placeInfoExample.addSource(
    //     'infoMarkLayerSource',
    //     makePlaceInfoExampleGeojson({ placeInfo, coordinates })
    //   );
    //   // const el = document.createElement('div');
    //   // el.innerHTML = `标记点名称${this.placeInfo.example}`;
    //   // new mapboxgl.Marker(el, { offset: [35, -25] })
    //   //   .setLngLat(coordinates)
    //   //   .addTo(this.placeInfoExample);

    //   // 添加显示 places 的图层
    //   this.placeInfoExample.addLayer({
    //     id: 'infoMarkLayer',
    //     type: 'symbol',
    //     source: 'infoMarkLayerSource',
    //     layout: {
    //       'icon-image': ['get', 'icon'],
    //       'icon-allow-overlap': true,
    //     },
    //   });
    // },
    // // 点击标注点显示信息 单击事件处理
    // clickPlaceInfoExample() {
    //   this.placeInfoExample.on('click', 'infoMarkLayer', (e) => {
    //     const coordinates = e.features[0].geometry.coordinates.slice();
    //     const description = e.features[0].properties.description;

    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }

    //     new mapboxgl.Popup()
    //       .setLngLat(e.features[0].geometry.coordinates)
    //       .setHTML(description)
    //       .addTo(this.placeInfoExample);
    //   });
    // },
    // // 点击标注点显示信息 鼠标事件处理
    // mouseEventPlaceInfoExample() {
    //   const popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false,
    //   });
    //   // 当鼠标位于places图层上时，将光标更改为指针。
    //   this.placeInfoExample.on('mouseenter', 'infoMarkLayer', (e) => {
    //     this.placeInfoExample.getCanvas().style.cursor = 'pointer';
    //     const coordinates = e.features[0].geometry.coordinates.slice();
    //     const description = e.features[0].properties.description;

    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }

    //     popup.setLngLat(e.features[0].geometry.coordinates)
    //       .setHTML(description)
    //       .addTo(this.placeInfoExample);
    //   });

    //   // 当它离开时，将其改回指针。
    //   this.placeInfoExample.on('mouseleave', 'infoMarkLayer', () => {
    //     this.placeInfoExample.getCanvas().style.cursor = '';
    //     popup.remove();
    //   });
    // },
    // 更新数据
    updatedMapBoxComponentData() {
      const placeInfos = [];
      const coordinates = [];
      let i = 0;
      while (i < 4) {
        i++;
        placeInfos.push(Math.floor(Math.random() * 1000));
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        coordinates.push([
          this.mapBoxComponent_mapOptions.center[0] +
            Math.floor(Math.random() * 10) * 0.001 * plusOrMinus,
          this.mapBoxComponent_mapOptions.center[1] +
            Math.floor(Math.random() * 10) * 0.001 * plusOrMinus,
        ]);
      }
      // console.log('======= coordinates ========', JSON.stringify(coordinates));
      this.mapBoxComponent_mapInfoMarkGeojson = makeExampleMockGeojson({
        placeInfos,
        coordinates,
      });
      // 移除开始时的线路 {
      if (this.$refs.mapBoxRef.mapChart.getLayer('route-layer-1')) {
        this.$refs.mapBoxRef.mapChart.removeLayer('route-layer-1');
      }
      if (this.$refs.mapBoxRef.mapChart.getSource('route-layer-source-1')) {
        this.$refs.mapBoxRef.mapChart.removeSource('route-layer-source-1');
      }
      if (this.$refs.mapBoxRef.mapChart.getLayer('route-layer-2')) {
        this.$refs.mapBoxRef.mapChart.removeLayer('route-layer-2');
      }
      if (this.$refs.mapBoxRef.mapChart.getSource('route-layer-source-2')) {
        this.$refs.mapBoxRef.mapChart.removeSource('route-layer-source-2');
      }
      // 移除开始时的线路 }
    },
    // 鼠标点击 InfoMarkLayer
    clickInfoMarkLayer({ layerEvent, mapChart, mapboxgl }) {
      const coordinates = layerEvent.features[0].geometry.coordinates.slice();
      const description = layerEvent.features[0].properties.description;

      while (Math.abs(layerEvent.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += layerEvent.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(layerEvent.features[0].geometry.coordinates)
        .setHTML(description)
        .addTo(mapChart);
    },
    // 鼠标移入 InfoMarkLayer
    mouseenterInfoMarkLayer({ layerEvent, mapChart, popup }) {
      mapChart.getCanvas().style.cursor = 'pointer';
      const coordinates = layerEvent.features[0].geometry.coordinates.slice();
      const description = layerEvent.features[0].properties.description;

      while (Math.abs(layerEvent.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += layerEvent.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup
        .setLngLat(layerEvent.features[0].geometry.coordinates)
        .setHTML(description)
        .addTo(mapChart);
    },
    // load
    onMapBoxComponentLoad({ zoom, center, mapChart }) {
      this.zoom = zoom;
      this.center = center;
      // 添加苏州城区范围
      this.addSuzhouLayer({ mapChart });
      // 添加高亮区域
      this.addHighlightAreaLayer({ mapChart });
      // 添加路线图1
      this.addRouteLayer1({ mapChart });
      // 添加路线图2
      this.addRouteLayer2({ mapChart });
      // 添加遮盖区域
      this.addOcclusionArea({ mapChart });
    },
    // 添加苏州城区范围
    addSuzhouLayer({ mapChart }) {
      // 使用 geojson 添加苏州城区范围
      mapChart.addSource('suzhou-layer-source', SUZHOU_LAYER_SOURCE_GEOJSON);
      // 添加 suzhouLayer
      mapChart.addLayer({
        id: 'suzhouLayer',
        type: 'line',
        source: 'suzhou-layer-source',
        layout: {
          // 'line-join': 'round',
          // 'line-cap': 'round',
        },
        paint: {
          'line-color': '#409eff',
          'line-width': 8,
        },
      });
    },
    // 添加高亮区域
    addHighlightAreaLayer({ mapChart }) {
      // 使用 geojson 添加高亮区域
      mapChart.addSource('highlight-area-source', HIGHLIGHT_AREA_SOURCE_GEOJSON);
      // 在 suzhouLayer 图层下，添加 高亮区域 图层
      mapChart.addLayer(
        {
          id: 'highlightAreaLayer',
          type: 'fill',
          source: 'highlight-area-source',
          layout: {},
          paint: {
            'fill-color': '#f08',
            'fill-opacity': 0.2,
          },
        },
        'suzhouLayer'
      );
    },
    // 添加路线图1
    addRouteLayer1({ mapChart }) {
      // 使用 geojson 添加路线图1
      mapChart.addSource('route-layer-source-1', ROUTE_LAYER_SOURCE_GEOJSON1);
      // 添加 route-layer-1
      mapChart.addLayer({
        id: 'route-layer-1',
        type: 'line',
        source: 'route-layer-source-1',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#00d704',
          'line-width': 8,
        },
      });
    },
    // 添加路线图2
    addRouteLayer2({ mapChart }) {
      // 使用 geojson 添加路线图2
      mapChart.addSource('route-layer-source-2', ROUTE_LAYER_SOURCE_GEOJSON2);
      // 添加 route-layer-2
      mapChart.addLayer({
        id: 'route-layer-2',
        type: 'line',
        source: 'route-layer-source-2',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#b8cb0a',
          'line-width': 8,
        },
      });
    },
    // 添加遮盖区域
    addOcclusionArea({ mapChart }) {
      mapChart.addSource('occlusion-area-source', OCCLUSION_AREA_SOURCE_GEOJSON);

      mapChart.loadImage(
        'http://localhost:9528/occlusion-area.jpg',
        (err, image) => {
          if (err) throw err;

          mapChart.addImage('occlusion-area-img', image);

          mapChart.addLayer({
            id: 'occlusion-area-layer',
            type: 'fill',
            source: 'occlusion-area-source',
            paint: {
              'fill-pattern': 'occlusion-area-img',
            },
          });
        }
      );
    },
    // move
    onMapBoxComponentMove({ zoom, center }) {
      this.zoom = zoom;
      this.center = center;
    },
    // zoom
    onMapBoxComponentZoom({ zoom, center }) {
      this.zoom = zoom;
      this.center = center;
    },
    // 开始记录数据
    startRecording() {
      this.recordingData = [];
      this.recordingInterval = setInterval(() => {
        this.recordingData.push([this.center.lng, this.center.lat]);
      }, 500);
    },
    // 结束记录数据
    endRecording() {
      clearTimeout(this.recordingInterval);
      // 去重
      // console.log('===============1', JSON.stringify(this.recordingData));

      let recordingDataLength = this.recordingData.length;
      while (recordingDataLength--) {
        const itemData = this.recordingData[recordingDataLength];
        const findIndex = this.recordingData.findIndex((itemFind, indexFind) =>
          itemData[0] === itemFind[0] && itemData[1] === itemFind[1]
            ? indexFind
            : -1
        );
        if (findIndex > 0) {
          this.recordingData.splice(findIndex, 1);
        }
      }
      console.log('===============', JSON.stringify(this.recordingData));
    },
    // 加载 canvas 例子
    // loadCanvasExample() {
    //   this.canvasExample = new mapboxgl.Map({
    //     container: 'canvas-example',
    //     zoom: 17,
    //     center: [120.62709987026642, 31.276455231411447],
    //     style: CANVAS_EXAMPLE_MAP_STYLE,
    //     hash: false,
    //     maxZoom: 17,
    //     minZoom: 2,
    //     projection: 'mercator',
    //   });

    //   const canvasNode = this.$refs.canvasID;
    //   const ctx = canvasNode.getContext('2d');
    //   const circles = [];
    //   const radius = 20;
    //   if (ctx) {
    //     canvasNode.style.display = 'none';
    //   }

    //   for (let i = 0; i < 5; i++) {
    //     const color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    //     const x = Math.random() * (500 - radius * 2) + radius;
    //     const y = Math.random() * (500 - radius * 2) + radius;

    //     const dx = (Math.random() - 0.5) * 2;
    //     const dy = (Math.random() - 0.5) * 2;

    //     circles.push(new Circle({ ctx, x, y, dx, dy, radius, color }));
    //   }

    //   function animate() {
    //     requestAnimationFrame(animate);
    //     ctx.clearRect(0, 0, 500, 500);

    //     for (let r = 0; r < 5; r++) {
    //       circles[r].update();
    //     }
    //   }

    //   animate();
    //   this.canvasExample.on('load', () => {
    //     this.canvasExample.addSource('canvas-layer', {
    //       type: 'canvas',
    //       canvas: this.$refs.canvasID,
    //       coordinates: [
    //         [120.62709987026642, 31.276455231411447],
    //         [120.62709987026642, 31.27645523141142],
    //         [120.62709987026642, 31.27645523141143],
    //         [120.62709987026642, 31.27645523141144],
    //       ],
    //       animate: true
    //     });

    //     this.canvasExample.addLayer({
    //       id: 'canvas-layer',
    //       type: 'raster',
    //       source: 'canvas-layer',
    //     });
    //   });
    // },
  },
};
</script>

<style scoped lang="scss">
.full-box {
  height: 100%;
  width: 100%;
}

.flex-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.example-box {
  margin: 24px;

  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 4px;
  }

  .map-content {
    position: relative;
    height: 800px;
    width: 800px;
    border: 1px solid #409eff;
  }
}

.btn {
  display: block;
  background-color: #409eff;
  color: #fff;
  border: 0;
  border-radius: 4px !important;
  cursor: pointer !important;
  font-size: 12px;
  line-height: 24px;
  caret-color: transparent;
  margin: 24px auto;
}

.info {
  font-family: "Consolas";
}
</style>

<style lang="scss">
.custom-color {
  color: #e6a23c;
}

.place-title {
  color: #e6a23c;
  text-shadow: 5px 5px 5px #666;
  font-weight: 800;
}

.canter-mark {
  height: 10px;
  width: 10px;
  background-color: #f56c6c;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(50%, 50%);
  border-radius: 50%;
  border: 2px solid #409eff;
  z-index: 999;
}
</style>
