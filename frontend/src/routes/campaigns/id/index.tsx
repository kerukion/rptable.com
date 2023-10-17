import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { useDispatch } from 'react-redux';
import { useCampaignQuery } from '~frontend/queries';
import { actions } from '~frontend/store';

interface CampaignProps {
    id?: string;
}

export const Campaign: FunctionalComponent<CampaignProps> = (props) => {
    const dispatch = useDispatch();
    dispatch(actions.campaign.set({ value: props.id }));
    const { data: campaign, isLoading } = useCampaignQuery(props.id);
    console.log(props);
    return (
        <div>
            Viewing campaign: {props.id}
            {JSON.stringify(campaign)}
        </div>
    );
};
