"use client";

import { TextInput } from "flowbite-react";
import { FiSearch } from "react-icons/fi";


export default function InputField() {
  return (
    <div className="max-w-md">
      <TextInput
        id="search"
        type="text"
        rightIcon={FiSearch}
        placeholder="Search.."
      />
    </div>
  );
}
