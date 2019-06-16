import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

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
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var filter = {
         name: name === 'filterName' ? value : this.state.filterName,
         status: name === 'filterStatus' ? value : this.state.filterStatus
      };
      this.props.onFilterTable(filter)
      this.setState({
         [name]: value
      });
   }

   render() {

      var { tasks, filterTable, keyword, sort } = this.props;
      console.log(sort);
      var { filterStatus, filterName } = this.state;

      if (filterTable.name !== null) {
         tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
         });
      }

      if (filterTable.status !== null) {
         tasks = tasks.filter((task) => {
            if (filterTable.status === -1) {
               console.log('choose all')
               return task
            } else {
               return task.status === (filterTable.status === 1 ? true : false)
            }
         });
      }

      //search
      if (keyword !== '') {
         tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
         });
      }


      if (sort.by === 'name') {
         tasks.sort((a, b) => {
            if (a.name > b.name) return sort.value;
            else if (a.name < b.name) return -sort.value;
            else return 0
         });
      } else {
         tasks.sort((a, b) => {
            if (a.status > b.status) return sort.value;
            else if (a.status < b.status) return -sort.value;
            else return 0
         });
      }

      var emlTasks = tasks.map((task, index) => {
         return <TaskItem
            key={task.id} index={index} task={task}
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
      tasks: state.tasks,
      filterTable: state.filterTable,
      keyword: state.search,
      sort: state.sort
   }
}

const mapDispatchToProps = (dispatch, props) => {
   return {
      onFilterTable: (filter) => {
         dispatch(actions.filterTask(filter))
      }
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);