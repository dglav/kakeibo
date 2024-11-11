import { Calendar as LucideCalendar, LucideProps } from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";
iconWithClassName(LucideCalendar);

const Calendar: React.FC<LucideProps> = ({ className, ...props }) => {
  return (
    <LucideCalendar className={`text-foreground ${className}`} {...props} />
  );
};

export { Calendar };
