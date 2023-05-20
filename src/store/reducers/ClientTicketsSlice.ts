import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../../models/IServerResponce';

interface ClientTicketsInitialState {
  tickets: Ticket[];
  qrUrl: string | null;
}

const initialState: ClientTicketsInitialState = {
  tickets: [],
  qrUrl: null,
};

export const clientTicketsSlice = createSlice({
  name: 'ClientTicketsSlice',
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ tikets: Ticket[]; qrUrl: string }>) {
      state.tickets = action.payload.tikets;
      state.qrUrl = action.payload.qrUrl;
    },
    reset(state) {
      state.tickets = [];
      state.qrUrl = null;
    },
  },
});

export default clientTicketsSlice.reducer;
