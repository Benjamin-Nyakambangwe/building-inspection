import { useMemo } from 'react';
import merge from 'lodash/merge';
// _mock
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  // alert('inside use event');
  // console.log('Select Event ID:', selectEventId);
  // console.log('Events:', events);
  const currentEvent = events.find((event) => {
    const isMatch = event.id.toString() === selectEventId;
    // console.log('Event ID Type:', typeof event.id);
    // console.log('Select Event ID Type:', typeof selectEventId);
    // console.log('Checking Event:', event.id, 'with', selectEventId, 'isMatch:', isMatch);
    return isMatch;
  });
  // console.log('Found Current Event:', currentEvent);

  const defaultValues = useMemo(
    () => ({
      id: '',
      title: '',
      description: '',
      color: CALENDAR_COLOR_OPTIONS[1],
      allDay: false,
      start: selectedRange ? selectedRange.start : new Date().getTime(),
      end: selectedRange ? selectedRange.end : new Date().getTime(),
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    return merge({}, defaultValues, currentEvent);
  }

  return defaultValues;
}
