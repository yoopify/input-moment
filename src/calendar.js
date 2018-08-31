import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, currentDay, isCurrentMonth, className, classNamePrefix, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;

  const cls = cx({
    [classNamePrefix + 'prev-month']: prevMonth,
    [classNamePrefix + 'next-month']: nextMonth,
    [classNamePrefix + 'selected-day']: !prevMonth && !nextMonth && i === d ,
    [classNamePrefix + 'current-day']: !prevMonth && !nextMonth && i === currentDay && isCurrentMonth
  });
  return <td className={cls} {...props}>
    <span className={classNamePrefix + 'day'}>{i}</span>
  </td>;
};

export default class Calendar extends Component {

  state = {
    currentDay: moment().date(),
    currentMonth: moment().month()
  }

  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.props.moment;

    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    m.date(i);

    this.props.onChange(m);
  };

  prevMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  };

  render() {
    const { props } = this;
    const m = props.moment;

    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();
    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );

    return (
      <div className={cx(props.classNamePrefix + 'm-calendar', props.className)}>
        <div className={props.classNamePrefix + "toolbar"}>
          <button type="button" className={props.classNamePrefix + "prev-month"} onClick={this.prevMonth}>
            <span className={props.classNamePrefix + "prev-icon"}>{props.prevIconElement}</span>
          </button>
          <span className={props.classNamePrefix + "current-date"}>{m.format('MMMM YYYY')}</span>
          <button type="button" className={props.classNamePrefix + "next-month"} onClick={this.nextMonth}>
            <span className={props.classNamePrefix + "next-icon"}>{props.nextIconElement}</span>
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {props.weekdays.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i =>
                  <Day
                    classNamePrefix={props.classNamePrefix}
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    isCurrentMonth={this.state.currentMonth === m.month()}
                    currentDay={this.state.currentDay}
                    onClick={() => this.selectDate(i, w)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
