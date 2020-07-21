// ------------------------------------------------------------------------------
// interface: shared
// author: mudas( mschool.tech )
// created: 2020/7/20
// ------------------------------------------------------------------------------

import { GoodsData } from '../goods-columns-item/shared';

export type SharedGoodsWrapProps = {
  limit?: number;
  gutter?: number | string;
  round?: boolean;
  lazyLoad?: boolean; // 图片是否开启懒加载，需要 LazyLoad 组件使用
  border?: boolean;
  memberSymbol?: string;
  thumbTagAlign?: 'left' | 'center' | 'right'; // 标签位置
  trailingZeros?: boolean; // 是否保留末尾小数位的 0
  showStep?: boolean; // 是否显示购买数量控制器

  dataSource: Array<GoodsData>;
};

export const goodsWrapProps = {
  limit: { type: Number, default: 2 },
  gutter: { type: [Number, String], default: 5 },
  round: { type: Boolean, default: true },
  lazyLoad: { type: Boolean, default: true },
  memberSymbol: { type: String, default: 'VIP' },
  thumbTagAlign: { type: String, default: 'left' },
  trailingZeros: { type: Boolean, default: true },
  showStep: { type: Boolean, default: false },

  dataSource: {
    type: Array,
    default() {
      return [
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          thumbTag: '新品',
          price: 20
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          thumbTag: '新品',
          price: 21
        },
        {
          id: (Math.random() * 10000000 >> 0).toString(),
          title: '商品名称最多1行',
          thumbTag: '新品',
          price: 20
        }
      ];
    }
  }
};
