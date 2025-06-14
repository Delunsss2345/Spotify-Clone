export const formatDuration = (second: number) => {
    const minutes = Math.floor(second / 60);
    const remainingSeconds = second % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const formatTime = (second: number) => {
    const minutes = Math.floor(second / 60);
    const remainingSeconds = Math.floor(second % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

