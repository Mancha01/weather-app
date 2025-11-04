import favoritesReducer, {
  toggleFavorite,
  loadFavorites,
} from "../favoritesSlice";

describe("favoritesSlice", () => {
  const initialState = {
    favorites: [],
  };

  it("should return the initial state", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should add a city to favorites", () => {
    const cityId = "city-1";
    const actual = favoritesReducer(initialState, toggleFavorite(cityId));
    expect(actual.favorites).toContain(cityId);
  });

  it("should remove a city from favorites", () => {
    const cityId = "city-1";
    const stateWithFavorite = {
      favorites: [cityId],
    };
    const actual = favoritesReducer(stateWithFavorite, toggleFavorite(cityId));
    expect(actual.favorites).not.toContain(cityId);
  });

  it("should load favorites from storage", () => {
    const favorites = ["city-1", "city-2", "city-3"];
    const actual = favoritesReducer(initialState, loadFavorites(favorites));
    expect(actual.favorites).toEqual(favorites);
  });
});
