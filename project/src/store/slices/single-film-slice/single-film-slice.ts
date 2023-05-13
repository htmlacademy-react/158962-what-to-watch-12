import {IMovie} from '../../../types/movie';
import {APIRoute, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';
import {addFavoriteOffer} from '../favorites-slice/favorites-slice';
import { pushNotification } from '../notification-slice/notification-slice';

export interface ISingleFilmSliceState {
  film: IMovie | null;
  status: Status;
}

const initialState: ISingleFilmSliceState = {
  film: null,
  status: Status.Idle
};

export const fetchSingleFilm = createAsyncThunk<IMovie, number, ThunkOptions>(
  'data/fetchSingleFilm',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie>(`${APIRoute.Films}/${filmId}`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get movie'}));
      throw e;
    }
  }
);

export const singleFilmSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},

  extraReducers: ((builder) => {
    builder.addCase(fetchSingleFilm.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchSingleFilm.fulfilled, (state, action) => {
      state.film = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchSingleFilm.rejected, (state) => {
      state.status = Status.Error;
    });

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      if(state.film?.id === action.payload.id) {
        state.film.isFavorite = action.payload.isFavorite;
      }
    });
  })
});

export const selectSingleFilm = (state:RootState) => state[NameSpace.Film].film;
export const selectSingleFilmStatus = (state: RootState) => state[NameSpace.Film].status;

export const selectSingleStatus = createSelector([selectSingleFilmStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default singleFilmSlice.reducer;
