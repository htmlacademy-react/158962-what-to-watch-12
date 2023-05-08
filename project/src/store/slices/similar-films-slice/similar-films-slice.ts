import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {IMovie} from '../../../types/movie';
import {APIRoute, NameSpace, Status} from '../../../const';
import {ThunkOptions} from '../../../types/state';
//import {pushNotification} from '../notification-slice/notification-slice';
//import {addFavoriteOffer} from '../favorites-slice/favorites-slice';

export type ISimilarSliceState = {
  films: IMovie[];
  status: Status;
}

const initialState: ISimilarSliceState = {
  films: [],
  status: Status.Idle,
};


export const fetchSimilarFilms = createAsyncThunk<IMovie[], number, ThunkOptions>(
  'data/fetchSimilarFilms',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IMovie[]>(`${APIRoute.Films}/${filmId}/similar`);
      return data;
    } catch (e) {
      console.log(e);
      //dispatch(pushNotification({type: 'error', message: 'Cannot get nearby offers'}));
      throw e;
    }
  }
);

export const similarFilmsSlice = createSlice( {
  name: NameSpace.SimilarFilms,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSimilarFilms.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchSimilarFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchSimilarFilms.rejected, (state) => {
      state.status = Status.Error;
    });

    /*builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      state.offers.forEach((offer) => {
        if(offer.id === action.payload.id) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
    });*/
  }
});


export const selectSimilarFilmsStatus = (state: RootState) => state[NameSpace.SimilarFilms].status;
export const selectSimilarFilms = (state: RootState) => state[NameSpace.SimilarFilms].films;
export default similarFilmsSlice.reducer;
