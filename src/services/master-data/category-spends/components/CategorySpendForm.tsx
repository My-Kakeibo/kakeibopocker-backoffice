import { Form, FormProps, Input } from 'antd';
import { TCategorySpendPayload } from '../entities/request';
import {
  TCategorySpendPaginateResponse,
  TCategorySpendResponse,
} from '../entities/response';
import {
  useCreateCategorySpend,
  useDeleteCategorySpend,
  useUpdateCategorySpend,
} from '../hook';
import { failedMessage, successMessage } from '@/utils/antd/message';
import { requiredRule } from '@/utils/antd/rulesMessage';
import { TExpectQueryResult } from '@/utils/entities/hook';
import { setErrorForm } from '@/utils/antd/form';

type FormManagementProps = FormProps<TCategorySpendPayload>;

export default function CategorySpendForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <Input.TextArea placeholder="Name..." rows={5} />
      </Form.Item>
    </Form>
  );
}

export const useCategorySpendForm = (
  dataHook: TExpectQueryResult<TCategorySpendPaginateResponse>,
) => {
  const [form] = Form.useForm<TCategorySpendPayload>();

  const setFields = (record: TCategorySpendResponse) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
  };

  const createMutation = useCreateCategorySpend();
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

  const updateMutation = useUpdateCategorySpend();
  const onUpdate = (id: TCategorySpendResponse['id']) => {
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

  const deleteMutation = useDeleteCategorySpend();
  const onDelete = (id: TCategorySpendResponse['id']) => {
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
