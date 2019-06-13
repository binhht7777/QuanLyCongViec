import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

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

const mapStateToProps = state => {
   return {

   };
}

const mapDispatchToProps = (dispatch, props) => {
   return {
      onUpdateStatus: (id) => {
         dispatch(actions.updateStatus(id));
      },
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);