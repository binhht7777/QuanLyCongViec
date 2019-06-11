import * as types from './../constants/ActionTypes';

var s4 = () => {
   return Math.random((1 + Math.random() * 0x10000)).toString(16).substring(1);
}

var generateId = () => {
   return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var data = JSON.parse(localStorage.getItem('keyTasks'));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.LIST_ALL:
         return state;

      case types.ADD_TASK:
         var newTask = {
            id: generateId(),
            name: action.task.name,
            status: action.task.status === 'true' ? true : false
         }
         state.push(newTask);
         localStorage.setItem('keyTasks', JSON.stringify(state));
         return [...state];
      default: return state;
   }
}

export default myReducer;