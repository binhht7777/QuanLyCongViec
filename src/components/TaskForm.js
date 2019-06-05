import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: false
        }
    }

    onCLoseForm3 = () => {
        this.props.onCLoseForm2();
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
        console.log(this.state);
        this.props.onSubmitParent(this.state);
    }

    render() {
        return (
            <div>
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">Create Work
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
                                <button type="submit" className="btn">
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
export default TaskForm;
