import React, { Component } from 'react';

class Sort extends Component {

   //  

   onClick = (sortBy, sortValue) => {
      this.props.onSort(sortBy, sortValue);
   }

   render() {
      return (
         <div>
            <div className="dropdown">
               <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  id="dropdownMenu1"
               >
                  Sort<span className="caret ml-5" />
               </button>
               {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li onClick={() => this.onClick('name', 1)}>
                     <a role="button">
                        <span className="fa fa-sort-alpha-down"></span>Name A-Z
                                </a>
                  </li>
                  <li onClick={() => this.onClick('name', -1)}>
                     <a role="button" >
                        <span className="fa fa-sort-alpha-up"></span>Name Z-A
                                </a>
                  </li>
                  <li className="divider"></li>
                  <li onClick={() => this.onClick('status', 1)}>
                     <a role="button" >
                        Status is Active
                                </a>
                  </li>
                  <li onClick={() => this.onClick('status', -1)}>
                     <a role="button" >
                        <span>Status is InActive</span>
                     </a>
                  </li>
               </ul> */}
            </div>
         </div>
      );
   }
}

export default Sort;