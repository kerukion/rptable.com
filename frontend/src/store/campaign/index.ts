import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CampaignIdSlice {
    value?: string;
}

const campaignIdSlice = createSlice({
    name: 'campaignId',
    initialState: {
        value: undefined,
    } as CampaignIdSlice,
    reducers: {
        set: (state, action: PayloadAction<CampaignIdSlice>) => {
            state.value = action.payload.value
        },
    },
})

export const actions = campaignIdSlice.actions
export const campaign = campaignIdSlice.reducer;