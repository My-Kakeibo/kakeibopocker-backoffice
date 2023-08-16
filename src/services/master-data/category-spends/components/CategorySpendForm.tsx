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
import { TResponseError } from '@/utils/entities/response';
import { UseQueryResult } from '@tanstack/react-query';
import { failedMessage, successMessage } from '@/utils/antd/message';
import { requiredRule } from '@/utils/antd/rulesMessage';

type FormManagementProps = FormProps<TCategorySpendPayload>;

export default function CategorySpendForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Name..." rows={5} />
      </Form.Item>
    </Form>
  );
}

export const useCategorySpendForm = (
  dataHook: UseQueryResult<TCategorySpendPaginateResponse, TResponseError>,
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
      onError: () => {
        failedMessage();
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
        onError: () => {
          failedMessage();
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
