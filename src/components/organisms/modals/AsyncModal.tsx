import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

type AsyncModalProps = {
  button: React.ReactNode;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
  isLoading: boolean;
};

export default function AsyncModal(props: AsyncModalProps) {
  const { title, isLoading, button, children, onSubmit } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    onSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLoading) {
      handleCancel();
    }
  }, [isLoading]);

  return (
    <>
      <div onClick={() => setIsModalOpen(!isModalOpen)}>{button}</div>

      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
}
