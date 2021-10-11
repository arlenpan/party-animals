import { useForm } from 'react-hook-form';

const VolumeSlider = ({ value, onChange }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            volume: value,
        },
    });

    const onFormSubmit = ({ volume }) => {
        if (onChange) onChange(volume);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            shitty volume slider, will update
            <input {...register('volume')} />
            <button type="submit">Set</button>
        </form>
    );
};

export default VolumeSlider;
