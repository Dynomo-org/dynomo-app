import { create } from "zustand";
import { HorizontalType, SnackbarState, SnackbarType, VerticalType } from "./snackbar.types";

const useSnackbarStore = create<SnackbarState>()(set => ({
    isOpen: false,
    type: "info",
    message: "",
    vertical: "top",
    horizontal: "center",
    show: (
        type: SnackbarType,
        message: string,
        vertical?: VerticalType,
        horizontal?: HorizontalType) => set(() => ({
            isOpen: true,
            type: type,
            message,
            vertical: vertical || "bottom",
            horizontal: horizontal || "center"
        })),
    close: () => set(() => ({ isOpen: false, type: undefined }))
}))

export default useSnackbarStore