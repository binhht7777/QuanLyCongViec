import React, { Component } from 'react';
import './App.css';
import TaskFrom from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
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



    onToggleForm = () => {
        this.props.onToggleForm();
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
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
        var { filter, keyWord, sortBy, sortValue } = this.state; //var tasks = this.state.tasks

        var { isDisplayForm } = this.props;
        if (filter !== null) {
            // if (filter.name !== null) {
            //     // tasks = tasks.filter((task) => {
            //     //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
            //     // });
            // }

            // tasks = tasks.filter((task) => {
            //     if (filter.status === -1) {
            //         console.log('choose all')
            //         return task
            //     } else {
            //         return task.status === (filter.status === 1 ? true : false)
            //     }
            // });

        }
        if (keyWord !== '') {
            // tasks = tasks.filter((task) => {
            //     return task.name.toLowerCase().indexOf(keyWord) !== -1;
            // });
        }

        if (sortBy === 'name') {
            // tasks.sort((a, b) => {
            //     if (a.name > b.name) return sortValue;
            //     else if (a.name < b.name) return -sortValue;
            //     else return 0
            // });
        } else {
            // tasks.sort((a, b) => {
            //     if (a.status > b.status) return sortValue;
            //     else if (a.status < b.status) return -sortValue;
            //     else return 0
            // });
        }



        var elemDisplayForm = isDisplayForm ?
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                < TaskFrom
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
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },

        onOpenForm: () => {
            dispatch(actions.openForm());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);