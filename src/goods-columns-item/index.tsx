// Utils
import { createNamespace, isDef, noop } from '../utils';
import { stopPropagation } from '../utils/dom/event';

// Components
import GridItem from '../grid-item';
import Image from '../image';
import Icon from '../icon';
import Tag from '../tag';
import Stepper from '../stepper';

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
  footer?: ScopedSlot;
};

export type GoodsColumnsItemEvents = {
  onClick?(event: Event): void;
  onThumbClick?(event: Event): void;
  onChange?(value: string, detail: { name: string }): void;
};

const [createComponent, bem, createI18N] = createNamespace('goods-columns-item');

function GoodsColumnsItem(
  h: CreateElement,
  props: GoodsColumnsItemProps,
  slots: GoodsColumnsItemSlots,
  ctx: RenderContext<GoodsColumnsItemProps>
) {

  const { tags, title, thumb, desc, unit, price, memberPrice, originPrice, trailingZeros, soldout } = props;

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
    stopPropagation(event);
    emit(ctx, 'click-thumb', event);
  }

  function onChange(value: string, detail: { name: string }) {
    emit(ctx, 'change', value, detail);
  }

  function stepperClick(event: MouseEvent) {
    stopPropagation(event);
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
    // if (slots.thumb || thumb) {
    const handler = ctx.listeners['click-thumb'];

    const ThumbHolder = thumb ?
                        (
                          <Image src={thumb}
                                 width="100%"
                                 height="100%"
                                 fit="cover"
                                 lazy-load={props.lazyLoad}/>
                        ) : (
                          <Icon class={bem('thumb-icon')} name="bag-o"/>
                        );

    return (
      <div class={bem('thumb')} onClick={handler ? onThumbClick : noop}>
        {slots.thumb ? (
          slots.thumb()
        ) : ThumbHolder}
        {ThumbTag()}
      </div>
    );
    // }
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
  // 数量控制
  // ----------------------------------------

  // 当显示数量控制器时
  function GoodsNum() {
    const { id, num, min, max, step, showStep } = props;

    if (showStep && !soldout) {
      return (
        <div class={[bem('detail-step')]} onClick={stepperClick}>
          <Stepper name={id}
                   theme="round"
                   value={num}
                   min={min}
                   max={max}
                   step={step}
                   default-value={0}
                   button-size={22}
                   input-width={22}
                   disable-input
                   onChange={onChange}/>
        </div>
      );
    }
  }

  // 当仅显示数量时（控制器隐藏）
  function OnlyGoodsNum() {
    const { num, otherNum, showStep } = props;

    if (!showStep) {
      const Num = !isDef(num) ? '' : (
        <Tag round type='danger'>{num}</Tag>
      );

      const OtherNum = !isDef(otherNum) ? '' : (
        <Tag round type='default'>{otherNum}</Tag>
      );

      return (
        <div class={[bem('num-tag')]}>
          {OtherNum}{Num}
        </div>
      );
    }
  }

  // ----------------------------------------
  // 是否售罄
  // ----------------------------------------

  function SoldoutHold() {
    if (soldout) {
      return (
        <div class={[bem('soldout')]}>
          {createI18N('soldout')}
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
          <span class={bem('member-symbol')}>{props.memberSymbol}</span>
        </div>
      );
    }
  }

  function PriceContent() {
    let curPrice = currency(price).format();
    curPrice = trailingZeros ? curPrice : removeTrailingZeros(curPrice);
    const priceArr = curPrice.split('.');

    const PriceDecimal = priceArr.length <= 1 ? '' : (
      <span class={bem('price-decimal')}>.{priceArr[1]}</span>
    );

    const PriceUnit = !unit ? '' : (
      <span class={bem('price-unit')}>/{unit}</span>
    );

    return (
      <div>
        <span class={bem('price-currency')}>{props.currency}</span>
        <span class={bem('price-integer')}>{priceArr[0]}</span>
        {PriceDecimal}
        {PriceUnit}
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
      let curPrice: any = currency(originPrice || 0).format();
      curPrice = trailingZeros ? curPrice : removeTrailingZeros(curPrice);
      return (
        <div class={bem('origin-price')}>
          {slot ? slot() : `${props.currency} ${curPrice}`}
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
      round: props.round,
      soldout: props.soldout
    })
  ];

  return (
    <GridItem class={classes} onClick={onClick} {...inherit(ctx)}>
      {Thumb()}
      {OnlyGoodsNum()}
      {SoldoutHold()}
      <div class={bem('detail')}>
        {Title()}
        {Desc()}
        {Tags()}
        {MemberPrice()}
        <div class={[bem('detail-bottom')]}>
          {Price()}
          {OriginPrice()}
          {GoodsNum()}
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
