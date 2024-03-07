import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: '#F4801A',
    fontFamily: 'DDJingBu'
  },
  components: {
    Tabs: {
      /**
       * colorBorderSecondary
       * 默认值: #f0f0f0
       * 比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。
       */
      colorBorderSecondary: '#70707037',
      /**
       * 横向标签页标签间距
       * 默认值：32
       */
      horizontalItemGutter: 16
    }
  }
};
