import { createRoot } from 'react-dom/client';
import App from './App';

const el = document.querySelector("#root");
if(el === null) {
	console.error("Failed to find container with id root");
} else {
	const root = createRoot(el);
	root.render(<App/>);
}
