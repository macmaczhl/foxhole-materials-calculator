interface StuffIcon {
    stuffName: string
    count: number
}

export function StuffIcon({ stuffName, count }: StuffIcon) {
    return `${stuffName}(${count})`;
}