export interface StylePickerProps {
  icon: React.ComponentType<{ className?: string }>
  tooltip: string
  property: 'color' | 'background-color'
  defaultColor: string
  selectionStyle?: string
}

export interface ColorPickerViewProps {
  color: string
  onColorChange: (color: string) => void
  onReset: () => void
}

export interface BadgeStyle {
  name: string
  background: string
  color: string
  borderColor?: string
}

export interface BadgePickerViewProps {
  selectedStyle: BadgeStyle
  onStyleChange: (style: BadgeStyle) => void
  onReset: () => void
}
