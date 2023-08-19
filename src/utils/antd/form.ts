import { FormInstance } from 'antd';
import { TResponseError } from '../entities/response';

export const setErrorForm = <Payload, Response>(
  form: FormInstance<Payload>,
  message: TResponseError<Response>['message'],
) => {
  form.setFields(
    message.map((item) => ({
      name: item.field,
      errors: item.messages,
    })),
  );
};
