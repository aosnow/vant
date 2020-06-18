// Utils
import { createNamespace, isDef, oneOf } from '../utils';
import { emit, inherit } from '../utils/functional';

// Components
import Grid from '../grid';
import GoodsColumnsItem from '../goods-columns-item';

// Types
import { CreateElement, RenderContext, VNodeData } from 'vue/types';
import { functionalRoute } from '../utils/router';
import { DefaultSlots } from '../utils/types';
import { goodsColumnsProps, SharedGoodsColumnsProps } from './shared';

export type GoodsColumnsSlots = DefaultSlots & {};

const [createComponent, bem] = createNamespace('goods-columns');

function GoodsColumns(
  h: CreateElement,
  props: SharedGoodsColumnsProps,
  slots: GoodsColumnsSlots,
  ctx: RenderContext<SharedGoodsColumnsProps>
) {

  // 默认为 1，且值控制在 1,2,3 中
  const columnNum = !isDef(props.size) || !oneOf([1, 2, 3], props.size) ? 1 : props.size;

  // --------------------------------------------------------------------------
  //
  // Event handlers
  //
  // --------------------------------------------------------------------------

  function onClick(event: Event) {
    emit(ctx, 'click', event);
    functionalRoute(ctx);
  }

  function onThumbClick(event: MouseEvent) {
    emit(ctx, 'click-thumb', event);
  }

  function onChange(value: string, detail: { name: string }) {
    console.warn('countChangeHandler:', { id: detail.name, value });
    emit(ctx, 'change', { id: detail.name, value });
  }

  // --------------------------------------------------------------------------
  //
  // renderer
  //
  // --------------------------------------------------------------------------

  const classes = [
    bem({
      col1: columnNum === 1,
      col2: columnNum === 2,
      col3: columnNum === 3
    })
  ];

  function GoodsChildren() {
    const { round, lazyLoad, memberSymbol, thumbTagAlign, trailingZeros, showStep } = props;

    return props.goods.map(item => {

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

  // {slots.default?.()}

  return (
    <Grid class={classes}
          column-num={columnNum}
          gutter={props.gutter}
          border={props.border}
          {...inherit(ctx, true)}>
      {GoodsChildren()}
    </Grid>
  );
}

GoodsColumns.props = {
  ...goodsColumnsProps
};

export default createComponent<SharedGoodsColumnsProps>(GoodsColumns);

