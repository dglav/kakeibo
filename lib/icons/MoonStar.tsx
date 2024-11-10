import { MoonStar as LucideMoonStar, LucideProps } from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";
iconWithClassName(LucideMoonStar);

const MoonStar: React.FC<LucideProps> = ({ className, ...props }) => {
  return (
    <LucideMoonStar className={`text-foreground ${className}`} {...props} />
  );
};

export { MoonStar };
