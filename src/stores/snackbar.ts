import { create } from "zustand";

const useSnackbarStore = create<SnackbarState>()(set => ({
    value: {
        isOpen: false,
        message: "",
        vertical: "top",
        horizontal: "center"
    },
    show: (message: string, vertical?: VerticalType, horizontal?: HorizontalType) => set(prev => ({
        ...prev,
        state: {
            ...prev.value,
            isOpen: true,
            message,
            vertical: vertical || "bottom",
            horizontal: horizontal || "center"
        }
    })),
    close: () => set(prev => ({ ...prev, state: { ...prev.value, isOpen: false } }))
}))

export default useSnackbarStore