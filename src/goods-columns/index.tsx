// Utils
import { createNamespace, isDef, oneOf } from '../utils';
import { inherit } from '../utils/functional';

// Components
import Grid from '../grid';
import GoodsColumnsItem from '../goods-columns-item';

// Types
import { CreateElement, RenderContext } from 'vue/types';
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

  const classes = [
    bem({
      col1: columnNum === 1,
      col2: columnNum === 2,
      col3: columnNum === 3
    })
  ];

  const Goods = props.goods.map(item => {
    console.warn('GoodsColumnsItem:', item);
    return (
      <GoodsColumnsItem title={item.title}
                        tags={item.tags}
                        thumb={item.thumb}
                        thumbTag={item.thumbTag}
                        thumbTagAlign={props.thumbTagAlign}
                        trailingZeros={props.trailingZeros}
                        round={props.round}
                        lazyLoad={props.lazyLoad}
                        desc={item.desc}
                        num={item.num}
                        price={item.price}
                        memberPrice={item.memberPrice}
                        originPrice={item.originPrice}
                        currency={item.currency}/>
    );
  });

  // {slots.default?.()}

  const Group = (
    <Grid class={classes}
          column-num={columnNum}
          gutter={props.gutter}
          border={props.border}
          {...inherit(ctx, true)}>
      {Goods}
    </Grid>
  );

  return Group;
}

GoodsColumns.props = {
  ...goodsColumnsProps
};

export default createComponent<SharedGoodsColumnsProps>(GoodsColumns);

