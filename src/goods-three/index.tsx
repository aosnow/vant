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
export type GoodsThreeSlots = DefaultSlots & {};

const [createComponent, bem] = createNamespace('goods-three');

function GoodsThree(
  h: CreateElement,
  props: SharedGoodsWrapProps,
  slots: GoodsThreeSlots,
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

  // 若需使用插槽，如默认插槽
  // {slots.default?.()}

  // 输出组件主体 template
  return (
    <Grid class={classes}
          border={false}
          column-num={3}
          gutter={props.gutter}
          {...inherit(ctx, true)}>
      {Children()}
    </Grid>
  );
}

GoodsThree.props = {
  ...goodsWrapProps,
  limit: { type: Number, default: 3 }
};

export default createComponent<SharedGoodsWrapProps>(GoodsThree);
