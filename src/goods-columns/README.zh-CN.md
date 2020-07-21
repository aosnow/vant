# GoodsColumns 多列商品展示

### 引入

```js
import Vue from 'vue';
import { GoodsColumns } from '@mudas/vant';

Vue.use(GoodsColumns);
```

## 代码演示

### 基础用法

`Cell`可以单独使用，也可以与`CellGroup`搭配使用。`CellGroup`可以为`Cell`提供上下外边框

```html
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
```

### 使用插槽

如以上用法不能满足你的需求，可以使用插槽来自定义内容

```html
<van-cell value="内容" is-link>
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span class="custom-title">单元格</span>
    <van-tag type="danger">标签</van-tag>
  </template>
</van-cell>

<van-cell title="单元格" icon="shop-o">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon>
    <van-icon name="search" style="line-height: inherit;" />
  </template>
</van-cell>
```

## API

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | _number \| string_ | - |
| size | 单元格大小，可选值为 `large` | _string_ | - |

### Cell Events

| 事件名 | 说明             | 回调参数       |
| ------ | ---------------- | -------------- |
| click  | 点击单元格时触发 | _event: Event_ |

### Cell Slots

| 名称       | 说明                          |
| ---------- | ----------------------------- |
| default    | 自定义右侧 value 的内容       |
| title      | 自定义左侧 title 的内容       |
