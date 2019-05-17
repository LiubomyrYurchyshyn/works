import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const suggestions = [
  { label: 'EUR' },
  { label: 'BGN' },
  { label: 'NZD' },
  { label: 'ILS' },
  { label: 'RUB' },
  { label: 'CAD' },
  { label: 'USD' },
  { label: 'PHP' },
  { label: 'CHF' },
  { label: 'ZAR' },
  { label: 'AUD' },
  { label: 'JPY' },
  { label: 'TRY' },
  { label: 'HKD' },
  { label: 'MYR' },
  { label: 'THB' },
  { label: 'HRK' },
  { label: 'NOK' },
  { label: 'IDR' },
  { label: 'DKK' },
  { label: 'CZK' },
  { label: 'HUF' },
  { label: 'GBP' },
  { label: 'MXN' },
  { label: 'KRW' },
  { label: 'ISK' },
  { label: 'SGD' },
  { label: 'BRL' },
  { label: 'PLN' },
  { label: 'INR' },
  { label: 'RON' },
  { label: 'CNY' },
  { label: 'SEK' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
  root: {
    height: 62,
    width: 200,
    backgroundColor: "#BCBCBC",
    borderRadius: 5,
    padding: 5,
  },
  input: {
    display: 'flex',
    cursor: 'pointer',
    paddingBottom: 0,
    paddingLeft: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 22,
    paddingLeft: 0,
    fontWeight: "bold",
    opacity: 0.7,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: 'bold',
        fontSize: 22,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class SelectCurrency extends React.Component {
  state = {
    single: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
    this.props.calculateCurrency()
  };

  render() {
    const { classes, theme, id, placeholder } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <Select
          id={id}
          classes={classes}
          styles={selectStyles}
          options={suggestions}
          components={components}
          value={this.state.single}
          onChange={this.handleChange('single')}
          placeholder={placeholder}
          isClearable
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SelectCurrency);
