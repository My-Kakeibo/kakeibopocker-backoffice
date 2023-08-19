import { Form, FormProps, Input } from 'antd';
import { TCategoryBuyPayload } from '../entities/request';
import {
  TCategoryBuyPaginateResponse,
  TCategoryBuyResponse,
} from '../entities/response';
import {
  useCreateCategoryBuy,
  useDeleteCategoryBuy,
  useUpdateCategoryBuy,
} from '../hook';
import { failedMessage, successMessage } from '@/utils/antd/message';
import { requiredRule } from '@/utils/antd/rulesMessage';
import { TExpectQueryResult } from '@/utils/entities/hook';
import { setErrorForm } from '@/utils/antd/form';
import SelectCategorySpend from '@/components/atoms/inputs/SelectCategorySpend';

type FormManagementProps = FormProps<TCategoryBuyPayload>;

export default function CategoryBuyForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Category Spend"
        name="categorySpendId"
        rules={[requiredRule]}
      >
        <SelectCategorySpend />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <Input.TextArea placeholder="Name..." rows={5} />
      </Form.Item>
    </Form>
  );
}

export const useCategoryBuyForm = (
  dataHook: TExpectQueryResult<TCategoryBuyPaginateResponse>,
) => {
  const [form] = Form.useForm<TCategoryBuyPayload>();

  const setFields = (record: TCategoryBuyResponse) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      categorySpendId: record.categorySpend.id,
      haveUserId: record.haveUser?.id,
    });
  };

  const createMutation = useCreateCategoryBuy();
  const onCreate = () => {
    createMutation.mutate(form.getFieldsValue(), {
      onSuccess: () => {
        successMessage();
        dataHook.refetch();
      },
      onError: (data) => {
        failedMessage();
        setErrorForm(form, data.message);
      },
    });
  };

  const updateMutation = useUpdateCategoryBuy();
  const onUpdate = (id: TCategoryBuyResponse['id']) => {
    updateMutation.mutate(
      {
        id,
        payload: form.getFieldsValue(),
      },
      {
        onSuccess: () => {
          successMessage();
          dataHook.refetch();
        },
        onError: (data) => {
          failedMessage();
          setErrorForm(form, data.message);
        },
      },
    );
  };

  const deleteMutation = useDeleteCategoryBuy();
  const onDelete = (id: TCategoryBuyResponse['id']) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        successMessage();
        dataHook.refetch();
      },
      onError: () => {
        failedMessage();
      },
    });
  };

  return {
    form,
    setFields,

    createMutation,
    onCreate,

    updateMutation,
    onUpdate,

    deleteMutation,
    onDelete,
  };
};
