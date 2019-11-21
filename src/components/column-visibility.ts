import { css, SerializedStyles } from '@emotion/core';

const hiddenStyle = css({
  display: 'none'
});

const visibleStyle = css({});

export const calculateColumnVisibility = (column: string, allColumns: Array<string>): SerializedStyles => {
  const isColumnVisible = allColumns.find(colName => colName === column) === undefined;
  return isColumnVisible ? visibleStyle : hiddenStyle;
}
