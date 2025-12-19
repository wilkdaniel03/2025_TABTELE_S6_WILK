const path = require('path');
const process = require('process');

const MODE = process.env['MODE'] === 'dev' ? 'development' : 'production';

module.exports = {
	mode: MODE,
	resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
	entry: path.join(__dirname,'src','main.tsx')
};
