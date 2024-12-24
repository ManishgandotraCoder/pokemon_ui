export type selectType = {
  label?: string;
  options: { name: string; url: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
