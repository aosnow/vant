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
import { goodsWrapProps, SharedGoodsWrapProps } from './shared';

// slots
export type GoodsDoubleSlots = DefaultSlots & {};

const [createComponent, bem] = createNamespace('goods-double');

function GoodsDouble(
  h: CreateElement,
  props: SharedGoodsWrapProps,
  slots: GoodsDoubleSlots,
  ctx: RenderContext<SharedGoodsWrapProps>
) {

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
    const { round, lazyLoad, memberSymbol, thumbTagAlign, trailingZeros, showStep, dataSource, limit } = props;

    return (dataSource.slice(0, limit)).map(item => {
      const itemData: VNodeData = {
        attrs: {
          ...item,
          round,
          lazyLoad,
          memberSymbol,
          thumbTagAlign,
          trailingZeros,
          showStep
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
    'padding-top': `${props.spacing}px`,
    'padding-bottom': `${props.spacing}px`
  };

  // 若需使用插槽，如默认插槽
  // {slots.default?.()}

  // 输出组件主体 template
  return (
    <Grid class={classes}
          border={false}
          column-num={2}
          gutter={props.gutter}
          style={Spacing}
          {...inherit(ctx, true)}>
      {Children()}
    </Grid>
  );
}

GoodsDouble.props = {
  ...goodsWrapProps
};

export default createComponent<SharedGoodsWrapProps>(GoodsDouble);

