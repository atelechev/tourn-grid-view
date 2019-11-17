import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export class GridData extends React.Component {

  render() {
    return (
      <TableBody>
        {this.props.rowData.map((row, iRow) => {
          return (
            <TableRow key={iRow}>
              {row.map((cellValue, iCell) => {
                return <TableCell key={iCell}>{cellValue}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

}

GridData.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired
};

export default GridData;
