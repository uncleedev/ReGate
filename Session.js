export const startSession = ({user, data}) => {
    localStorage.setItem(user, JSON.stringify(data))
}