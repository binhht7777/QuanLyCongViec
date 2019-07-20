import React, { Component } from 'react';
import './App.css';
import TaskFrom from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';
//Begin: da sua thong tin
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        var { taskEditing } = this.props;
        if (taskEditing && taskEditing.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }

    onAlert = () => {
        alert("Buttet Pressed")
    }

    render() {
        var { isDisplayForm } = this.props;
        return (
            <div className="container" >
                <div className="text-center">
                    <h1>TASK MANAGER</h1>
                </div>

                <div className="row">
                    {/* form create/edit work */}
                    <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        < TaskFrom />
                    </div>
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
                            <Control />
                        </div>
                        {/* list */}
                        <div className="row mt-15">
                            <TaskList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEditing: state.taskEditing
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);