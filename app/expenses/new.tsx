import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { BasicCalendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Calendar } from "~/lib/icons/Calendar";

type Inputs = {
  description: string;
  amount: string;
  date: Date;
};

export default function AddExpensePage() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      description: "",
      amount: "",
      date: new Date(),
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleOpenBottomSheetModal = () => {
    setSelectedDate(getValues("date"));
    bottomSheetModalRef.current?.present();
  };
  const handleCloseBottomSheetModal = () =>
    bottomSheetModalRef.current?.dismiss();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseBottomSheetModal}
      />
    ),
    [],
  );

  return (
    <View className="p-6 gap-6 flex-1">
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

      <View className="gap-2">
        <Label htmlFor="date">Date</Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={() => (
            <Button
              variant="outline"
              className="items-start"
              onPress={() => {
                handleOpenBottomSheetModal();
              }}
            >
              <View className="flex-row gap-2 items-center">
                <Calendar size="20px" />
                <Text>{watch("date").toDateString()}</Text>
              </View>
            </Button>
          )}
          name="amount"
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backgroundStyle={{ backgroundColor: "black" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <Text className="text-center font-bold pt-2">
            When did you make this purchase?
          </Text>
          <View className="p-2">
            <BasicCalendar value={selectedDate} onChange={setSelectedDate} />
          </View>
          <View className="flex-row w-full">
            <Button className="w-[50%]" onPress={handleCloseBottomSheetModal}>
              <Text>Cancel</Text>
            </Button>
            <Button
              className="w-[50%]"
              onPress={() => {
                setValue("date", selectedDate);
                handleCloseBottomSheetModal();
              }}
            >
              <Text>Ok</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
