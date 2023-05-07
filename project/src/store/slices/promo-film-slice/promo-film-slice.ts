import {IMovie} from '../../../types/movie';
import {APIRoute, DEFAULT, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';

export interface IPromoFilmSliceState {
  promoFilm: IMovie | null;
  genre: string;
  status: Status;
}

const initialState: IPromoFilmSliceState = {
  promoFilm: null,
  genre: DEFAULT,
  status: Status.Idle
}

export const fetchPromoFilm = createAsyncThunk<IMovie, undefined, ThunkOptions>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie>(APIRoute.Promo);
      return data;
    } catch (e) {
      console.log(e)
      //dispatch(pushNotification({type: 'error', message: 'Cannot get offers'}));
      throw e;
    }
  }
);

export const promoFilmSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchPromoFilm.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchPromoFilm.fulfilled, (state, action) => {
      state.promoFilm = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchPromoFilm.rejected, (state) => {
      state.status = Status.Error;
    });
  })
});

export const selectPromoFilm= (state:RootState) => state[NameSpace.Promo].promoFilm;
export const selectPromoFilmStatus = (state: RootState) => state[NameSpace.Films].status;

export const selectPromoStatus = createSelector([selectPromoFilmStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default promoFilmSlice.reducer;
