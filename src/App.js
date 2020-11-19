import React from 'react';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import AddTaskBar from './Components/AddTaskBar/AddTaskBar';
import TaskCard from './Components/TaskCard/TaskCard';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isEmpty: true,
			input: '',
			toDoTasks: [],
			doingTasks: [],
			completedTasks: []
		}
	}
	onInputChange = (event) => {
		this.setState({ input: event.target.value});
	};
	addToDoTasks = () => {
		const task = this.state.input;
		if (task !== '') {
			this.setState({
				toDoTasks: [...this.state.toDoTasks, task],
				input: '',
				isEmpty: false
			});
		}
	};

	deleteTask = (task, type) => {
		var array = [];
		if (type === 'To-Do') {
			array = this.state.toDoTasks;
		} else if (type === 'Doing') {
			array = this.state.doingTasks;
		} else {
			array = this.state.completedTasks;
		}
		const index = array.indexOf(task);
		array.splice(index, 1);
		if (type === 'To-Do') {
			this.setState({
				toDoTasks: array,
			})
		} else if (type === 'Doing') {
			this.setState({
				doingTasks: array
			})
		} else {
			this.setState({
				completedTasks: array
			})
		}
		if (this.state.toDoTasks.length + this.state.doingTasks.length + this.state.completedTasks.length === 0) {
			this.setState({ isEmpty: true });
		}
	};

	moveTask = (task, moveTaskFrom, moveTaskTo) => {
		var moveFromArray=[];
		var moveToArray=[];
		if (moveTaskFrom === 'To-Do') {
			moveFromArray = this.state.toDoTasks;
		}
		else if (moveTaskFrom === 'Doing') {
			moveFromArray = this.state.doingTasks;
		} else {
			moveFromArray = this.state.completedTasks;
		}
		if (moveTaskTo === 'To-Do') {
			moveToArray = this.state.toDoTasks;
		}
		else if (moveTaskTo === 'Doing') {
			moveToArray = this.state.doingTasks;
		} else {
			moveToArray = this.state.completedTasks;
		}
		const index = moveFromArray.indexOf(task);
		moveFromArray.splice(index, 1);
		moveToArray = [task, ...moveToArray];
		if (moveTaskFrom === 'To-Do') {
			this.setState({
				toDoTasks: moveFromArray,
				doingTasks: moveToArray
			});
		} else if (moveTaskFrom === 'Completed') {
			this.setState({
				completedTasks: moveFromArray,
				doingTasks: moveToArray
			});
		} else {
			if (moveTaskTo === 'To-Do') {
				this.setState({
					doingTasks: moveFromArray,
					toDoTasks: moveToArray
				});
			} else {
				this.setState({
					doingTasks: moveFromArray,
					completedTasks: moveToArray
				});
			}
		}
	};

	render() {
		const { isEmpty, toDoTasks, doingTasks, completedTasks } = this.state;
		return(
			<div>
				<NavigationBar />
				<AddTaskBar
					onAddToDoTasks={this.addToDoTasks}
					onInputChange={this.onInputChange}
				/>
				{ isEmpty
				? <div className='notasks'>
					<p>Have something to accomplish today?</p>
					<p>Add up some Tasks..</p>
				</div>
				:<div className='flex items-start justify-around'>
					<TaskCard
						type='To-Do'
						list={toDoTasks}
						onDelete={this.deleteTask}
						onMoveTask={this.moveTask}
					/>
					<TaskCard
						type='Doing'
						list={doingTasks}
						onDelete={this.deleteTask}
						onMoveTask={this.moveTask}
					/>
					<TaskCard
						type='Completed'
						list={completedTasks}
						onDelete={this.deleteTask}
						onMoveTask={this.moveTask}
					/>
				</div> }
			</div>
		);
	}
}

export default App;