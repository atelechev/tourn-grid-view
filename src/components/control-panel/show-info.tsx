/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton
} from '@material-ui/core';
import { I18nContext } from 'components/context/i18n-context';

export const buttonStyle = css({
  width: '16px',
  height: '16px'
});

interface ShowInfoProps { }

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
            <IconButton
              css={buttonStyle}
              title={i18n.i18nProvider.translate('header-tools.about')}
              onClick={() => this.setDialogState(true)}
            >
              <InfoOutlinedIcon />
            </IconButton>
            <Dialog
              open={this.state.dialogShown}
              onClose={() => this.setDialogState(false)}
            >
              <DialogContent>
                <DialogContentText>
                  <span>
                    {i18n.i18nProvider.translate('header-tools.about.text')}
                    <br />
                    <a
                      href="https://github.com/atelechev/tourn-grid-view"
                      target="_blank"
                    >
                      tourn-grid-view
                    </a>
                  </span>
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
