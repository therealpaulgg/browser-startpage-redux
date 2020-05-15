// Function returns datetime as well as a bool whether
export default function DatetimeService(): string {
    const date = new Date()

    const hrs = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const mins =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const secs =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${date.toLocaleDateString()} - ${hrs}:${mins}:${secs}`
}
