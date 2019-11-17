import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';


export class GridHeader extends React.Component {

  constructor(props) {
    super(props);
    this.classes = this.props.useStyles;
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columnNames.map((columnName, index) => {
            return (<TableCell key={index}
              className={this.calculateCellClasses(columnName)}>
              {columnName}
            </TableCell>);
          })}
        </TableRow>
      </TableHead>
    );
  }

  calculateCellClasses(columnName) {
    const isVisible = this.props.hideColumns.filter((item) => item === columnName).length === 0;
    const visibilityClass = isVisible ? '' : this.classes.hidden;
    return [this.classes.tablecell, visibilityClass].join(' ');
  }

}

GridHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideColumns: PropTypes.arrayOf(PropTypes.string).isRequired
};

GridHeader.defaultProps = {
  hideColumns: []
};

export default GridHeader;
