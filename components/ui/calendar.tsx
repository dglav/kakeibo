import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useColorScheme } from "nativewind";

type Props = {
  value: Date;
  onChange?: (selectedDate: Date) => void;
};

export function BasicCalendar({ value, onChange }: Props) {
  const { colorScheme } = useColorScheme();

  const handleSelectDate = (date: string) => {
    if (onChange) {
      onChange(new Date(date));
    }
  };

  const dateId = toDateId(value);

  return (
    <Calendar
      calendarActiveDateRanges={[
        {
          startId: dateId,
          endId: dateId,
        },
      ]}
      calendarMonthId={dateId}
      onCalendarDayPress={handleSelectDate}
      calendarColorScheme={colorScheme}
    />
  );
}
