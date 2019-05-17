import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../css/ActionButton.css';

const styles = theme => ({
  button: {
    margin: 0,
    backgroundColor: "#eee",
    padding: 0,
  },
});

class ChangeButton extends React.Component {

  onClick = () => {
    this.props.changeCurrency()
    this.props.calculateCurrency()
  }

  render() {
  const { classes } = this.props;
  return (
    <div>
      <Button variant="outlined" className={classes.button} onClick = {this.onClick}>
        <div className = "action-button">
          &ensp;
        </div>
      </Button>
    </div>
  );
}
}

ChangeButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeButton);
