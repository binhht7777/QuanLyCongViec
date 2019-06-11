import React, { Component } from 'react';

class TaskItem extends Component {

   onUpdateStatus = () => {
      this.props.onUpdateStatus(this.props.task.id);
   }

   onDelete = () => {
      this.props.onDelete(this.props.task.id);
   }

   onUpdate = () => {
      this.props.onUpdate(this.props.task.id);
   }

   render() {
      var { task, index } = this.props;

      return (
         <tr>
            <td>{index}</td>
            <td>{task.name}</td>
            <td className="text-center">
               <span
                  className={task.status === true ? 'label label-success' : 'label label-danger'}
                  onClick={this.onUpdateStatus}
               >
                  {task.status === true ? 'ACTIVE' : 'INACTIVE'}
               </span>
            </td>
            <td className="text-center">
               <button
                  type="button"
                  className="btn btn-warning"
                  onClick={this.onUpdate}
               >
                  <span className="fa fa-edit"></span>Edit
               </button>
               &nbsp;

                  <button
                  type="button"
                  className="btn btn-danger ml-5"
                  onClick={this.onDelete}
               >
                  <span className="fas fa-trash-alt"></span> Delete
               </button>
            </td>
         </tr>
      );
   }
}

export default TaskItem;