/**
 * Copyright 2017 Reza (github.com/rghorbani)
 *
 * @flow
 */
'use strict';

const React = require('react');
const {
  StyleSheet,
  View,
  ViewPropTypes,
} = require('react-native');
const PropTypes = require('prop-types');

class RNCPageControl extends React.Component {
  props: {
    style: ViewPropTypes.style,
    count: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  }

  render() {
    var images = [];
    for (var i = 0; i < this.props.count; i++) {
      var isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} {...this.props} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.innerContainer}>
          {images}
        </View>
      </View>
    );
  }
}

class Circle extends React.Component {
  render() {
    let extraStyle = {};
    if (this.props.isSelected) {
      extraStyle = this.props.fullColor ? {backgroundColor: this.props.fullColor} : styles.full;
    } else {
      extraStyle = this.props.emptyColor ? {backgroundColor: this.props.emptyColor} : styles.empty;
    }
    if (this.props.size) {
      extraStyle = {
        ...extraStyle,
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size / 2,
      }
    }
    return <View style={[styles.circle, extraStyle]} />;
  }
}

var CIRCLE_SIZE = 4;

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

module.exports = RNCPageControl;
module.exports.__cards__ = (define) => {
  define('Simple 2', () => <RNCPageControl count={2} selectedIndex={0} />);
  define('Simple 5', () => <RNCPageControl count={5} selectedIndex={2} />);
};