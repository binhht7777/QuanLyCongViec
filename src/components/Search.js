import React, { Component } from 'react';

class Search extends Component {
   render() {
      return (
         <div className="input-group">
            <input type="text" name="txtSearch" className="form-control" placeholder="Enter key search..." />
            <span className="input-group-btn">
               <button type="button" className="btn btn-info">
                  <span className="fa fa-search mr-5"></span>Search
                  </button>
            </span>
         </div>
      );
   }
}

export default Search;