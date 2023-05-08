import {IMovie} from '../../../types/movie';
import {APIRoute, DEFAULT, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';

export interface IFilmSliceState {
  films: IMovie[];
  genre: string;
  status: Status;
  remainFilmsAmount: number;
}

const initialState: IFilmSliceState = {
  films: [],
  genre: DEFAULT,
  status: Status.Idle,
  remainFilmsAmount: 0,
};

export const fetchFilms = createAsyncThunk<IMovie[], undefined, ThunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie[]>(APIRoute.Films);
      return data;
    } catch (e) {
      console.log(e);
      //dispatch(pushNotification({type: 'error', message: 'Cannot get offers'}));
      throw e;
    }
  }
);

export const filmsSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
  },

  extraReducers: ((builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.remainFilmsAmount = action.payload.length;
      state.status = Status.Success;
    });

    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.Error;
    });
  })
});

export const { changeGenre } = filmsSlice.actions;
export const selectFilms = (state:RootState) => state[NameSpace.Films].films;
export const selectStatus = (state: RootState) => state[NameSpace.Films].status;
export const selectGenre = (state: RootState) => state[NameSpace.Films].genre;
export const selectRemainFilmsAmount = (state : RootState) => state[NameSpace.Films].remainFilmsAmount;

export const selectFilmsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default filmsSlice.reducer;
