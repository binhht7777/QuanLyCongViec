import * as types from './../constants/ActionTypes';

var s4 = () => {
   return Math.random((1 + Math.random() * 0x10000)).toString(16).substring(1);
}

var generateId = () => {
   return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findIndex = (tasks, id) => {
   var result = -1;
   tasks.forEach((task, index) => {
      if (task.id === id) {
         result = index
      }
   });
   return result;
}

var data = JSON.parse(localStorage.getItem('keyTasks'));

var initialState = data ? data : [];
//state chinh la cac Task

var myReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.LIST_ALL:
         return state;

      case types.ADD_TASK:
         var newTask = {
            id: generateId(),
            name: action.task.name,
            status: action.task.status === true ? true : false
         }
         console.log(action);
         state.push(newTask);
         localStorage.setItem('keyTasks', JSON.stringify(state));
         return [...state];

      case types.UPDATE_STATUS:
         console.log(action);
         var id = action.id;
         var index = findIndex(state, id);
         state[index].status = !state[index].status;
         localStorage.setItem('keyTasks', JSON.stringify(state));
         return [...state];
      default: return state;
   }
}

export default myReducer;