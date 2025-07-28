import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  stats: Stats;
  isSongsLoading: boolean;
  isStatsLoading: boolean;
  fetchAlbums: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  deleteSongs: (id: string) => Promise<void>;
  deleteAlbums: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    uniqueArtists: 0,
  },
  isSongsLoading: false,
  isStatsLoading: false,
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data?.data || [] });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching albums" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data || [] });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching songs" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data?.data || null });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data || [] });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Error fetching featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ madeForYouSongs: response.data || [] });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Error fetching made for you songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ trendingSongs: response.data || [] });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Error fetching trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      console.log(response.data.data);
      set({
        stats: response.data?.data || {
          totalSongs: 0,
          totalAlbums: 0,
          totalUsers: 0,
          uniqueArtists: 0,
        },
      });
    } catch (error: any) {
      console.log(error);
      set({ error: error.response?.data?.message || "Error fetching stats" });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSongs: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: (state.songs || []).filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      toast.error("Error delete song");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbums: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);

      set((state) => {
        return {
          albums: (state.albums || []).filter((album) => album._id !== id),
          songs: (state.songs || []).map((song) => {
            if (song.albumId === id) {
              return { ...song, album: null }; // hoặc albumId: null nếu cần xoá hẳn
            }
            return song;
          }),
        };
      });

      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error("Error deleting album");
    } finally {
      set({ isLoading: false });
    }
  },
}));
