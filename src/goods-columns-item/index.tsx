// Utils
import { createNamespace, isDef } from '../utils';

// Components
import GridItem from '../grid-item';
import Image from '../image';
import Tag from '../tag';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { emit, inherit } from '../utils/functional';
import { functionalRoute, routeProps, RouteProps } from '../utils/router';
import { currency, removeTrailingZeros } from '../utils/format/currency';
import { ScopedSlot, DefaultSlots } from '../utils/types';
import { goodsColumnsItemProps, SharedGoodsColumnsItemProps } from './shared';

export type GoodsColumnsItemProps = RouteProps & SharedGoodsColumnsItemProps;

export type GoodsColumnsItemSlots = DefaultSlots & {
  tags?: ScopedSlot;
  title?: ScopedSlot;
  desc?: ScopedSlot;
  thumb?: ScopedSlot;
  'member-price'?: ScopedSlot;
  price?: ScopedSlot;
  'origin-price'?: ScopedSlot;
  num?: ScopedSlot;
  footer?: ScopedSlot;
};

export type GoodsColumnsItemEvents = {
  onClick?(event: Event): void;
};

const [createComponent, bem] = createNamespace('goods-columns-item');

function GoodsColumnsItem(
  h: CreateElement,
  props: GoodsColumnsItemProps,
  slots: GoodsColumnsItemSlots,
  ctx: RenderContext<GoodsColumnsItemProps>
) {

  const { tags, title, thumb, desc, num, price, memberPrice, originPrice, trailingZeros, memberSymbol } = props;

  const showNum = slots.num || isDef(num);
  const showMemberPrice = slots['member-price'] || isDef(memberPrice);
  const showPrice = slots.price || isDef(price);
  const showOriginPrice = slots['origin-price'] || isDef(originPrice);

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

  // --------------------------------------------------------------------------
  //
  // renderer
  //
  // --------------------------------------------------------------------------

  // ----------------------------------------
  // 图片和角标
  // ----------------------------------------
  function ThumbTag() {
    if (props.thumbTag) {
      return (
        <Tag type="danger" class={[bem('thumb-tag', [props.thumbTagAlign])]}>
          {props.thumbTag}
        </Tag>
      );
    }
  }

  function Thumb() {
    if (slots.thumb || thumb) {
      return (
        <div class={bem('thumb')} onClick={onThumbClick}>
          {slots.thumb ? (
            slots.thumb()
          ) : (
             <Image src={thumb}
                    width="100%"
                    height="100%"
                    fit="cover"
                    lazy-load={props.lazyLoad}/>
           )}
          {ThumbTag()}
        </div>
      );
    }
  }

  // ----------------------------------------
  // 商品标题
  // ----------------------------------------

  function Title() {
    const showLabel = slots.title || isDef(title);

    if (showLabel) {
      return (
        <div class={[bem('detail-title')]}>
          {slots.title ? slots.title() : title}
        </div>
      );
    }
  }

  // ----------------------------------------
  // 商品描述
  // ----------------------------------------

  function Desc() {
    const showDesc = slots.desc || isDef(desc);

    if (showDesc) {
      return (
        <div class={[bem('detail-desc')]}>
          {slots.desc ? slots.desc() : desc}
        </div>
      );
    }
  }

  // ----------------------------------------
  // 商品标签
  // ----------------------------------------

  function Tags() {
    const showTags = slots.tags || isDef(tags);

    if (showTags) {
      return (
        <div class={[bem('detail-tags')]}>
          {slots.tags ? slots.tags() : (
            tags.map(tag => {
              return (
                <Tag plain type="danger">{tag}</Tag>
              );
            })
          )}
        </div>
      );
    }
  }

  // ----------------------------------------
  // 商品价格
  // ----------------------------------------

  function MemberPrice() {
    if (showMemberPrice) {
      let price = currency(memberPrice || 0).format();
      price = trailingZeros ? price : removeTrailingZeros(price);
      return (
        <div class={bem('member')}>
          <span class={bem('member-price')}>{props.currency}{price}</span>
          <span class={bem('member-symbol')}>{memberSymbol}</span>
        </div>
      );
    }
  }

  function PriceContent() {
    let curPrice = currency(price).format();
    curPrice = trailingZeros ? curPrice : removeTrailingZeros(curPrice);
    const priceArr = curPrice.split('.');

    const priceDecimal = priceArr.length <= 1 ? '' : (
      <span class={bem('price-decimal')}>.{priceArr[1]}</span>
    );

    return (
      <div>
        <span class={bem('price-currency')}>{props.currency}</span>
        <span class={bem('price-integer')}>{priceArr[0]}</span>
        {priceDecimal}
      </div>
    );
  }

  function Price() {
    if (showPrice) {
      return (
        <div class={bem('price')}>
          {slots.price ? slots.price() : PriceContent()}
        </div>
      );
    }
  }

  function OriginPrice() {
    if (showOriginPrice) {
      const slot = slots['origin-price'];
      const price = trailingZeros ? originPrice : removeTrailingZeros(originPrice || 0);
      return (
        <div class={bem('origin-price')}>
          {slot ? slot() : `${props.currency} ${price}`}
        </div>
      );
    }
  }

  function Footer() {
    if (slots.footer) {
      return <div class={bem('footer')}>{slots.footer()}</div>;
    }
  }

  const classes = [
    bem({
      round: props.round
    })
  ];

  return (
    <GridItem class={classes} onClick={onClick} {...inherit(ctx)}>
      {Thumb()}
      <div class={bem('detail')}>
        {Title()}
        {Desc()}
        {Tags()}
        <div class={[bem('detail-bottom')]}>
          {MemberPrice()}
          {Price()}
          {OriginPrice()}
        </div>
      </div>
      {Footer()}
    </GridItem>
  );
}

GoodsColumnsItem.props = {
  ...goodsColumnsItemProps,
  ...routeProps
};

export default createComponent<GoodsColumnsItemProps, GoodsColumnsItemEvents, GoodsColumnsItemSlots>(GoodsColumnsItem);
