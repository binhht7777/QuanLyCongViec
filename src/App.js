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
            isDisplayForm: false
        }
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
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        });
    }

    onCLoseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        data.id = this.generateId();
        tasks.push(data);
        this.setState({
            tasks: tasks
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

    render() {
        var { tasks, isDisplayForm } = this.state; //var tasks = this.state.tasks
        var elemDisplayForm = isDisplayForm ?
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                < TaskFrom
                    onCLoseForm2={this.onCLoseForm}
                    onSubmitParent={this.onSubmit}
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
                        {/* <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={this.onGenerateData}
                        >
                            Genarate Data
                        </button> */}
                        {/* sort, search */}
                        <div className="row mt-15">
                            <Control />
                        </div>
                        {/* list */}
                        <div className="row mt-15">
                            <TaskList
                                tasks={tasks}
                                onUpdateStatus={this.onUpdateStatus}
                            />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default App;