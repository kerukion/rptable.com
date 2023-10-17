import { useQuery } from 'react-query';
import { core } from '~core';
import { APIService } from '~frontend/services';
import { CAMPAIGN, CURRENT_USER, SESSION } from './keys';

export const useLoginQuery = () => {
    return useQuery(CURRENT_USER, APIService.getCurrentUser, {retry: false});
}

export const useCampaignQuery = () => {
    return useQuery(CAMPAIGN, () => {
        const mockCampaign: core.Campaign = {
            id: '1',
            name: 'The Rival Gods',
            description: 'The world of Estrador, invaded by the magic of the Godlands, becomes the latest battlefield in the Far War of the Four Rival Gods.',
            imageUrl: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/04/Tyr.jpg?q=50&fit=crop&w=1400&dpr=1.5'
        }
        return mockCampaign;
    })
}

export const useSessionQuery = () => {
    return useQuery(SESSION, () => {
        const mockSession: core.Session = {
            id: '1',
            campaignId: '1',
            name: 'Capital',
            number: 69,
        }
        return mockSession;
    })
}