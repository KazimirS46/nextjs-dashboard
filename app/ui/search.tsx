'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Поиск 2. Хук для получения query параметров
  const searchParams = useSearchParams();
  // Поиск 2. Хук для получения path URL
  const pathname = usePathname();
  // Поиск 2. Метод обновления строки URL
  const { replace } = useRouter();

  // Поиск 1. Создаем функцию для контроля инпута Поиска
  // и оборачиваем ее в useDebouncedCallback
  const handleSearch = useDebouncedCallback((term) => {
    // Поиск 2. Добавляем query параметры в переменную params
    const params = new URLSearchParams(searchParams);
    // Пагинация 1. Сбрасываем пагинацию на 1
    params.set('page', '1');

    // Поиск 2. создаем новую строку параметров
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Поиск 2. Обновляем URL
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // Поиск 1. Обработчик инпута для Поиска
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // Поиск 3. Добавляем обновленный URL в инпут
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
