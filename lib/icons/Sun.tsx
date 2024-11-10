import { Sun as LucideSun, LucideProps } from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";
iconWithClassName(LucideSun);

const Sun: React.FC<LucideProps> = ({ className, ...props }) => {
  return <LucideSun className={`text-foreground ${className}`} {...props} />;
};

export { Sun };
