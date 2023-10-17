import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';
import { core } from '~core';
import { FormButton, FormError, FormInput, FormTextArea } from '~frontend/components';
import { useCreateCampaignMutation } from '~frontend/queries';
import { CampaignFormUtil } from './campaign-form';

export const NewCampaign: FunctionalComponent = () => {
    const {
        controls,
        trigger,
        errors,
        isValid,
        formValues,
        setImageLoaded,
        errorMapping,
    } = CampaignFormUtil.new();

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
                        {...controls.name.field} />
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
                        {...controls.description.field} />
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
                        {...controls.imageUrl.field} />
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
