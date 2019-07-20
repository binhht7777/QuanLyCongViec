import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    // chi chay khi load form lan dau tien
    componentWillMount() {
        if (this.props.taskEditing !== null) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        }
    }

    // chay khi truoc do co su kien khac dang thuc hien vi du Create
    componentWillReceiveProps(nextProps) {
        if (nextProps !== null && nextProps.taskEditing !== null) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        }
        else if (nextProps && nextProps.task === null) {
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }

    onCLoseForm3 = () => {
        this.props.onCLoseForm();
    }


    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onCLear();
        this.onCLoseForm3();
    }

    onCLear = () => {
        this.setState({
            name: '',
            status: false
        });
    }



    render() {
        var { id } = this.state;
        if (!this.props.isDisplayForm) return null;
        return (
            <div>
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {id !== '' ? "Update Task" : "Create Task"}
                            <span className="fa fa-times-circle text-right"
                                onClick={this.onCLoseForm3}
                            >
                            </span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label >Name: </label>
                                <input
                                    name="name" type="text" className="form-control" placeholder="Full Name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Satus: </label>
                                <select
                                    name="status"
                                    className="form-control" required="required"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>InActive</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">
                                    <span className="fa fa-plus mr-5"></span> Save
                                </button>
                                &nbsp;
                                <button type="button" className="btn" onClick={this.onCLear}>
                                    <span className="fa fa-ban mr-5"></span> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEditing: state.taskEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },

        onCLoseForm: () => {
            dispatch(actions.closeForm());
        },

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
