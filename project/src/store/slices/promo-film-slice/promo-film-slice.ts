import {IMovie} from '../../../types/movie';
import {APIRoute, DEFAULT, NameSpace, Status} from '../../../const';
import {createAsyncThunk, createSelector, createSlice,} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../../types/state';
import {RootState} from '../../store';
import {addFavoriteOffer} from '../favorites-slice/favorites-slice';
import { pushNotification } from '../notification-slice/notification-slice';

export interface IPromoFilmSliceState {
  promoFilm: IMovie | null;
  genre: string;
  status: Status;
}

const initialState: IPromoFilmSliceState = {
  promoFilm: null,
  genre: DEFAULT,
  status: Status.Idle
};

export const fetchPromoFilm = createAsyncThunk<IMovie, undefined, ThunkOptions>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie>(APIRoute.Promo);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get promo movie'}));
      throw e;
    }
  }
);

export const promoFilmSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},

  extraReducers: ((builder) => {
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

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      if(state.promoFilm?.id === action.payload.id) {
        state.promoFilm.isFavorite = action.payload.isFavorite;
      }
    });
  })
});

export const selectPromoFilm = (state:RootState) => state[NameSpace.Promo].promoFilm;
export const selectPromoFilmStatus = (state: RootState) => state[NameSpace.Films].status;

export const selectPromoStatus = createSelector([selectPromoFilmStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default promoFilmSlice.reducer;
