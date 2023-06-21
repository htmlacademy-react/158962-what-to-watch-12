import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {INotification} from '../../../types/notification';
import {NameSpace} from '../../../const';
import {RootState} from '../../store';

type NotificationState = {
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notifications = createSlice({
  name: NameSpace.Notifications,
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<Omit<INotification, 'id' | 'duration'>>) => {
      const id = nanoid();
      state.notifications.push({id, ...action.payload});
    },

    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((item) => item.id !== action.payload);
    }
  }
});

export const { pushNotification, clearNotification } = notifications.actions;
export const getNotifications = (state: RootState) => state[NameSpace.Notifications].notifications;

export default notifications.reducer;
