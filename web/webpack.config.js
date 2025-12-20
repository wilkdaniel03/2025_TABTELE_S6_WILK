require('dotenv').config();
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const parts = require('./webpack.parts');

const getConfig = () => {
	const conf = [common,parts.loadHtml(),parts.loadTsLoader(),parts.loadCssLoader(),parts.loadFileLoader(),parts.loadBabelLoader()];
	if(common.mode === 'development') {
		conf.push({ watch: true });
		conf.push(parts.runDevServer());
	}
	return conf;
};

module.exports = merge(getConfig());
