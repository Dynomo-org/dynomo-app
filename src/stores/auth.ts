import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: "",
            userID: "",
            setAuth: (state: AuthState) => set(() => ({ ...state })),
            clearAuth: () => set(() => ({}))
        }),
        {
            name: "_DNM_AUTH",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useAuthStore