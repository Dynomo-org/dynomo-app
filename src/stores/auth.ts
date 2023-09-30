import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState, AuthStore } from "./auth.types";

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: "",
            userID: "",
            setAuth: (state: AuthState) => set(() => ({ ...state })),
            clearAuth: () => set(() => ({ accessToken: "", userID: "" }))
        }),
        {
            name: "_DNM_AUTH",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useAuthStore