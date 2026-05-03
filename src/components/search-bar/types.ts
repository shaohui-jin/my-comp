export interface SearchBarProps {
  /** 占位提示 */
  placeholder?: string;
  /** 是否可清空 */
  clearable?: boolean;
}

export interface SearchBarEmits {
  /** 按回车或清空时触发 */
  search: [value: string];
}
