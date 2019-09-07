module.exports = {
	rules: [
		{
			test: /\.pug$/,
			loader: 'pug-plain-loader'
		},
		{
			test: /\.svg$/,
			loader: 'svg-inline-loader'
		}
	]
}
