const REGISTRY_URL = 'http://51.68.145.72:5000/v2';
const fetchRepos = async () => {
	const res = await fetch(`${REGISTRY_URL}/_catalog`);
	const data = await res.json();
	return data;
};

const fetchTags = async (imageName) => {
	const res = await fetch(`${REGISTRY_URL}/${imageName}/tags/list`);
	const data = await res.json();
	return data;
};

const selectEl = document.querySelector('select#repoSelect');
const tbodyEl = document.querySelector('table#tagsTable tbody');

const tags = new Object();

fetchRepos().then(data => {
	let defaultRepo = data['repositories'][0];
	for(let v of data['repositories']) {
		const newOptEl = document.createElement('option');
		newOptEl.setAttribute("value",v);
		newOptEl.textContent = v;
		selectEl.appendChild(newOptEl);
		fetchTags(v).then(item => {
			tags[v] = new Array();
			for(let i = 0; i < item['tags'].length; i++) {
				tags[v].push(parseFloat(item['tags'][i]));
			}
			setupDefaultTable(defaultRepo);
		});
	}
});

selectEl.addEventListener('change',(e) => {
	const oldTrs = document.querySelectorAll('table#tagsTable tbody tr');
	for(let v of oldTrs) {
		tbodyEl.removeChild(v);
	}
	tags[e.target.value].forEach(el => {
		const newTrEl = document.createElement('tr');
		const newTdEl = [document.createElement('td'),document.createElement('td')];
		newTdEl[0].textContent = e.target.value;
		newTdEl[1].textContent = el;
		newTdEl.forEach(val => {
			newTrEl.appendChild(val);
		});
		tbodyEl.appendChild(newTrEl);
	});
});

const setupDefaultTable = (defaultRepo) => {
	tags[defaultRepo].forEach(el => {
		const newTrEl = document.createElement('tr');
		const newTdEl = [document.createElement('td'),document.createElement('td')];
		newTdEl[0].textContent = defaultRepo;
		newTdEl[1].textContent = el;
		newTdEl.forEach(val => {
			newTrEl.appendChild(val);
		});
		tbodyEl.appendChild(newTrEl);
	});
};
