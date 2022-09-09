import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Sidebar/Sidebar';
import ToDo from './pages/ToDo';
import Completed from './pages/Completed';
import Settings from './pages/Settings';
import MainContext from './MainContext';

function App() {
	const [ refresh, setRefresh ] = useState(false);
	const [ list, setList ] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
	const [ doneList, setDoneList ] = useState(() => JSON.parse(localStorage.getItem('doneTasks')) || []);
	const [ chosenCategory, setChosenCategory ] = useState('');
	const [ filteredList, setFilteredList ] = useState([]);
	const [ categories, setCategories ] = useState(
		() => JSON.parse(localStorage.getItem('categories')) || [ 'Personal', 'Home', 'Work' ]
	);
	useEffect(
		() => {
			localStorage.setItem('categories', JSON.stringify(categories));
		},
		[ categories ]
	);
	if (chosenCategory) {
		const filtered = JSON.parse(localStorage.getItem('tasks'));
		filtered.filter((task) => {
			return task.category === chosenCategory;
		});
		setFilteredList(filtered);
	}
	console.log(filteredList);
	const contextValues = {
		list,
		setList,
		doneList,
		setDoneList,
		categories,
		setCategories,
		chosenCategory,
		setChosenCategory,
		filteredList,
		setFilteredList
	};

	return (
		<div className="App">
			<BrowserRouter>
				<MainContext.Provider value={contextValues}>
					<Header />
					<Routes>
						<Route path="/" element={<ToDo />} />
						<Route path="/completed" element={<Completed />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</MainContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
