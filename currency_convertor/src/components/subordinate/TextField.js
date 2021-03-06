import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    margin: 0,
    height: 62,
    width: 160,
    backgroundColor: "#BCBCBC",
    borderRadius: 5,
    paddingTop: 9,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "bold",
  },
});

class TextFields extends React.Component {

  handleChange = (event) => {
    const {onAmountFrom, calculateCurrency} = this.props
    onAmountFrom(event)
    calculateCurrency()
  }

  render() {
    const { classes, placeholder, id, readOnly} = this.props;

    return (
      <TextField
          id={id}
          type={'number'}
          label=""
          className={classes.textField}
          placeholder={placeholder}
          helperText=""
          fullWidth
          margin="normal"
          onChange={this.handleChange}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
          }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1,
            min: 1,
            style:{fontSize: 22, paddingBottom: 6,},
            readOnly: readOnly,
          }}
        />
    );
}
}

TextFields.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
