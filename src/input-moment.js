import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './calendar';
import Time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    locale: '',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    minStep: 1,
    hourStep: 1,
    classNamePrefix: '',
    nextIconElement: '>',
    prevIconElement: '<',
    dateButtonText: 'Date',
    timeButtonText: 'Time',
    saveButtonText: 'Save',
    minutesText: 'Minutes',
    hoursText: 'Hours'
  };

  state = {
    tab: 0
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  render() {
    const { tab } = this.state;
    const {
      moment: m,
      className,
      minStep,
      hourStep,
      onSave,
      nextIconElement,
      prevIconElement,
      classNamePrefix,
      saveButtonText,
      dateButtonText,
      timeButtonText,
      weekdays,
      locale,
      ...props
    } = this.props;
    const cls = cx(classNamePrefix + 'm-input-moment', className);

    return (
      <div className={cls}>
        <div className={classNamePrefix + "options"}>
          <button
            type="button"
            className={cx({ [classNamePrefix + 'is-active']: tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            {dateButtonText}
          </button>
          <button
            type="button"
            className={cx({ [classNamePrefix + 'is-active']: tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            {timeButtonText}
          </button>
        </div>

        <div className={classNamePrefix + "tabs"}>
          <Calendar
            locale={locale}
            weekdays={weekdays}
            classNamePrefix={classNamePrefix}
            className={cx(classNamePrefix + 'tab', { [classNamePrefix + 'is-active']: tab === 0 })}
            moment={m}
            onChange={this.props.onChange}
            nextIconElement={nextIconElement}
            prevIconElement={prevIconElement}
          />
          <Time
            classNamePrefix={classNamePrefix}
            className={cx(classNamePrefix + 'tab', { [classNamePrefix + 'is-active']: tab === 1 })}
            moment={m}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
            isTabActive={tab === 1}
            minutesText={this.props.minutesText}
            hoursText={this.props.hoursText}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            className={cx(classNamePrefix + 'im-btn', classNamePrefix + 'btn-save')}
            onClick={this.handleSave}
          >
            {saveButtonText}
          </button>
        ) : null}
      </div>
    );
  }
}
