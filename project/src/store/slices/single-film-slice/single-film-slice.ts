import {IMovie} from '../../../types/movie';
import {APIRoute, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';

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
      console.log(e);
      //dispatch(pushNotification({type: 'error', message: 'Cannot get offer'}));
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
