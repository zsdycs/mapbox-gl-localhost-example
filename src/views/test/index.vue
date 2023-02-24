<template>
  <div class="full-box">
    <div class="flex-box">
      <div class="example-box">
        <!-- 基础 -->
        <p class="title">基础</p>
        <div id="base-example" class="map-content" />
      </div>
      <div class="example-box">
        <!-- 点击标注点显示信息 -->
        <p class="title">点击标注点显示信息</p>
        <div id="place-info-example" class="map-content" />
      </div>
    </div>
    <button class="btn" @click="getMapInfo()">获取地图信息</button>
  </div>
</template>

<script>
import mapboxgl from '@/utils/mapbox-gl/mapbox-gl.js';
import '@/utils/mapbox-gl/mapbox-gl.css';
import { BASE_EXAMPLE_MAP_STYLE, PLACE_INFO_EXAMPLE_GEOJSON } from './config';

export default {
  data() {
    return {
      baseExampleMap: null,
      placeInfoExample: null,
    };
  },
  mounted() {
    // 加载 基础例子
    this.loadBaseExample();
    // 加载 点击标注点显示信息例子
    this.loadPlaceInfoExample();
  },
  methods: {
    // 加载 基础
    loadBaseExample() {
      this.baseExampleMap = new mapboxgl.Map({
        container: 'base-example',
        zoom: 17,
        center: [
          120.62709987026642,
          31.276455231411447,
        ],
        style: BASE_EXAMPLE_MAP_STYLE,
        hash: false,
        maxZoom: 17,
      },);
    },
    // 加载 点击标注点显示信息
    loadPlaceInfoExample() {
      this.placeInfoExample = new mapboxgl.Map({
        container: 'place-info-example',
        zoom: 17,
        center: [
          120.62709987026642,
          31.276455231411447,
        ],
        style: BASE_EXAMPLE_MAP_STYLE,
        hash: false,
        maxZoom: 17,
      },);
      this.placeInfoExample.on('load', () => {
        this.placeInfoExample.loadImage(
          'http://localhost:9528/target.png',
          (error, image,) => {
            if (error) throw error;

            // Add the image to the map style.
            this.placeInfoExample.addImage('cow_stand', image,);
            this.placeInfoExample.addSource('places', PLACE_INFO_EXAMPLE_GEOJSON,);
            // 添加显示 places 的图层。
            this.placeInfoExample.addLayer({
              'id': 'places',
              'type': 'symbol',
              'source': 'places',
              'layout': {
                'icon-image': 'cow_stand',
                'icon-allow-overlap': true,
              },
            },);
          },
        );
        // 当places层中的某个功能发生单击事件时，
        // 在该 features 的位置打开一个弹出窗口
        this.placeInfoExample.on('click', 'places', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0],) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(description)
            .addTo(this.placeInfoExample);
        },);

        // 当鼠标位于places图层上时，将光标更改为指针。
        this.placeInfoExample.on('mouseenter', 'places', () => {
          this.placeInfoExample.getCanvas().style.cursor = 'pointer';
        },);

        // 当它离开时，将其改回指针。
        this.placeInfoExample.on('mouseleave', 'places', () => {
          this.placeInfoExample.getCanvas().style.cursor = '';
        },);
      },);
    },
    // 获取地图信息
    getMapInfo() {
      console.log('baseExampleMap 基础:\n', this.baseExampleMap);
      console.log('placeInfoExample 点击标注点显示信息:\n', this.placeInfoExample);
    },
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
  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 4px;
  }
  .map-content {
    height: 500px;
    width: 500px;
    border: 1px solid #409eff;
  }
}

.btn {
  display: block;
  background-color: #409eff;
  color: #fff;
  border: 0;
  border-radius: 4px!important;
  cursor: pointer!important;
  font-size: 12px;
  line-height: 24px;
  caret-color: transparent;
  margin: 24px auto;
}

</style>

<style lang="scss">
.custom-color {
  color: #e6a23c;
}
</style>
