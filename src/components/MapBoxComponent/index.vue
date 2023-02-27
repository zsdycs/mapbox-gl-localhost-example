<template>
  <div ref="mapContainerRef" v-bind="$attrs" />
</template>

<script>
import mapboxgl from '@/utils/mapbox-gl/mapbox-gl.js';
import '@/utils/mapbox-gl/mapbox-gl.css';
import { isEqual } from 'lodash';

export default {
  props: {
    // 更新此，将更新整个 map
    mapStyle: {
      type: Object,
      require: true,
      default: () => null,
    },
    // 更新此，将更新 Geojson 所在 Layer
    mapInfoMarkGeojson: {
      type: Object,
      require: false,
      default: () => null,
    },
    // 图表除 style: mapStyle 以外的剩余参数
    // 详情：https://docs.mapbox.com/mapbox-gl-js/api/map/
    mapOptions: {
      type: Object,
      require: false,
      default: () => {},
    },
    // 要加载的 icon 雪碧图
    // 格式:
    // {
    //   spritUrl: '', // 雪碧图url地址
    //   iconInfos: [
    //     {
    //       key: '', // 图标的唯一key
    //       width: '', // 图标宽度
    //       height: '', // 图标高度
    //       x: '', // 左上角位于雪碧图的x坐标
    //       y: '', // 左上角位于雪碧图的y坐标
    //     },
    //   ]
    // }
    iconSpritImg: {
      type: Object,
      require: false,
      default: () => null,
    },
    // 图标名称 Marker
    // 格式：
    // {
    //   element: '', // html 字符串
    // }
    titleMarker: {
      type: Object,
      require: false,
      default: () => null,
    }
  },
  data() {
    return {
      mapChartObj: null, // 图表实例对象
      placeInfo: {
        example: 0,
      },
      markerPool: [], // marker 池
      oldMapInfoMarkGeojson: null, // 用于与新的做对比的对象
    };
  },
  watch: {
    mapStyle: {
      handler: function(newValue, oldValue) {
        if (!!newValue && !!this.mapInfoMarkGeojson && !isEqual(newValue, oldValue)) {
          console.log('---1---- mapStyle ----------newValue, oldValue', newValue, oldValue);
          // 更新整个图表
          this.loadMapChartObj();
        }
        console.log('----2--- mapStyle ----------');
      }
    },
    mapInfoMarkGeojson: {
      handler: function(newValue, oldValue) {
        console.log('---1---- mapInfoMarkGeojson ----------newValue, oldValue', newValue, oldValue);
        console.log('======= mapInfoMarkGeojson this.mapChartObj =========', this.mapChartObj);
        if (newValue && !!this.mapStyle && !isEqual(newValue, oldValue)) {
          this.mapInfoMarkGeojson = newValue;
          // 保存当前的 mapInfoMarkGeojson
          this.oldMapInfoMarkGeojson = oldValue;
          if (!this.mapChartObj) {
            // 未加载图表实例
            this.loadMapChartObj();
          } else {
            // 更新 Geojson 所在 Layer
            this.updatedInfoMarkLayer();
          }
        }
        console.log('----2--- mapInfoMarkGeojson ----------');
      }
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    // 加载 点击标注点显示信息
    loadMapChartObj() {
      this.mapChartObj = new mapboxgl.Map({
        container: this.$refs.mapContainerRef,
        style: this.mapStyle,
        ...this.mapOptions,
      });
      // load 事件
      this.onLoadMapChartObj();
      // 单击事件处理
      this.clickInfoMarkLayer();
      // 鼠标事件处理
      this.mouseenterInfoMarkLayer();
    },
    // 点击标注点显示信息 load 事件
    onLoadMapChartObj() {
      this.mapChartObj.on('load', () => {
        this.loadMapChartObjInfoMarkLayer();
      });
    },
    // 加载 infoMarkLayer 的图层
    loadMapChartObjInfoMarkLayer() {
      if (this.iconSpritImg) {
        const { spritUrl, iconInfos } = this.iconSpritImg;
        // 校验数据
        if (!spritUrl || !iconInfos) {
          throw Error(`iconSpritImg 对象 spritUrl 或 iconInfos 存在空数据`);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const iconSpritImg = new Image();
        iconSpritImg.src = spritUrl;
        iconSpritImg.onload = () => {
          canvas.width = iconSpritImg.width;
          canvas.height = iconSpritImg.height;
          ctx.drawImage(iconSpritImg, 0, 0);
          iconInfos.forEach((itemIcon) => {
            const { key, width, height, x, y } = itemIcon;
            const data = ctx.getImageData(x, y, width, height).data;
            this.mapChartObj.addImage(key, { width, height, data });
          });
          this.mapChartObj.addSource(
            'infoMarkLayerSource',
            this.mapInfoMarkGeojson,
          );

          this.updateTitleMarker();

          // 添加显示 infoMarkLayer 的图层
          this.mapChartObj.addLayer({
            id: 'infoMarkLayer',
            type: 'symbol',
            source: 'infoMarkLayerSource',
            layout: {
              'icon-image': ['get', 'icon'],
              'icon-allow-overlap': true,
            },
          });
        };
      }
    },
    // 更新 infoMarkLayer
    updatedInfoMarkLayer() {
      console.log('======= updatedInfoMarkLayer =========', this.mapChartObj);
      if (this.mapChartObj.getLayer('infoMarkLayer')) {
        this.mapChartObj.removeLayer('infoMarkLayer');
      }
      if (this.mapChartObj.getSource('infoMarkLayerSource')) {
        this.mapChartObj.removeSource('infoMarkLayerSource');
      }

      // 更新 marker
      this.updateTitleMarker();

      this.mapChartObj.addSource(
        'infoMarkLayerSource',
        this.mapInfoMarkGeojson,
      );

      // 添加显示 places 的图层
      this.mapChartObj.addLayer({
        id: 'infoMarkLayer',
        type: 'symbol',
        source: 'infoMarkLayerSource',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true,
        },
      });
    },
    updateTitleMarker() {
      if (this.titleMarker?.element) {
        // 根据 oldMapInfoMarkGeojson 里的 coordinates 移除 marker
        const oldGeoFeatures = this.oldMapInfoMarkGeojson?.data?.features || [];
        if (this.markerPool.length > 0 && oldGeoFeatures.length > 0) {
          let currentNewIndex = this.markerPool.length;
          while (currentNewIndex--) {
            const itemNewMarker = this.markerPool[currentNewIndex];
            const newCoordinates = itemNewMarker?.coordinates;
            const oldMarkerObj = oldGeoFeatures.find((itemOldGeoFeature) => {
              const oldCoordinates = itemOldGeoFeature?.geometry?.coordinates;
              return newCoordinates[0] === oldCoordinates[0] && newCoordinates[1] === oldCoordinates[1];
            });
            if (oldMarkerObj) {
              console.log('=========itemNewMarker', itemNewMarker);
              itemNewMarker.marker.remove();
              this.markerPool.splice(currentNewIndex, 1);
            }
          }
        }

        this.mapInfoMarkGeojson.data.features.forEach((itemGeoFeature) => {
          const el = document.createElement('div');
          el.innerHTML = this.titleMarker?.element;
          if (itemGeoFeature?.geometry?.coordinates) {
            const coordinates = itemGeoFeature?.geometry?.coordinates;
            const itemTitleMarker = new mapboxgl.Marker(el, { offset: [35, -25] })
              .setLngLat(coordinates)
              .addTo(this.mapChartObj);
            // 将 itemTitleMarker 存到 markerPool 以备 marker.remove() 使用
            this.markerPool.push({
              marker: itemTitleMarker,
              coordinates,
            });
          }
        });
        console.log('==========this.markerPool', this.markerPool);
      }
    },
    // 鼠标点击 事件处理
    clickInfoMarkLayer() {
      this.mapChartObj.on('click', 'infoMarkLayer', (event) => {
        this.$emit('clickInfoMarkLayer', {
          layerEvent: event,
          mapChartObj: this.mapChartObj,
          mapboxgl,
        });
      });
    },
    // 鼠标进入 事件处理
    mouseenterInfoMarkLayer() {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
      // 当鼠标位于places图层上时，将光标更改为指针。
      this.mapChartObj.on('mouseenter', 'infoMarkLayer', (event) => {
        this.$emit('mouseenterInfoMarkLayer', {
          layerEvent: event,
          mapChartObj: this.mapChartObj,
          popup,
        });
      });

      // 当它离开时，将其改回指针。
      this.mapChartObj.on('mouseleave', 'infoMarkLayer', () => {
        this.mapChartObj.getCanvas().style.cursor = '';
        popup.remove();
      });
    },
  },
};
</script>

<style lang="scss">
.custom-color {
  color: #e6a23c;
}
.place-title {
  color: #e6a23c;
  text-shadow: 5px 5px 5px #666;
  font-weight: 800;
}
</style>
