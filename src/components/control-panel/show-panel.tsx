/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import { I18nContext } from '../context/i18n-context';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { buttonStyle } from './show-info';
import { UiSelectionsContext } from '../context/ui-selections-context';
import { UiSelectionsManager } from '../ui-selections/ui-selections-manager';
import { IconButton } from '@material-ui/core';

interface ShowPanelProps {}

interface ShowPanelState {
  panelShown: boolean;
}

const buttonPressedStyle = css({
  backgroundColor: '#e0e0e0'
});

export default class ShowPanel extends React.Component<
  ShowPanelProps,
  ShowPanelState
> {
  constructor(props: ShowPanelProps) {
    super(props);
    this.state = {
      panelShown: false
    };
  }

  public render(): ReactNode {
    return (
      <UiSelectionsContext.Consumer>
        {(uiSelections: UiSelectionsManager) => (
          <I18nContext.Consumer>
            {(i18n: I18nContext) => (
              <IconButton
                css={this.calculateStyles()}
                title={i18n.i18nProvider.translate('header-tools.show-panel')}
                onClick={() => this.toggleControlPanel(uiSelections)}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </I18nContext.Consumer>
        )}
      </UiSelectionsContext.Consumer>
    );
  }

  private toggleControlPanel(uiSelections: UiSelectionsManager): void {
    const toggledValue = !uiSelections.showControlPanel;
    this.setState({
      panelShown: toggledValue
    });
    uiSelections.showControlPanel = toggledValue;
  }

  private calculateStyles(): Array<SerializedStyles> {
    const styles = [buttonStyle];
    if (this.state.panelShown) {
      styles.push(buttonPressedStyle);
    }
    return styles;
  }
}
