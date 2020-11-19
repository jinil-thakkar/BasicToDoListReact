import React from 'react';
import Task from '../Task/Task';

class TaskCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false
		}
	}
	render() {
		const { type, list, onDelete, onMoveTask } = this.props;
		return(
			<div className='flex flex-column flex-start w-20 min-h-100 tc'>
				<div className='bg-green shadow-5'>
					<h2 className='white f3'>{type}</h2>
				</div>
				<div className='flex flex-column'>
					{list.map((task, i) => {
						return(
							<Task
								type={type}
								task={task}
								onMoveTask={onMoveTask}
								onDeleteTask={onDelete}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default TaskCard;