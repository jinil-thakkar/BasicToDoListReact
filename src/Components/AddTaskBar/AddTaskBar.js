import React from 'react';

class AddTaskBar extends React.Component {
	constructor(props) {
		super(props);
		this.bar = React.createRef();
	}
	keyPress = (e) => {
		if (e.key === 'Enter') {
			this.props.onAddToDoTasks();
			this.bar.current.value = '';
		}
	};
	render(){
		const { onInputChange, onAddToDoTasks } = this.props;
		return(
			<div className='flex items-center mw7 mw7-ns center pa3 ph5-ns'>
				<input
					onKeyDown={this.keyPress}
					className='w-70 h3 f3'
					ref={this.bar}
					type='text'
					defaultValue=''
					min=''
					placeholder=' Add Task..'
					onChange={onInputChange}
				/>
				<button
					className='h3 w4 f3'
					onClick={() => {
						onAddToDoTasks();
						this.bar.current.value = '';
				}}
				>Add</button>
			</div>
		);
	}
};

export default AddTaskBar;