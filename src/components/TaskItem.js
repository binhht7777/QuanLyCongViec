import React, { Component } from 'react';

class TaskItem extends Component {

   onUpdateStatus = () => {
      this.props.onUpdateStatus(this.props.task.id);
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
               <button type="button" className="btn btn-warning">
                  <span className="fa fa-edit"></span>Edit
               </button>
               &nbsp;
               <button type="button" className="btn btn-danger">
                  <span className="fa fa-trash"></span>Delete
               </button>
            </td>
         </tr>
      );
   }
}

export default TaskItem;