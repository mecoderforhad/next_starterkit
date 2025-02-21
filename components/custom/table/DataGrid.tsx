"use client";

import React, { useState, useCallback, ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, Select, Table, Checkbox, Pagination } from "flowbite-react";
import InputField from "@/components/ui/input/InputField";

interface DataGridProps {
  headers: string[];
  data: Array<{ [key: string]: string | number }>;
  itemsPerPage: number;
}

const DataGrid: React.FC<DataGridProps> = ({ headers, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const debounceSearch = useCallback(
    debounce((term: string, uniqueName: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set(uniqueName, term);
      } else {
        params.delete(uniqueName);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300),
    [searchParams, pathname, replace]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value, "query");
  };

  const handleEntriesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    debounceSearch(e.target.value, "entries");
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-5">
        <Select
          id="entries"
          defaultValue={searchParams.get("entries")?.toString()}
          onChange={handleEntriesChange}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
        </Select>
        <InputField
          onChange={handleSearchChange}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      <div className="overflow-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            {headers.map((header, index) => (
              <Table.HeadCell key={index}>{header}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {currentData.map((row, rowIndex) => (
              <Table.Row
                key={rowIndex}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                {headers.map((header, colIndex) => (
                  <Table.Cell
                    key={colIndex}
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    {row[header]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Card>
  );
};

export default DataGrid;
