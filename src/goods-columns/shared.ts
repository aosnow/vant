import { GoodsData } from '../goods-columns-item/shared';

export type SharedGoodsColumnsProps = {
  size?: 1 | 2 | 3;
  gutter?: number | string;
  round?: boolean;
  lazyLoad?: boolean; // 图片是否开启懒加载，需要 LazyLoad 组件使用
  border?: boolean;
  memberSymbol?: string;
  thumbTagAlign?: 'left' | 'center' | 'right'; // 标签位置
  trailingZeros?: boolean; // 是否保留末尾小数位的 0
  showStep?: boolean; // 是否显示购买数量控制器

  goods: Array<GoodsData>;
};

export const goodsColumnsProps = {
  size: {
    type: Number,
    default: 1
  },

  gutter: {
    type: [Number, String],
    default: 10
  },

  round: {
    type: Boolean,
    default: true
  },

  border: {
    type: Boolean,
    default: false
  },

  lazyLoad: {
    type: Boolean,
    default: true
  },

  memberSymbol: {
    type: String,
    default: 'VIP'
  },

  thumbTagAlign: {
    type: String,
    default: 'right'
  },

  trailingZeros: {
    type: Boolean,
    default: true
  },

  showStep: {
    type: Boolean,
    default: false
  },

  goods: {
    type: Array,
    default() {
      return [
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称',
          // tags: ['限购1份', '热卖'],
          thumb: ['http://img.blibao.com/upload/550912/2019062815345938381-2019041011390988568-20190116一层芝士牛堡400x400px.jpg',
            'https://img.blibao.com/upload/1066250/2020052714005230974-1.jpg',
            'https://img.blibao.com/upload/1066250/2020052714010032103-2.jpg'][Math.random() * 3 >> 0],
          // desc: '商品描述信息商品描述信息商品描述信息',
          thumbTag: '热卖商品',
          num: 2,
          otherNum: 5,
          // unit: '个',
          price: 11,
          // memberPrice: 9,
          originPrice: 12.5,
          soldout: false
        }
      ];
    }
  }
};
