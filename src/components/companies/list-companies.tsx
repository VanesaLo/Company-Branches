"use server";

import { getListCompanies } from "app/app/actions/companies.action";
import ListCompaniesItem from "./list-companies-item";
import ErrorReload from "../error-reload";
import { connection } from 'next/server';

export default async function ListCompanies() {
  // -- Nextjs
  await connection();

  // -- API
  const companies = await getListCompanies();

  // -- Render Error
  if (companies === null)
    return <ErrorReload />

  // -- Render
  return (
    <div className="grid md:grids-col-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
      {companies.map((company) => (
        <ListCompaniesItem key={company.id_app} company={company} />
      ))}
    </div>
  )
}
