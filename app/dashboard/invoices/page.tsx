import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page({
  //Поиск 4. текущие параметры URL
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  //Получаем параметры URL
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Пагинация 1. Функция возвращает общее количество страниц
  // на основе поискового запроса
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* Поиск 4. Передаем параметры URL в таблицу */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* Пагинация 1. Передаем количество страниц в компонент пагинации */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
