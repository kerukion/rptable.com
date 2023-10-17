import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { core } from '~core';
import { db } from '~db';
import { APIService } from '~frontend/services';
import { actions } from '~frontend/store';
import { CURRENT_USER } from './keys';
import { asRoute, setRoute } from './routing';

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<db.user.Schema, core.APIErrorResponse, GoogleLoginResponse | GoogleLoginResponseOffline>((googleData) => {
        if (!(googleData as GoogleLoginResponse).tokenId) {
            throw Error('offline');
        }
        return APIService.login((googleData as GoogleLoginResponse).tokenId)
    }, {
        onSuccess: (data: db.user.Schema) => {
            queryClient.setQueryData(CURRENT_USER, data);
        }
    });
}

export const useCreateCampaignMutation = () => {
    const dispatch = useDispatch();
    return useMutation<db.campaign.Schema, core.APIErrorResponse, core.NewCampaignForm>((formData) => {
        return APIService.newCampaign(formData)
    }, {
        onSuccess: (data: db.campaign.Schema) => {
            setRoute(asRoute('/campaigns/:id', data._id!))
            dispatch(actions.campaign.set({ value: data._id }))
        }
    });
}

// 6189c6a3e4dfb48e012cd530