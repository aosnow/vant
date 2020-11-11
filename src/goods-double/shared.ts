// ------------------------------------------------------------------------------
// interface: shared
// author: mudas( mschool.tech )
// created: 2020/7/20
// ------------------------------------------------------------------------------

import { GoodsData } from '../goods-columns-item/shared';

export type SharedGoodsWrapProps = {
  limit?: number;
  gutter?: number | string; // 商品块间距
  spacing?: number;// 商品整体容器上下间距
  round?: boolean;
  shadow?: boolean;
  lazyLoad?: boolean; // 图片是否开启懒加载，需要 LazyLoad 组件使用
  border?: boolean;
  memberSymbol?: string;
  thumbTag: string;
  thumbTagAlign?: 'left' | 'center' | 'right'; // 标签位置
  trailingZeros?: boolean; // 是否保留末尾小数位的 0
  showStep?: boolean; // 是否显示购买数量控制器（三列布局不显示）
  theme?: 'normal' | 'transparent'; // 标题栏风格

  dataSource: Array<GoodsData>;
};

export const goodsWrapProps = {
  limit: { type: Number, default: 2 },
  gutter: { type: [Number, String], default: 5 },
  spacing: { type: Number, default: 5 },
  round: { type: Boolean, default: true },
  shadow: { type: Boolean, default: true },
  lazyLoad: { type: Boolean, default: true },
  memberSymbol: { type: String, default: 'VIP' },
  thumbTag: { type: String, default: 'NEW' },
  thumbTagAlign: { type: String, default: 'left' },
  trailingZeros: { type: Boolean, default: true },
  showStep: { type: Boolean, default: false },
  theme: { type: String, default: 'normal' },

  dataSource: {
    type: Array,
    default() {
      return [
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          unit: '个',
          originPrice: 30,
          price: 20
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          price: 21
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          price: 22
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          price: 23
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          price: 24
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          price: 25
        }
      ];
    }
  }
};
