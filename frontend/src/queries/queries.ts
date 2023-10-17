import { useQuery, useQueryClient } from 'react-query';
import { core } from '~core';
import { db } from '~db';
import { APIService } from '~frontend/services';
import { CAMPAIGN, CURRENT_USER, SESSION, USER_CAMPAIGNS } from './keys';

export const useLoginQuery = () => {
    const queryClient = useQueryClient();
    return useQuery<db.user.Schema, core.APIErrorResponse>(CURRENT_USER, APIService.getCurrentUser, {
        retry: false,
        onError: () => {
            queryClient.setQueryData(CURRENT_USER, null);
        },
    });
};

export const useCampaignsForUserQuery = (userId: db.user.Schema['_id']) => {
    return useQuery<db.campaign.Schema[], core.APIErrorResponse>(
        USER_CAMPAIGNS,
        () => APIService.getAllCampaigns({ user_createdby: userId })
    );
};

export const useCampaignQuery = (campaignId: db.campaign.Schema['_id']) => {
    return useQuery<db.campaign.Schema, core.APIErrorResponse>(
        [CAMPAIGN, campaignId],
        () => APIService.getCampaign({ _id: campaignId }),
        {
            enabled: !!campaignId,
        }
    );
};

// export const useCampaignQuery = (campaignId: string | undefined) => {
//     return useQuery<db.campaign.Schema | undefined, core.APIErrorResponse>(
//         [CAMPAIGN, campaignId],
//         () => {
//             if (campaignId === '1') { //mock DB
//                 const mockCampaign: db.campaign.Schema = {
//                     _id: '1',
//                     name: 'The Rival Gods',
//                     description: 'The world of Estrador, invaded by the magic of the Godlands, becomes the latest battlefield in the Far War of the Four Rival Gods.',
//                     imageUrl: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/04/Tyr.jpg?q=50&fit=crop&w=1400&dpr=1.5'
//                 }
//                 return mockCampaign;
//             }
//             return undefined;
//         }
//     );
// }

export const useSessionQuery = () => {
    return useQuery(SESSION, () => {
        const mockSession: core.Session = {
            id: '1',
            campaignId: '1',
            description: '',
            name: 'Capital',
            number: 69,
        };
        return mockSession;
    });
};