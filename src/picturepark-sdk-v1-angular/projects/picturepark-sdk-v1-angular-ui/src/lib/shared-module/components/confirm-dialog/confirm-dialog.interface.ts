export interface ConfirmOptions {
  title: string;
  message: string;
  options?: {
    okText: string;
    cancelText: string;
  };
}

export interface ConfirmResult {
  result: boolean;
}
