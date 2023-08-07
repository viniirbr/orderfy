interface Props {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}

export function Fieldset({ children, label, required }: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="text-sm text-gray-600 font-bold">
        {label}
        {required && "*"}
      </label>
      {children}
    </fieldset>
  );
}
