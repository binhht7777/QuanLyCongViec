import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends Component {

   constructor(props) {
      super(props);
      this.state = {
         filterName: '',
         filterStatus: -1 // All: -1, Active: 1, Inactive: 0
      }
   }

   onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.props.onFilter(
         name === 'filterName' ? value : this.state.filterName,
         name === 'filterStatus' ? value : this.state.filterStatus,
      );
      this.setState({
         [name]: value
      });
   }

   render() {
      console.log(this.props.tasks);
      var { tasks } = this.props;
      var { filterStatus, filterName } = this.state;
      var emlTasks = tasks.map((task, index) => {
         return <TaskItem
            key={task.id} index={index} task={task}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
         />
      });

      return (
         <div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
               <table className="table table-bordered table-hover">
                  <thead>
                     <tr>
                        <th className="text-center">Num</th>
                        <th className="text-center">FullName</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td></td>
                        <td>
                           <input type="text"
                              name="filterName"
                              className="form-control"
                              value={filterName}
                              onChange={this.onChange}
                           />
                        </td>
                        <td>
                           <select
                              name="filterStatus"
                              className="form-control"
                              value={filterStatus}
                              onChange={this.onChange}
                           >
                              <option value={-1}>ALL</option>
                              <option value={1}>Active</option>
                              <option value={0}>InActive</option>
                           </select>
                        </td>
                        <td></td>
                     </tr>
                     {emlTasks}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      tasks: state.tasks
   }
}

export default connect(mapStateToProps, null)(TaskList);