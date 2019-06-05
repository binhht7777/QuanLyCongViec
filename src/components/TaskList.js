import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
   render() {
      var { tasks } = this.props;
      var emlTasks = tasks.map((task, index) => {
         return <TaskItem key={task.id} index={index} task={task} />
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
                              name="txtFilterName"
                              className="form-control" />
                        </td>
                        <td>
                           <select name="cmbFilterStatus" className="form-control">
                              <option value={0}>ALL</option>
                              <option value={1}>Active</option>
                              <option value={2}>InActive</option>
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

export default TaskList;