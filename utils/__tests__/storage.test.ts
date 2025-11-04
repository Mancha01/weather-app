import { getFavorites, setFavorites, getNotes, setNotes } from "../storage";

describe("Storage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Favorites", () => {
    it("should save and retrieve favorites", () => {
      const favorites = ["city-1", "city-2", "city-3"];

      setFavorites(favorites);
      const result = getFavorites();

      expect(result).toEqual(favorites);
    });

    it("should return empty array for non-existent favorites", () => {
      const result = getFavorites();
      expect(result).toEqual([]);
    });

    it("should handle corrupted data gracefully", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      localStorage.setItem("weather_app_favorites", "{invalid json}");

      const result = getFavorites();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("Notes", () => {
    it("should save and retrieve notes", () => {
      const notes = [
        { id: "1", cityId: "city-1", content: "Note 1", createdAt: Date.now() },
        { id: "2", cityId: "city-2", content: "Note 2", createdAt: Date.now() },
      ];

      setNotes(notes);
      const result = getNotes();

      expect(result).toEqual(notes);
    });

    it("should return empty array for non-existent notes", () => {
      const result = getNotes();
      expect(result).toEqual([]);
    });

    it("should handle corrupted data gracefully", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      localStorage.setItem("weather_app_notes", "{invalid json}");

      const result = getNotes();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
