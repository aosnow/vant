export type GoodsData = {

  // 商品标签
  tags: Array<string>;

  // 图片角标
  thumbTag: string;

  // 商品名称
  title: string;

  // 商品图片
  thumb?: string;

  // 商品描述
  desc?: string;

  // 购买数量
  num?: number | string;

  // 价格
  price: number | string;

  // 会员价格
  memberPrice?: number | string;

  // 商品原价
  originPrice?: number | string;

  // 货币符号
  currency?: string;

};

export type SharedGoodsColumnsItemProps = GoodsData & {
  round?: boolean; // 是否呈现圆角容器
  lazyLoad?: boolean; // 图片是否开启懒加载，需要 LazyLoad 组件使用
  thumbTagAlign?: 'left' | 'center' | 'right'; // 标签位置
  trailingZeros?: boolean; // 是否保留末尾小数位的 0
  memberSymbol?: string; // 会员价的符号标识
};

export const goodsColumnsItemProps = {
  round: {
    type: Boolean,
    default: true
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

  tags: Array,
  thumbTag: String,
  title: String,
  thumb: String,
  desc: String,
  num: [Number, String],
  price: [Number, String],
  memberPrice: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥'
  }
};
