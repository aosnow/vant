组件设计指南
===

# 基本结构
## 组成部分
以下如例：
```
goods-double
    - demo
        - index.vue // 预览界面主体内容
    - index.less    // 组件样式
    - index.tsx     // 组件主体代码
    - README.md     // 英文文档API
    - README.zh-CN.md   // 中文文档API
    - shared.ts     // 共享类型声明
```

> 对于子级依赖组件，无须 `demo、README` 内容。

## 类型声明
对新组件增加类型声明：`(types/index.d.ts)`
```typescript
// custom
export class GoodsSingle extends VanComponent {}
export class GoodsDouble extends VanComponent {}
export class GoodsThree extends VanComponent {}
export class GoodsColumnsItem extends VanComponent {}
```
