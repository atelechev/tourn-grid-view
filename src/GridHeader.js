import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';


export class GridHeader extends React.Component {

  render() {
    const classes = this.props.useStyles;
    return (
      <TableHead>
        <TableRow>
          {this.props.columnNames.map((columnName, index) => {
            return <TableCell key={index} className={classes.tablecell}>{columnName}</TableCell>;
          })}
        </TableRow>
      </TableHead>
    );
  }

}

GridHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GridHeader;
