import React, { Component } from 'react';
import './App.css';
import TaskFrom from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyWord: '',
            sortBy: 'name',
            sortValue: 1
        }
    }
    constructor2(props) { //binhpt them su kien moi
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyWord: '',
            sortBy: 'name',
            sortValue: 1
        }
    }
    constructor3(props) { //binhpt them su kien moi
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyWord: '',
            sortBy: 'name',
            sortValue: 1
        }
    }
<<<<<<< HEAD
	constructor4444(props) { //binhpt them su kien moieee44444
        super(props44);
        {
			hi lsdljsfjlkfkldjsflks
			fasfdas
		}
=======
    constructor4(props) { //binhpt them su kien moi
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyWord: '',
            sortBy: 'name',
            sortValue: 1
        }
>>>>>>> 5550a79c982abaff7e0c95abfcbe9de30c1570e9
    }
    

    componentWillMount() {
        if (localStorage && localStorage.getItem('keyTasks')) {
            var tasksTmp = JSON.parse(localStorage.getItem('keyTasks'));
            console.log(tasksTmp);
            this.setState({
                tasks: tasksTmp
            })
        }
    }

    onGenerateData = () => {
        var arrtasks = [
            {
                id: this.generateId(),
                name: 'Hoc Lap Trinh 1',
                status: false
            },
            {
                id: this.generateId(),
                name: 'Hoc Lap Trinh 2',
                status: false
            },
            {
                id: this.generateId(),
                name: 'Hoc Lap Trinh 3',
                status: true
            }
        ];
        this.setState({
            tasks: arrtasks
        });
        localStorage.setItem('keyTasks', JSON.stringify(arrtasks));
    }

    s4() {
        return Math.random((1 + Math.random() * 0x10000)).toString(16).substring(1);
    }

    generateId() {
        return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }

    onToggleForm = () => {
        if (this.state.isDisplayForm === true && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }
    }

    onCLoseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if (data.id === '') {
            data.id = this.generateId();
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('keyTasks', JSON.stringify(tasks));
        console.log(tasks);
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index
            }
        });
        return result;
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        console.log(index);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('keyTasks', JSON.stringify(tasks));
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        console.log(index);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('keyTasks', JSON.stringify(tasks));
            this.onCLoseForm();
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit = tasks[index];
        this.setState({
            taskEditing: taskEdit
        });
        console.log(this.state.taskEditing);
        this.onShowForm();
    }

    onAlert = () => {
        alert("Buttet Pressed")
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyWord) => {
        this.setState({
            keyWord: keyWord
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
        console.log(sortBy, sortValue);
    }

    render() {
        var { tasks, isDisplayForm, filter, keyWord, sortBy, sortValue } = this.state; //var tasks = this.state.tasks
        if (filter !== null) {
            if (filter.name !== null) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }

            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    console.log('choose all')
                    return task
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            });

        }
        if (keyWord !== '') {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyWord) !== -1;
            });
        }

        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return sortValue;
                else if (a.status < b.status) return -sortValue;
                else return 0
            });
        }



        var elemDisplayForm = isDisplayForm ?
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                < TaskFrom
                    onCLoseForm2={this.onCLoseForm}
                    onSubmitParent={this.onSubmit}
                    task={this.state.taskEditing}
                />
            </div > : ""

        return (
            <div className="container" >
                <div className="text-center">
                    <h1>TASK MANAGER</h1>
                </div>
                <div className="row">
                    {/* form create/edit work */}
                    {elemDisplayForm}
                    {/* form create work */}
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"> </span> Create Work
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={this.onAlert}
                        >
                            Genarate Data
                        </button>
                        {/* sort, search */}
                        <div className="row mt-15">
                            <Control
                                onSearch={this.onSearch}
                                onSort={this.onSort}
                                sortBy={sortBy}
                                sortValue={sortValue}
                            />
                        </div>
                        {/* list */}
                        <div className="row mt-15">
                            <TaskList
                                tasks={tasks}
                                onUpdateStatus={this.onUpdateStatus}
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default App;
