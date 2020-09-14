<!--------------------------------------------------
  name: index.vue
  author: mudas( mschool.tech )
  created: 2020/7/17
---------------------------------------------------->

<template>
	<demo-section>
		<demo-block :title="t('basicUsage')">
      <van-goods-single @click="clickHandler"></van-goods-single>
		</demo-block>
	</demo-section>
</template>

<script>
export default {
	i18n: {
		'zh-CN': {},
		'en-US': {}
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
