<!--------------------------------------------------
  name: index.vue
  author: mudas( mschool.tech )
  created: 2020/6/8
---------------------------------------------------->

<template>
  <demo-section>

    <demo-block :title="t('basicUsage')">
      <van-goods-columns/>
    </demo-block>

    <demo-block :title="t('col2')">
      <van-goods-columns :size="2" thumb-tag-align="center"/>
    </demo-block>

    <demo-block :title="t('col3')">
      <van-goods-columns :size="3" thumb-tag-align="left" :trailing-zeros="false"/>
    </demo-block>

  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      col2: '两列商品展示',
      col3: '三列商品展示'
    },
    'en-US': {
      col2: 'Two columns of goods display',
      col3: 'Three columns of goods display'
    },
  },
};
</script>

<style lang="less">
@import '../../style/var';
</style>
