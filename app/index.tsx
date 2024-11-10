import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { ArrowRight } from "~/lib/icons/ArrowRight";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="link">
        <View className="flex-row gap-2 web:items-center">
          <Text>Add an expense</Text>
          <ArrowRight />
        </View>
      </Button>
    </View>
  );
}
