# GoodsThree

### Install

```js
import Vue from 'vue';
import { GoodsThree } from '@mudas/vant';

Vue.use(GoodsThree);
```

## Usage

### Basic Usage

```html
<van-cell-group>
  <van-cell title="Cell title" value="Content" />
  <van-cell title="Cell title" value="Content" label="Description" />
</van-cell-group>
```


## API
### Cell Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | _number \| string_ | - |
| value | Right text | _number \| string_ | - |


### Cell Events

| Event | Description               | Arguments      |
| ----- | ------------------------- | -------------- |
| click | Triggered when click cell | _event: Event_ |


### Cell Slots

| Name       | Description                       |
| ---------- | --------------------------------- |
| default    | Custom value                      |
| icon       | Custom icon                       |
