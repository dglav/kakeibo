import {
  ArrowRight as LucideArrowRight,
  LucideProps,
} from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";
iconWithClassName(LucideArrowRight);

const ArrowRight: React.FC<LucideProps> = ({ className, ...props }) => {
  return (
    <LucideArrowRight className={`text-foreground ${className}`} {...props} />
  );
};

export { ArrowRight };
