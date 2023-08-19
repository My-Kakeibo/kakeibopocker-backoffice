import { useGetCategorySpends } from '@/services/master-data/category-spends/hook';
import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';

type SelectCategorySpendProps = SelectProps;

export default function SelectCategorySpend(props: SelectCategorySpendProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetCategorySpends({
    params: {
      search,
    },
    options: {
      staleTime: 30000,
    },
  });

  return (
    <>
      <Select
        showSearch
        placeholder="Select a user"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (String(option?.label) ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={dataHook.data?.items.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        loading={dataHook.isFetching}
        onSearch={debounce(setSearch, 1000)}
        {...rest}
      />
    </>
  );
}
