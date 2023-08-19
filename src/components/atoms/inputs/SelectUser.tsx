import { useGetUsers } from '@/services/master-data/users/hook';
import { Select, SelectProps, Typography } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';

type SelectUserProps = SelectProps;

export default function SelectUser(props: SelectUserProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetUsers({
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
        optionLabelProp="label"
        loading={dataHook.isFetching}
        onSearch={debounce(setSearch, 1000)}
        {...rest}
      >
        {dataHook.data?.items.map((item) => (
          <Select.Option key={item.id} value={item.id} label={item.email}>
            <div>
              <Typography.Text style={{ fontWeight: 700, fontSize: '.9rem' }}>
                {item.email}
              </Typography.Text>{' '}
              <br />
              <Typography.Text>{item.fullname}</Typography.Text>
            </div>
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
