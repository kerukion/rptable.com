import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { FunctionalComponent, h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { core } from '~core';
import { FormButton, FormError, FormInput, FormTextArea } from '~frontend/components';
import { useCreateCampaignMutation } from '~frontend/queries';

export const NewCampaign: FunctionalComponent = () => {

    const [imageLoaded, setImageLoaded] = useState(false);

    const newCampaignSchema: yup.SchemaOf<core.NewCampaignForm> = yup.object({
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

    const errorMapping: { [key in keyof core.NewCampaignForm]: Record<string, string> } = {
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

    const { control, trigger, formState: { errors, isValid }, getValues: formValues } = useForm<core.NewCampaignForm>({
        mode: 'all',
        resolver: yupResolver(newCampaignSchema),
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

    const updateImageLoaded = useCallback((bool: boolean) => {
        setImageLoaded(bool);
        trigger('imageUrl');
    }, [setImageLoaded, trigger]);

    const { mutateAsync, isLoading: isSubmitting, error: creationError } = useCreateCampaignMutation();

    const submitForm = useCallback(() => {
        if (!isValid) {
            trigger(); // all
            return;
        }
        if (isSubmitting) {
            return;
        }
        mutateAsync(formValues());
    }, [isValid, isSubmitting, formValues, mutateAsync, trigger]);

    return (<div className='new-campaign'>
        <div className='new-campaign--header'>
            <h1>Create a campaign</h1>
        </div>
        <div className='new-campaign--body'>
            <div className='new-campaign--details'>
                <h2 className='section-title'>Details</h2>
                <div className='form-row'>
                    <span className='form-label'>Name</span>
                    <FormInput
                        maxLength={100}
                        size={'large'}
                        isDisabled={isSubmitting}
                        isError={!!errors.name}
                        {...nameController.field} />
                    <FormError
                        error={errors.name}
                        mapping={errorMapping.name} />
                </div>
                <div className='form-row'>
                    <span className='form-label'>Description</span>
                    <FormTextArea
                        maxLength={500}
                        isDisabled={isSubmitting}
                        isError={!!errors.description}
                        {...descriptionController.field} />
                    <FormError
                        error={errors.description}
                        mapping={errorMapping.description} />
                </div>
                <div className='form-row image-url'>
                    <span className='form-label'>Image URL</span>
                    <FormInput
                        maxLength={500}
                        size={'elastic'}
                        isDisabled={isSubmitting}
                        isError={!!errors.imageUrl}
                        {...imageUrlController.field} />
                    <FormError
                        error={errors.imageUrl}
                        mapping={errorMapping.imageUrl} />
                </div>
                <div className='preview-wrapper'>
                    <img className='preview'
                        src={formValues().imageUrl}
                        onLoad={() => updateImageLoaded(true)}
                        onError={() => updateImageLoaded(false)} />
                    <span>No image</span>
                </div>
            </div>
        </div>
        <div className='new-campaign--footer'>
            <FormButton kind='action' onClick={() => submitForm()}>
                Save
            </FormButton>
            <span className='error'>{creationError && core.APIError.toString(creationError)}</span>
        </div>
    </div>);
};
