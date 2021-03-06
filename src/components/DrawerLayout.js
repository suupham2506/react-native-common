/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const {
  DrawerLayoutAndroid,
} = require('react-native');

class DrawerLayout extends React.Component {
  static displayName = 'DrawerLayout';

  static contextTypes = {
    addBackButtonListener: PropTypes.func,
    removeBackButtonListener: PropTypes.func,
  };

  _drawer: ?DrawerLayoutAndroid;

  constructor(props, context) {
    super(props, context);

    (this: any).openDrawer = this.openDrawer.bind(this);
    (this: any).closeDrawer = this.closeDrawer.bind(this);
    (this: any).onDrawerOpen = this.onDrawerOpen.bind(this);
    (this: any).onDrawerClose = this.onDrawerClose.bind(this);
    (this: any).handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this._drawer = drawer; }}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this._drawer && this._drawer.closeDrawer();
  }

  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }
}

module.exports = DrawerLayout;
