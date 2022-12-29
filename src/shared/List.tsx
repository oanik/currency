import React from "react";
import _sortBy from "lodash/sortBy";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  List as _List,
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  ListProps,
  CellMeasurer as _CellMeasurer,
  CellMeasurerProps,
  CellMeasurerCache,
} from "react-virtualized";

import { CurrencyItem } from '../interfaces';
import "./List.scss";

const List = _List as unknown as React.FC<ListProps>;
const CellMeasurer = _CellMeasurer as unknown as React.FC<CellMeasurerProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;

type ListComponentProps = {
  currencies: CurrencyItem[];
  onChange: (item: CurrencyItem) => void;
};

const ListComponent: React.FC<ListComponentProps> = ({ currencies, onChange }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 60,
  });

  const renderRow = ({ index, key, style, parent }): React.ReactNode => {
    const currencyItems = _sortBy(currencies, ["name"], ["asc"]);
    const currency = currencyItems[index];
    const { name, isSelected } = currency;

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <div
            className="rowStyle"
            onClick={(): void => onChange(currency)}  
          >
            {name}
            {isSelected ? (
              <StarOutlinedIcon /> ) : (
              <StarBorderOutlinedIcon /> 
            )}
          </div>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div className="listStyle">
      {currencies.length !== 0 && (
        <AutoSizer>
          {({ width, height }): React.ReactElement => {
            return (
              <List
                width={width}
                height={height}
                deferredMeasurementCache={cache}
                rowHeight={cache.defaultHeight}
                rowRenderer={renderRow}
                rowCount={currencies.length}
                scrollToIndex={-1}
                overscanRowCount={3}
              />
            );
          }}
        </AutoSizer>
      )}
    </div>
  );
};

export default ListComponent;
