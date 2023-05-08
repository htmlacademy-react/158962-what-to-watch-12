import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IReview } from '../../../types/review';
import { APIRoute, NameSpace, Status } from '../../../const';
import dayjs from 'dayjs';
import { ThunkOptions } from '../../../types/state';
//import { pushNotification } from '../notification-slice/notification-slice';
import {IMovie} from '../../../types/movie';

export type CommentsSliceState = {
  comments: IReview[];
  sendCommentStatus: Status;
}

type CommentData = {
  rating: string;
  comment: string;
  id: IMovie['id'];
}

const initialState: CommentsSliceState = {
  comments: [],
  sendCommentStatus: Status.Idle,
};


export const fetchComments = createAsyncThunk<IReview[], number, ThunkOptions>(
  'data/fetchComments',
  async (filmId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<IReview[]>(`${APIRoute.Comments}/${filmId}`);
      return data;
    } catch (e) {
      console.log(e);
      //dispatch(pushNotification({type: 'error', message: 'Cannot get comments'}));
      throw e;
    }
  }
);

export const postComment = createAsyncThunk<IReview[], CommentData, ThunkOptions>(
  'data/postComment',
  async ({rating,comment, id}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<IReview[]>(`${APIRoute.Comments}/${id}`, {rating, comment});
      return data;
    } catch (e) {
      console.log(e);
      //dispatch(pushNotification({type: 'error', message: 'Cannot send comment'}));
      throw e;
    }
  }
);

export const commentsSlice = createSlice( {
  name: NameSpace.Comments,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(postComment.pending, (state) => {
      state.sendCommentStatus = Status.Loading;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.sendCommentStatus = Status.Success;
    });

    builder.addCase(postComment.rejected, (state) => {
      state.sendCommentStatus = Status.Error;
    });
  }
});


export const selectStatus = (state: RootState) => state[NameSpace.Comments].sendCommentStatus;
export const selectComments = (state: RootState) => state[NameSpace.Comments].comments;

export const selectCommentsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export const selectSortedComments = createSelector([selectComments], (comments) => (
  [...comments].sort((itemA, itemB) => dayjs(itemB.date).diff(dayjs(itemA.date)))
));

export default commentsSlice.reducer;
