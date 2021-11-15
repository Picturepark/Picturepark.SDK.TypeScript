export interface ConfirmOptions {
  title: string;
  message: string;
  options?: {
    okText: string;
    cancelText: string;
  };
  isShareViewer?: boolean;
}

export interface ConfirmResult {
  result: boolean;
}
