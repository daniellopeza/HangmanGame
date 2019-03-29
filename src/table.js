import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        // <div>
        //     {this.props.guess.map((item, index) => (
        //     <li key={index}>{item}</li>
        // ))}
        // </div>
      <div >
          {console.log("state rendering = ", this.props.guess)}
            <table id= "myTable">
                <tbody>
                    <tr>
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
