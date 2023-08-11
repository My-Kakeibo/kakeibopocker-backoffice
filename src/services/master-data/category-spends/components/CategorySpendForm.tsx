import { Form, FormProps, Input } from 'antd';
import { TCategorySpendPayload } from '../entities/request';
import { TCategorySpendResponse } from '../entities/response';
import {
  useCreateCategorySpend,
  useDeleteCategorySpend,
  useUpdateCategorySpend,
} from '../hook';

type FormManagementProps = FormProps<TCategorySpendPayload>;

export default function CategorySpendForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name">
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Name..." rows={5} />
      </Form.Item>
    </Form>
  );
}

export const useCategorySpendForm = () => {
  const [form] = Form.useForm<TCategorySpendPayload>();

  const setFields = (record: TCategorySpendResponse) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
  };

  const createMutation = useCreateCategorySpend();
  const onCreate = () => {
    createMutation.mutate(form.getFieldsValue());
  };

  const updateMutation = useUpdateCategorySpend();
  const onUpdate = (id: TCategorySpendResponse['id']) => {
    updateMutation.mutate({
      id,
      payload: form.getFieldsValue(),
    });
  };

  const deleteMutation = useDeleteCategorySpend();
  const onDelete = (id: TCategorySpendResponse['id']) => {
    deleteMutation.mutate(id);
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
