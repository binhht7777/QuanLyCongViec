import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         keyWord: ''
      }
   }

   onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.setState({
         [name]: value
      });
   }

   onSearch = () => {
      this.props.onSearch(this.state.keyWord);
   }


   render() {
      var { keyWord } = this.state;
      return (
         <div className="input-group">
            <input type="text"
               name="keyWord"
               className="form-control"
               placeholder="Enter key search..."
               value={keyWord}
               onChange={this.onChange}
            />
            <span className="input-group-btn">
               <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.onSearch}
               >
                  <span className="fa fa-search mr-5"></span>Search
                  </button>
            </span>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return {

   };
}

const mapDispatchToProps = (dispatch, props) => {
   return {
      onSearch: (keyWord) => {
         dispatch(actions.searchTask(keyWord));
      },
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);