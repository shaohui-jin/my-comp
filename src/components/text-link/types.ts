export interface TextLinkProps {
  /** 链接文案 */
  text: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 下划线 */
  underline?: boolean;
}

export interface TextLinkEmits {
  /** 点击时触发 */
  click: [event: MouseEvent];
}
