import DataGrid from "@/components/custom/table/DataGrid";
import { headers } from "@/lib/data";
import { serverApiCall } from "@/utils/serverApiCall";
import Actions from "../components/Actions";
import { formatDate, shortenText } from "@/utils/format/formatter";
import { Tooltip } from "flowbite-react";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  console.log("query params:", query);

  const data = await serverApiCall("/products");

  const modifiedData = data.map((row: any) => ({
    ...row,
    id: <Tooltip content={row?.id}>{shortenText(row?.id, 8)}</Tooltip>,
    description: (
      <Tooltip content={row?.description}>
        {shortenText(row?.description, 20)}
      </Tooltip>
    ),
    createdAt: formatDate(row?.createdAt),
    updatedAt: formatDate(row?.updatedAt),
    actions: <Actions />,
  }));

  return (
    <>
      <DataGrid headers={headers} data={modifiedData} itemsPerPage={10} />
    </>
  );
}
