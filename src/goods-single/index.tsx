// --------------------------------------------------
// component: index
// author: mudas( mschool.tech )
// created: 2020/7/17
// --------------------------------------------------

// Utils
import { createNamespace } from '../utils';
import { inherit } from '../utils/functional';

// Components
import Grid from '../grid';
import GoodsColumnsItem from '../goods-columns-item';

// Types
import { CreateElement, RenderContext, VNodeData } from 'vue/types';
import { DefaultSlots } from '../utils/types';
import { goodsWrapProps, SharedGoodsWrapProps } from '../goods-double/shared';

// slots
export type GoodsSingleSlots = DefaultSlots & {};

const [createComponent, bem] = createNamespace('goods-single');

function GoodsSingle(
  h: CreateElement,
  props: SharedGoodsWrapProps,
  slots: GoodsSingleSlots,
  ctx: RenderContext<SharedGoodsWrapProps>
) {

  const { dataSource, limit, gutter, spacing, ...otherProps } = props;

  // --------------------------------------------------------------------------
  //
  // Event handlers
  //
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  //
  // renderer
  //
  // --------------------------------------------------------------------------

  const classes = [
    bem({})
  ];

  function Children() {
    // const { round, shadow, lazyLoad, memberSymbol, thumbTag, thumbTagAlign, trailingZeros, showStep, dataSource, limit } = props;

    const source = limit && limit > 0 ? dataSource.slice(0, limit) : dataSource;
    return source.map(item => {
      const itemData: VNodeData = {
        attrs: {
          ...otherProps,
          ...item

          // round,
          // shadow,
          // lazyLoad,
          // memberSymbol,
          // thumbTag,
          // thumbTagAlign,
          // trailingZeros,
          // showStep
        },
        on: { ...ctx.listeners }
      };

      return (
        <GoodsColumnsItem {...itemData}/>
      );
    });
  }

  // 上下间距
  const Spacing = {
    'padding-top': `${spacing}px`,
    'padding-bottom': `${spacing}px`
  };

  // 若需使用插槽，如默认插槽
  // {slots.default?.()}

  // 输出组件主体 template
  return (
    <Grid class={classes}
          border={false}
          column-num={1}
          gutter={gutter}
          style={Spacing}
          {...inherit(ctx, true)}>
      {Children()}
    </Grid>
  );
}

GoodsSingle.props = {
  ...goodsWrapProps,
  limit: { type: Number, default: 1 },
  theme: { type: String, default: 'transparent' }
};

export default createComponent<SharedGoodsWrapProps>(GoodsSingle);

