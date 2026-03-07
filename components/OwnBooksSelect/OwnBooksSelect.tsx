"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Select, { SingleValue } from "react-select";
import css from "./OwnBooksSelect.module.css";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "all", label: "All books" },
];

export default function OwnBooksSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";
  const currentValue = options.find((opt) => opt.value === currentStatus);

  const handleChange = (newValue: SingleValue<Option>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue.value !== "all") {
      params.set("status", newValue.value);
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className={css.selectWrapper}>
      <Select
        instanceId="own-books-filter"
        options={options}
        value={currentValue}
        onChange={handleChange}
        isSearchable={false}
        classNamePrefix="custom-select"
        className={css.reactSelectContainer}
      />
    </div>
  );
}
