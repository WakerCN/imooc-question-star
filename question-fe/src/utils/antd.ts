import { ModalFuncProps } from 'antd';

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

const modalUploadLoading = (
  modal: { update: (configUpdate: ConfigUpdate) => void },
  loading: boolean
) =>
  modal.update((pre) => ({
    ...pre,
    okButtonProps: { ...pre.okButtonProps, loading }
  }));

export const AntdTools = { modalUploadLoading };
