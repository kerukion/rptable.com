import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { FunctionalComponent, h } from 'preact';
import { useController,useForm } from 'react-hook-form';
import * as yup from 'yup';

export const NewCampaign: FunctionalComponent = () => {
    interface NewCampaignForm {
        name: string;
        description: string;
        imageUrl: string;
    }

    const newCampaignSchema: yup.SchemaOf<NewCampaignForm> = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        // validate URL string
        imageUrl: yup.string().required(),
    });

    const errorMapping: { [key in keyof NewCampaignForm]: Record<string, string> } = {
        name: {
            required: 'Field is required',
        },
        description: {
            required: 'Field is required',
        },
        imageUrl: {
            required: 'Field is required',
        },
    }

    const { control, trigger, formState: { errors } } = useForm<NewCampaignForm>({
        mode: 'all',
        resolver: yupResolver(newCampaignSchema),
    });

    const nameController = useController({
        name: 'name',
        control
    });

    // do top to bottom, form control + real mongoDB save on this.

    return (
        <div className='' />
    );
};
