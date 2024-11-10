import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";

type Inputs = {
  description: string;
  amount: string;
};

export default function AddExpensePage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <View className="p-6 gap-6">
      <View className="gap-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              id="description"
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text className="text-destructive">This is required.</Text>
        )}
      </View>

      <View className="gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Amount"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              id="amount"
              keyboardType="numeric"
            />
          )}
          name="amount"
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
