import { Dispatch, SetStateAction } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

interface Props {
  value: Date;
  setValue: Dispatch<SetStateAction<Date>>;
}

export function DateSelector({ value, setValue }: Props) {
  function oneDayBefore() {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() - 1);
    setValue(newDate);
  }
  function oneDayAfter() {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() + 1);
    setValue(newDate);
  }
  return (
    <div className="flex items-center self-end">
      <BiSolidLeftArrow
        onClick={oneDayBefore}
        className="cursor-pointer transition-all hover:text-gray-600"
      />
      <input
        type="date"
        className="bg-transparent text-center"
        onChange={(e) => setValue(new Date(e.target.value))}
        value={value.toISOString().split("T")[0]}
      />
      <BiSolidRightArrow
        onClick={oneDayAfter}
        className="cursor-pointer transition-all hover:text-gray-600"
      />
    </div>
  );
}
