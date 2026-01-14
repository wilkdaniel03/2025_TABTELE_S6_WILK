const path = require('path');
const process = require('process');

const MODE = process.env['MODE'] === 'dev' ? 'development' : 'production';
const abs_path = process.cwd();

const aliases = {};
aliases["@features"] = path.join(abs_path,"src","features");
aliases["@components"] = path.join(abs_path,"src","components");
aliases["@pages"] = path.join(abs_path,"src","pages");
aliases["@http"] = path.join(abs_path,"src","http.ts");
aliases["@stores"] = path.join(abs_path,"src","stores");
aliases["@websocket"] = path.join(abs_path,"src","websocket.tsx");

module.exports = {
	mode: MODE,
	resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'], alias: aliases },
	entry: path.join(__dirname,'src','main.tsx'),
	output: {
		publicPath: '/'
	}
};
