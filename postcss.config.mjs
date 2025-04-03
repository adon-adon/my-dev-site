/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		tailwindcss: {},
		"postcss-nested": {},
		"postcss-px-conversion": {
			unitToConvert: "px", // 需要转换的单位
			viewportWidth: 1920, // 设计稿宽度（一般 375 或 750）
			unitPrecision: 6, // 转换后的精度，即小数点位数
			propList: ["*"], // 需要转换的属性，['*'] 代表所有属性都转换
			viewportUnit: "vw", // 视口单位
			fontViewportUnit: "vw", // 字体使用的视口单位
			selectorBlackList: [], // 指定不转换的类
			minPixelValue: 1, // 小于 1px 不转换
			mediaQuery: false, // 允许在媒体查询中转换 px
			replace: true, // 是否直接替换 px 为 vw
			exclude: [/node_modules/], // 忽略某些文件夹
		},
	},
};

export default config;
