<!--------------------------------------------------
  name: index.vue
  author: mudas( mschool.tech )
  created: 2020/7/17
---------------------------------------------------->

<template>
	<demo-section>
		<demo-block :title="t('basicUsage')">
			<van-goods-double @click="clickHandler"></van-goods-double>
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
			content: 'Demo Template: GoodsDouble'
		};
	},

	methods: {
		clickHandler(event) {
			console.warn('demo.clickHandler:', event);
		}
	}
};
</script>

<style lang="less">
@import '../../style/var';
</style>
