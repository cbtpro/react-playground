export const isDev = process.env.NODE_ENV === 'development';

export const isProd = process.env.NODE_ENV === 'production';

// 判断是否在浏览器中运行
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// 判断是否是微信小程序
export const isWeApp = (() => {
  // @ts-expect-error 小程序环境中存在 wx
  return typeof wx !== 'undefined' && typeof wx.getSystemInfo === 'function';
})();

// 判断是否是支付宝小程序
export const isAlipayApp = (() => {
  // @ts-expect-error 支付宝小程序环境中存在 my
  return typeof my !== 'undefined' && typeof my.getSystemInfo === 'function';
})();
// 判断是否在 H5 环境（可浏览器环境中再细分）
export const isH5 = (() => {
  return isBrowser && !isWeApp && !isAlipayApp;
})();

