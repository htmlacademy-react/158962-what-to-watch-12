import { APIRoute, NameSpace, Status } from '../../../const';
import {IMovie} from '../../../types/movie';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { ThunkOptions } from '../../../types/state';
import { RootState } from '../../store';
import { pushNotification } from '../notification-slice/notification-slice';

export type FavoritesSliceState = {
  favoriteOffers: IMovie[];
  status: Status;
}

const initialState: FavoritesSliceState = {
  favoriteOffers: [],
  status: Status.Idle,
};

export const fetchFavorites = createAsyncThunk<IMovie[], undefined, ThunkOptions>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie[]>(APIRoute.Favorite);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get favorite movies'}));
      throw e;
    }
  }
);

export const addFavoriteOffer = createAsyncThunk<IMovie, IMovie, ThunkOptions>(
  'data/addFavorites',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    try {
      const status = Number(!isFavorite);
      const { data } = await api.post<IMovie>(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot add movie in favorite'}));
      throw e;
    }
  }
);


export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.status = Status.Success;
      state.favoriteOffers = action.payload;
    });

    builder.addCase(fetchFavorites.rejected, (state) => {
      state.status = Status.Error;
    });

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      if(action.payload.isFavorite) {
        state.favoriteOffers.push(action.payload);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== action.payload.id);
      }
    });

  }
});

export const selectFetchStatus = (state: RootState) => state[NameSpace.Favorites].status;
export const selectFavoriteOffers = (state: RootState) => state[NameSpace.Favorites].favoriteOffers;

export const selectFavoriteStatus = createSelector([selectFetchStatus], (status) => ({
  isLoading: status === Status.Loading,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default favoritesSlice.reducer;
