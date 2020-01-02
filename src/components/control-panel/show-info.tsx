/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { ReactNode } from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { I18nContext } from '../context/i18n-context';
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

const buttonStyle = css({
  width: '16px',
  height: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

interface ShowInfoProps {}

interface ShowInfoState {
  dialogShown: boolean;
}

export default class ShowInfo extends React.Component<
  ShowInfoProps,
  ShowInfoState
> {
  constructor(props: ShowInfoProps) {
    super(props);
    this.state = {
      dialogShown: false
    };
  }

  public render(): ReactNode {
    return (
      <I18nContext.Consumer>
        {(i18n: I18nContext) => (
          <React.Fragment>
            <div
              css={buttonStyle}
              title={i18n.i18nProvider.translate('header-tools.about')}
              onClick={() => this.setDialogState(true)}
            >
              <InfoOutlinedIcon />
            </div>
            <Dialog
              open={this.state.dialogShown}
              onClose={() => this.setDialogState(false)}
            >
              <DialogContent>
                <DialogContentText>
                  {i18n.i18nProvider.translate('header-tools.about.text')}
                  <br />
                  <a
                    href="https://github.com/atelechev/tourn-grid-view"
                    target="_blank"
                  >
                    tourn-grid-view
                  </a>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setDialogState(false)}
                  color="primary"
                  autoFocus
                >
                  {i18n.i18nProvider.translate('dialog.ok')}
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </I18nContext.Consumer>
    );
  }

  private setDialogState(isShown: boolean): void {
    this.setState({
      dialogShown: isShown
    });
  }
}
