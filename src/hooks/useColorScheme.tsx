import { useEffect, useMemo } from "react"
import { useMediaQuery } from "react-responsive"
import createPersistedState from "use-persisted-state"

const useColorSchemeState = createPersistedState("colorScheme")

const useColorScheme = () => {
    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined
    )

    const [isDark, setIsDark] = useColorSchemeState()
    const value = useMemo(
        () => (isDark === undefined ? !!systemPrefersDark : isDark),
        [isDark, systemPrefersDark]
    )

    useEffect(() => {
        if (value) {
            document.body.classList.add("dark")
            if (document.getElementById('title-container')! !== null) {
                document.getElementById('title-container')!.classList.add("dark")
            }
            if (document.getElementById('personal_link')! !== null) {
                document.getElementById('personal_link')!.classList.add("dark")
            }
            if (document.getElementById('title-container')! !== null) {
                document.getElementById('title-container')!.classList.add("dark")
            }
        } else {
            document.body.classList.remove("dark")
            if (document.getElementById('title-container')! !== null) {
                document.getElementById('title-container')!.classList.remove("dark")
            }
            if (document.getElementById('personal_link')! !== null) {
                document.getElementById('personal_link')!.classList.remove("dark")
            }
            if (document.getElementById('title-container')! !== null) {
                document.getElementById('title-container')!.classList.remove("dark")
            }
        }
    }, [value])

    return {
        isDark: value,
        setIsDark,
    }
}

export default useColorScheme