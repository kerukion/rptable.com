import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'preact/hooks';
import { useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { core } from '~core';

export class CampaignFormUtil {
    static new = () => {
        const [imageLoaded, setImageLoaded] = useState(false);
        const schema: yup.SchemaOf<core.NewCampaignForm> = yup.object({
            name: yup.string().required(),
            description: yup.string().required(),
            imageUrl: yup.string().required().test(
                'validUrl',
                '',
                (value?: string) => {
                    return (!!value && imageLoaded);
                }
            ),
        });

        const { control, trigger, formState: { errors, isValid }, getValues: formValues, reset } = useForm<core.NewCampaignForm>({
            mode: 'all',
            resolver: yupResolver(schema),
        });

        const nameController = useController({
            name: 'name',
            control,
        });
        const descriptionController = useController({
            name: 'description',
            control,
        });
        const imageUrlController = useController({
            name: 'imageUrl',
            control,
        });

        return {
            controls: {
                name: nameController,
                description: descriptionController,
                imageUrl: imageUrlController,
            },
            trigger,
            errors,
            isValid,
            formValues,
            imageLoaded,
            setImageLoaded,
            reset,
            errorMapping: CampaignFormUtil.errorMapping,
        };
    };

    static readonly errorMapping: { [key in keyof core.NewCampaignForm]: Record<string, string> } = {
        name: {
            required: 'Field is required',
        },
        description: {
            required: 'Field is required',
        },
        imageUrl: {
            required: 'Field is required',
            validUrl: 'Failed to load image',
        },
    };
}
