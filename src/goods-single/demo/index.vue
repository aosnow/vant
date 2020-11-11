<!--------------------------------------------------
  name: index.vue
  author: mudas( mschool.tech )
  created: 2020/7/17
---------------------------------------------------->

<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <van-goods-single :data-source="dataSource"
                        :round="true"
                        @click="clickHandler"/>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {},
    'en-US': {}
  },

  data() {
    return {
      dataSource: [
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行商品名称最多1行商品名称最多1行',
          // unit: '个',
          originPrice: 30,
          price: 20,
          tags: ['满20减5', '减100'],
          thumb: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3550424255,193265082&fm=26&gp=0.jpg'
        }
      ]
    };
  },

  methods: {
    clickHandler(props, event) {
      console.warn('demo.clickHandler:', props, event);
    }
  }
};
</script>

<style lang="less">
@import '../../style/var';
</style>
