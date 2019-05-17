import React from 'react';
import {connect} from 'react-redux';
import { DatePicker} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { setStartDate, setEndDate } from '../../store/calculate/actions'

const {RangePicker} = DatePicker;

class DateInput extends React.Component {
  state = {
    size: 'default',
  };

 disabledDate = (current) => {
    return current > moment() || current < moment('1999-01-04');
  }

setDate = async (event) => {
  try {
    await this.props.setStartDate(moment(event[0]._d).format("YYYY-MM-DD"))
    await this.props.setEndDate(moment(event[1]._d).format("YYYY-MM-DD"))

    this.props.setGraphArray()
  }
  catch {
    await this.props.setStartDate('')
    await this.props.setEndDate('')
    
    this.props.setGraphArray()
  }
}

  render() {
    return (
      <div>
        <RangePicker
        id = "date-picker"
        size={"large"}
        disabledDate={this.disabledDate}
        onChange={this.setDate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startDate: state.calculate.startDate,
    endDate: state.calculate.endDate
  }
}

const mapDispatchToProps = {
  setStartDate,
  setEndDate
}

export default connect(mapStateToProps, mapDispatchToProps)(DateInput)
