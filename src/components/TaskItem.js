import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {

   onUpdateStatus = () => {
      this.props.onUpdateStatus(this.props.task.id);
   }

   onDelete = () => {
      this.props.onDeleteTask(this.props.task.id);
      this.props.onCLoseForm();
      // the same dispatch(actions.deleteItem)
   }

   onUpdate = () => {
      this.props.onOpenForm();
      this.props.onEditTask(this.props.task);
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

const mapStateToProps = state => {
   return {

   };
}

const mapDispatchToProps = (dispatch, props) => {
   return {
      onUpdateStatus: (id) => {
         dispatch(actions.updateStatus(id));
      },
      onDeleteTask: (id) => {
         dispatch(actions.deleteTask(id));
      },
      onCLoseForm: () => {
         dispatch(actions.closeForm());
      },
      onOpenForm: () => {
         dispatch(actions.openForm());
      },
      onEditTask: (task) => {
         dispatch(actions.editTask(task));
      }
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);