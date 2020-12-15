import { mount } from '@vue/test-utils';
import ActionSheet from '..';

test('should emit select event after clicking option', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option' }],
    },
  });

  wrapper.find('.van-action-sheet__item').trigger('click');
  expect(wrapper.emitted('select').length).toEqual(1);
  expect(wrapper.emitted('select')[0][0]).toEqual({ name: 'Option' });
});

test('should call callback function after clicking option', () => {
  const callback = jest.fn();
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option', callback }],
    },
  });

  wrapper.find('.van-action-sheet__item').trigger('click');
  expect(callback).toHaveBeenCalledTimes(1);
});

test('should not emit select event after clicking loading option', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option', loading: true }],
    },
  });

  wrapper.find('.van-action-sheet__item').trigger('click');
  expect(wrapper.emitted('select')).toBeFalsy();
});

test('should not emit select event after clicking disabled option', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option', disabled: true }],
    },
  });

  wrapper.find('.van-action-sheet__item').trigger('click');
  expect(wrapper.emitted('select')).toBeFalsy();
});

test('should emit cancel event after clicking cancel button', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option' }],
      cancelText: 'Cancel',
    },
  });

  wrapper.find('.van-action-sheet__cancel').trigger('click');
  expect(wrapper.emitted('cancel').length).toEqual(1);
});

test('should render subname correctly', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option', subname: 'Subname' }],
      cancelText: 'Cancel',
    },
  });

  expect(wrapper.find('.van-action-sheet__item').html()).toMatchSnapshot();
});

test('should render content after disabling the lazy-render prop', async () => {
  const wrapper = mount(ActionSheet);
  expect(wrapper.find('.van-action-sheet__content').exists()).toBeFalsy();

  await wrapper.setProps({ lazyRender: false });
  expect(wrapper.find('.van-action-sheet__content').exists()).toBeTruthy();
});

test('should render default slot correctly', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      title: 'Title',
    },
    slots: {
      default: () => 'Default',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should allow to use the teleport prop', () => {
  const root = document.createElement('div');
  mount(ActionSheet, {
    props: {
      show: true,
      teleport: root,
    },
  });

  expect(root.querySelector('.van-action-sheet')).toBeTruthy();
});

test('should have "van-popup--round" class when setting the round prop', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      round: true,
    },
  });

  expect(wrapper.find('.van-popup--round').exists()).toBeTruthy();
});

test('should change option color when using the color prop', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option', color: 'red' }],
    },
  });

  expect(wrapper.find('.van-action-sheet__item').element.style.color).toEqual(
    'red'
  );
});

test('should hide close icon when the closeable prop is false', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      title: 'Title',
    },
  });

  expect(wrapper.find('.van-action-sheet__close').exists()).toBeTruthy();

  await wrapper.setProps({ closeable: false });
  expect(wrapper.find('.van-action-sheet__close').exists()).toBeFalsy();
});

test('should allow to custom close icon with closeIcon prop', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      title: 'Title',
      closeIcon: 'cross',
    },
  });

  expect(wrapper.find('.van-action-sheet__close').html()).toMatchSnapshot();
});

test('should render description correctly', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      description: 'This is a description',
    },
  });

  expect(
    wrapper.find('.van-action-sheet__description').html()
  ).toMatchSnapshot();
});

test('should render description slot when match snapshot', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
    },
    slots: {
      description: () => 'Custom Description',
    },
  });

  expect(
    wrapper.find('.van-action-sheet__description').html()
  ).toMatchSnapshot();
});

test('should close after clicking option if close-on-click-action prop is true', () => {
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      actions: [{ name: 'Option' }],
      closeOnClickAction: true,
    },
  });

  const option = wrapper.find('.van-action-sheet__item');
  option.trigger('click');

  expect(wrapper.emitted('update:show').length).toEqual(1);
  expect(wrapper.emitted('update:show')[0][0]).toEqual(false);
});

test('should emit click-overlay event and closed after clicking the overlay', () => {
  const onClickOverlay = jest.fn();
  const wrapper = mount(ActionSheet, {
    props: {
      show: true,
      onClickOverlay,
    },
  });

  wrapper.find('.van-overlay').trigger('click');
  expect(wrapper.emitted('update:show')[0][0]).toEqual(false);
  expect(onClickOverlay).toHaveBeenCalledTimes(1);
});
