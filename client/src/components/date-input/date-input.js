import React, { createRef, useState, useEffect } from 'react'
import "./date-input.css"
import * as Utils from "../../utils";

const DateInput = ({ containerXOffset, dateValue, title, placeHolder, onChange, className, disabled, error }) => {
  const [displayDate, setDisplayDate] = useState(new Date(0));
  const [pickerDate, setPickerDate] = useState(new Date(0));
  const [datesOfMonth, setDatesOfMonth] = useState({});
  const dateInputContainer = createRef();
  const displayDateRef = createRef();
  const ToggleTheMonth = (e) => {
    setPickerDate(new Date(pickerDate.setMonth(pickerDate.getMonth() + parseInt(e.currentTarget.getAttribute("data-incriment")))));
  }
  const ToggleDatePicker = () => {
    if (!disabled) {
      if (dateInputContainer.current.classList.contains('date-input-container-visible')) {
        dateInputContainer.current.classList.remove('date-input-container-visible');
        displayDateRef.current.classList.remove('date-input-display-date-selected');
        window.removeEventListener('resize', checkPickerPosition);
      } else {
        dateInputContainer.current.classList.add('date-input-container-visible');
        displayDateRef.current.classList.add('date-input-display-date-selected');
        window.addEventListener('resize', checkPickerPosition);
      }
      checkPickerPosition();
    }
  }
  const checkPickerPosition = () => {
    if (dateInputContainer.current) {
      let pickerPadding = 10;
      let pickerRect = dateInputContainer.current.getBoundingClientRect();
      let newLeftPos = (dateInputContainer.current.parentElement.getBoundingClientRect().left + pickerRect.width + pickerPadding);
      if (window.innerWidth < newLeftPos) {
        if (window.innerWidth < (pickerPadding * 2 + pickerRect.width)) {
          dateInputContainer.current.style.left = (pickerPadding - dateInputContainer.current.parentElement.getBoundingClientRect().left) + ((containerXOffset) ? containerXOffset : 0) + 'px';
        } else {
          dateInputContainer.current.style.left = (window.innerWidth - newLeftPos) + ((containerXOffset) ? containerXOffset : 0) + 'px';
        }
      } else {
        dateInputContainer.current.style.left = -5 + ((containerXOffset) ? containerXOffset : 0) + 'px';
      }
    } else {
      window.removeEventListener('resize', checkPickerPosition);
    }
  }
  const ChangeDisplayDate = (e) => {
    let newDate = new Date(e.currentTarget.getAttribute("data-year"), e.currentTarget.getAttribute("data-month"), e.currentTarget.getAttribute("data-day"));
    setDisplayDate(newDate);
    ToggleDatePicker();
    if (onChange) {
      onChange(newDate);
    }
  }
  useEffect(() => {
    if (dateValue !== undefined) {
      let newDate = new Date(dateValue);
      setDisplayDate(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
      setPickerDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    }
  }, [dateValue,]);
  useEffect(() => {
    setDatesOfMonth(Utils.CalendarUtils.getDatesOfTheMonth(pickerDate));
  }, [pickerDate]);
  return (
    <div className={((className) ? className : '') + " date-input"}>
      <div ref={displayDateRef} title={title}
        className={"date-input-display-date" +
          ((disabled) ? " date-input-display-date-disabled" : "") +
          ((error) ? " date-input-display-date-error" : "")
        } onClick={ToggleDatePicker}>
        {((displayDate) ? displayDate.toDateString() : placeHolder && title)}
      </div>
      <div ref={dateInputContainer} className="date-input-container">
        <nav className="date-input-nav">
          {pickerDate.toLocaleDateString("en-us", { month: 'long', year: 'numeric' })}
          <button title="Next month" className="date-input-nav-next" data-incriment="1" onClick={ ToggleTheMonth }>
            <img alt="Next Month" src="/assets/arrowIcon.png"></img>
          </button>
          <button title="Previous Month" className="date-input-nav-previous" data-incriment="-1" onClick={ ToggleTheMonth }>
            <img alt="Previous Month" src="/assets/arrowIcon.png"></img>
          </button>
        </nav>
        <div className="date-input-days-of-week-container">
          {Utils.CalendarUtils.daysOfTheWeek.map(item =>
            <div key={item}> {item.substring(0, 1)} </div>
          )}
        </div>
        {Object.entries(datesOfMonth).map((week) =>
          <div title="Pick a Date" key={week[0]} className="date-input-week-container">
            {Object.entries(Object.values(week)[1]).map((day) =>
              <div key={day[1].month + day[1].dayOfMonth } className='date-input-day-container'>
                <div
                  className={
                    "date-input-day" +
                    ((day[1].isThisToday) ? " date-input-today" : "" +
                      ((day[1].year === displayDate.getFullYear() && day[1].month === displayDate.getMonth() && day[1].dayOfMonth === displayDate.getDate()) ? " date-input-selected" : "")
                    )}
                  data-year={day[1].year}
                  data-month={day[1].month}
                  data-day={day[1].dayOfMonth}
                  onClick={ ChangeDisplayDate }
                >
                  {day[1].dayOfMonth}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DateInput