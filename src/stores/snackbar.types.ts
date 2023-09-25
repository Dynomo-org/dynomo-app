type HorizontalType = 'center' | 'left' | 'right'
type VerticalType = 'top' | 'bottom'

interface SnackbarState {
    isOpen: boolean
    message: string
    vertical: VerticalType
    horizontal: HorizontalType
    show: (message: string, vertical?: VerticalType, horizontal?: HorizontalType) => void
    close: () => void
}