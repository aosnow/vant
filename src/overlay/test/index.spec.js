import { mount } from '@vue/test-utils';
import Overlay from '..';

test('should change z-index when using z-index prop', () => {
  const wrapper = mount(Overlay, {
    props: {
      show: true,
      zIndex: 99,
    },
  });

  const overlay = wrapper.find('.van-overlay').element;
  expect(overlay.style.zIndex).toEqual('99');
});

test('should allow to custom class name with class-name prop', () => {
  const wrapper = mount(Overlay, {
    props: {
      show: true,
      className: 'foo',
    },
  });

  const overlay = wrapper.find('.van-overlay').element;
  expect(overlay.classList.contains('foo')).toBeTruthy();
});

test('should allow to custom style with custom-style prop', () => {
  const wrapper = mount(Overlay, {
    props: {
      show: true,
      customStyle: {
        backgroundColor: 'red',
      },
    },
  });

  const overlay = wrapper.find('.van-overlay').element;
  expect(overlay.style.backgroundColor).toEqual('red');
});

test('should change animation duration when using duration prop', () => {
  const wrapper = mount(Overlay, {
    props: {
      show: true,
      duration: 1,
    },
  });

  const overlay = wrapper.find('.van-overlay').element;
  expect(overlay.style.animationDuration).toEqual('1s');
});

test('should render default slot correctly', () => {
  const wrapper = mount(Overlay, {
    slots: {
      default: () => 'Custom Default',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should allow to touchmove when lock-scroll is false', async () => {
  const onTouchMove = jest.fn();
  const wrapper = mount({
    render() {
      return (
        <div onTouchmove={onTouchMove}>
          <Overlay show lockScroll={false} />
        </div>
      );
    },
  });

  const overlay = wrapper.find('.van-overlay');
  overlay.trigger('touchmove');
  expect(onTouchMove).toHaveBeenCalledTimes(1);
});

test('should not allow to touchmove when lock-scroll is true', async () => {
  const onTouchMove = jest.fn();
  const wrapper = mount({
    render() {
      return (
        <div onTouchmove={onTouchMove}>
          <Overlay show lockScroll />
        </div>
      );
    },
  });

  const overlay = wrapper.find('.van-overlay');
  overlay.trigger('touchmove');
  expect(onTouchMove).toHaveBeenCalledTimes(0);
});
