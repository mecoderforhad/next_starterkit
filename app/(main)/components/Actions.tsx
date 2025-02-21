"use client";

import { Button } from "flowbite-react";

export default function Actions() {
  const handleEdit = () => {
    console.log("this is edit");
  };
  return <Button onClick={handleEdit}>Edit</Button>;
}
