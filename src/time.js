import cx from 'classnames';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

export default class extends Component {

  changeHours = hours => {
    const m = this.props.moment;
    m.hours(hours);
    this.props.onChange(m);
  };

  changeMinutes = minutes => {
    const m = this.props.moment;
    m.minutes(minutes);
    this.props.onChange(m);
  };

  render() {
    const m = this.props.moment;
    const { 
      classNamePrefix 
    } = this.props;

    return (
      <div className={cx(classNamePrefix + 'm-time', this.props.className)}>
        <div className={classNamePrefix + "showtime"}>
          <span className={classNamePrefix + "time"}>{m.format('HH')}</span>
          <span className={classNamePrefix + "separater"}>:</span>
          <span className={classNamePrefix + "time"}>{m.format('mm')}</span>
        </div>

        {this.props.isTabActive && 
          <div className={classNamePrefix + "sliders"}>
            <div className={classNamePrefix + "time-text"}>{this.props.hoursText}:</div>
              <ReactSlider
                withBars
                className={cx([classNamePrefix + "u-slider-time", classNamePrefix + "u-slider-hours"])}
                handleClassName={classNamePrefix + "u-slider-handle"}
                barClassName={classNamePrefix + "u-slider-bar"}
                min={0}
                max={23}
                step={this.props.hourStep}
                value ={this.props.isTabActive ? m.hour() : 0}
                onChange={this.changeHours}
               />
              <div className={classNamePrefix + "time-text"}>{this.props.minutesText}:</div>
              <ReactSlider
                withBars
                className={classNamePrefix + "u-slider-time"}
                handleClassName={classNamePrefix + "u-slider-handle"}
                barClassName={classNamePrefix + "u-slider-bar"}
                min={0}
                max={59}
                step={this.props.minStep}
                value ={this.props.isTabActive ? m.minutes() : 0}
                onChange={this.changeMinutes}
               />
            </div>
          }
      </div>
    );
  }
}
