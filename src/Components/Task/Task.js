import React from 'react';
import Previous from './previous.png';
import Delete from './delete.png';
import Next from './next.png';
import './Task.css';

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false
		}
	}
	handleMouseMove = () => {
		const { isHovering } = this.state;
		this.setState({isHovering: !isHovering});
	};
	render() {
		const { type, task, onDeleteTask, onMoveTask } = this.props;
		return(
			<div
				className='pa2 mt3 shadow-5 flex flex-row justify-between align-center'
				onMouseEnter={this.handleMouseMove}
				onMouseLeave={this.handleMouseMove}
			>
				<p className="f4">{task}</p>
				<div>
					{
						this.state.isHovering &&
						(type === 'Doing' || type === 'Completed') &&
						<img
							className='icon pointer'
							src={Previous}
							alt='previous'
							onClick={() => {
								onMoveTask(task, type, (type==='Doing'?'To-Do':'Doing'))
							}}
						/>
					}
					{
						this.state.isHovering &&
						<img
							className='icon pointer'
							src={Delete}
							alt='delete'
							onClick={() => {onDeleteTask(task, type);}}
						/>
					}
					{
						this.state.isHovering &&
						(type === 'To-Do' || type === 'Doing') &&
						<img
							className='icon pointer'
							src={Next}
							onClick={() => {
								onMoveTask(task, type, (type==='To-Do'?'Doing':'Completed'));
							}}
							alt='next'
						/>
					}
				</div>
			</div>
		);
	}
};

export default Task;