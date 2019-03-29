import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div >
            <table id= "myTable">
                <tbody>
                    <tr>
                        {/* 
                        had a terrible bug that kept rendering a larger table
                        than the actual size of the list "this.props.guess", after updating
                        the list is when this error would occur. 

                        FIX: each element needs a unique key, otherwise it would not know the 
                        difference between new and old elements, rendering the old too. 
                        The error was "<th key={item}>{item}</th>", where the key was not unique.
                        */}
                        {this.props.guess.map((item, index)  => (
                         <th key={index}>{item}</th>
                        ))}
                    </tr>
                </tbody>
            </table>
      </div>
    );
  }
}

export default Table;
