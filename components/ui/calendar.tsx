import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { useColorScheme } from "nativewind";

const today = toDateId(new Date());

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

  return (
    <Calendar
      calendarActiveDateRanges={[
        {
          startId: toDateId(value),
          endId: toDateId(value),
        },
      ]}
      calendarMonthId={today}
      onCalendarDayPress={handleSelectDate}
      calendarColorScheme={colorScheme}
    />
  );
}
