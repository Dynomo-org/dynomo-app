import { create } from "zustand";

const useSnackbarStore = create<SnackbarState>()(set => ({
    isOpen: false,
    message: "",
    vertical: "top",
    horizontal: "center",
    show: (message: string, vertical?: VerticalType, horizontal?: HorizontalType) => set(() => ({
        isOpen: true,
        message,
        vertical: vertical || "bottom",
        horizontal: horizontal || "center"
    })),
    close: () => set(() => ({ isOpen: false }))
}))

export default useSnackbarStore