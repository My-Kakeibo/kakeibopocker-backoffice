import { Form, FormProps, Input } from 'antd';
import { TUserPayload } from '../entities/request';
import { TUserPaginateResponse, TUserResponse } from '../entities/response';
import { useCreateUser, useDeleteUser, useUpdateUser } from '../hook';
import { failedMessage, successMessage } from '@/utils/antd/message';
import { emailRule, requiredRule } from '@/utils/antd/rulesMessage';
import { TExpectQueryResult } from '@/utils/entities/hook';
import { setErrorForm } from '@/utils/antd/form';

type FormManagementProps = FormProps<TUserPayload>;

export default function UserForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Email" name="email" rules={[requiredRule, emailRule]}>
        <Input placeholder="Email..." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[requiredRule]}>
        <Input.Password placeholder="Passowrd..." />
      </Form.Item>
      <Form.Item label="Fullname" name="fullname" rules={[requiredRule]}>
        <Input placeholder="Fullname..." />
      </Form.Item>
    </Form>
  );
}

export const useUserForm = (
  dataHook: TExpectQueryResult<TUserPaginateResponse>,
) => {
  const [form] = Form.useForm<TUserPayload>();

  const setFields = (record: TUserResponse) => {
    form.setFieldsValue({
      email: record.email,
      fullname: record.fullname,
    });
  };

  const createMutation = useCreateUser();
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

  const updateMutation = useUpdateUser();
  const onUpdate = (id: TUserResponse['id']) => {
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

  const deleteMutation = useDeleteUser();
  const onDelete = (id: TUserResponse['id']) => {
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
