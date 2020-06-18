export type GoodsData = {

  // 唯一编码
  id: string;

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

  // 计价单位
  unit?: string;

  // 价格
  price: number | string;

  // 会员价格
  memberPrice?: number | string;

  // 商品原价
  originPrice?: number | string;

  // 货币符号
  currency?: string;

  // 购买数量（默认初始购买数量）
  num?: number | string;
  otherNum?: number | string;

  // 最少购买数量（如起购数量）
  min?: number;

  // 最多购买数量（如库存控制）
  max?: number;

  // 每次加购数量（如加购数量）
  step?: number;

  // 是否已经售罄
  soldout?: boolean;

};

export type SharedGoodsColumnsItemProps = GoodsData & {
  round?: boolean; // 是否呈现圆角容器
  lazyLoad?: boolean; // 图片是否开启懒加载，需要 LazyLoad 组件使用
  thumbTagAlign?: 'left' | 'center' | 'right'; // 标签位置
  trailingZeros?: boolean; // 是否保留末尾小数位的 0
  memberSymbol?: string; // 会员价的符号标识
  showStep?: boolean; // 是否显示购买数量控制器
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

  showStep: {
    type: Boolean,
    default: true
  },

  // 商品数据 props
  id: String,
  tags: Array,
  thumbTag: String,
  title: String,
  thumb: String,
  desc: String,

  price: [Number, String],
  memberPrice: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥'
  },

  // 购买数量（默认初始购买数量）
  num: Number, // 主要数量
  otherNum: Number, // 次要数量

  // 计价单位
  unit: String,

  // 最少购买数量（如起购数量）
  min: {
    type: Number,
    default: 0
  },

  // 最多购买数量（如库存控制）
  max: {
    type: Number
  },

  // 每次加购数量（如加购数量）
  step: {
    type: Number,
    default: 1
  },

  // 是否售罄
  soldout: {
    type: Boolean,
    default: false
  }
};
