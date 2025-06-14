import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore()

    //Bấm thì chơi nhạc luôn 
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying])

    //Hết nhạc next luôn 
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        }

        audio?.addEventListener("ended", handleEnded);

        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext])

    //
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;

        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        //Khởi đầu là null , nếu !== thì gắn nhạc trước lưu , rồi xài nhạc mới
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;  //Lấy url

            audio.currentTime = 0; //set nhạc = 0
            prevSongRef.current = currentSong?.audioUrl;  // set cái trước = cái hiện tại 
            if (isPlaying) audio.play(); //Chơi nhạc
        }
    })
    return <audio ref={audioRef} />
}
export default AudioPlayer; 