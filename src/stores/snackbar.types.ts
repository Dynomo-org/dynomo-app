export type HorizontalType = 'center' | 'left' | 'right'
export type VerticalType = 'top' | 'bottom'
export type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export interface SnackbarState {
    isOpen: boolean
    type: SnackbarType
    message: string
    vertical: VerticalType
    horizontal: HorizontalType
    show: (type: SnackbarType, message: string, vertical?: VerticalType, horizontal?: HorizontalType) => void
    close: () => void
}