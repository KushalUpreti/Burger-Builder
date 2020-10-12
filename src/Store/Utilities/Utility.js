export const utilityMethod = (oldState, newProperties) => {
    return {
        ...oldState,
        ...newProperties
    }
}
