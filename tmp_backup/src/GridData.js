import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export class GridData extends React.Component {

  constructor(props) {
    super(props);
    this.classes = this.props.useStyles;
  }

  render() {
    return (
      <TableBody>
        {this.props.rowData.map((row, iRow) => {
          return (
            <TableRow key={iRow}>
              {row.map((cellValue, iCell) => {
                const columnName = this.props.columnNames[iCell];
                return <TableCell key={iCell}
                  className={this.calculateCellClasses(columnName)}>
                  {cellValue}
                </TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  calculateCellClasses(columnName) {
    const isVisible = this.props.hideColumns.filter((item) => item === columnName).length === 0;
    const visibilityClass = isVisible ? '' : this.classes.hidden;
    return [this.classes.tablecell, visibilityClass].join(' ');
  }

}

GridData.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideColumns: PropTypes.arrayOf(PropTypes.string).isRequired
};

GridData.defaultProps = {
  hideColumns: []
};

export default GridData;
