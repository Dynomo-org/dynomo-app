type HorizontalType = 'center' | 'left' | 'right'
type VerticalType = 'top' | 'bottom'

interface SnackbarStore{
    isOpen: boolean
    message: string
    vertical: VerticalType
    horizontal: HorizontalType
}

interface SnackbarState {
    value: SnackbarStore
    show: (message: string, vertical?: VerticalType, horizontal?: HorizontalType) => void
    close: () => void
}