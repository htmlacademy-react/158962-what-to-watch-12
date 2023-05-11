import {IMovie} from '../../../types/movie';
import {APIRoute, DEFAULT, MAX_STEP, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';

export interface IFilmSliceState {
  films: IMovie[];
  genre: string;
  status: Status;
  maxToShow: number,
}

const initialState: IFilmSliceState = {
  films: [],
  genre: DEFAULT,
  status: Status.Idle,
  maxToShow: MAX_STEP,
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
    showMoreFilms: (state) => {
      state.maxToShow += MAX_STEP;
    },
    resetFilmsCount: (state) => {
      state.maxToShow = MAX_STEP;
    },
  },

  extraReducers: ((builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.Error;
    });
  })
});

export const { changeGenre, showMoreFilms, resetFilmsCount } = filmsSlice.actions;
export const selectFilms = (state:RootState) => state[NameSpace.Films].films;
export const selectStatus = (state: RootState) => state[NameSpace.Films].status;
export const selectGenre = (state: RootState) => state[NameSpace.Films].genre;
export const selectMaxToShow = (state: RootState): number => state[NameSpace.Films].maxToShow;

export const selectFilmsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default filmsSlice.reducer;
