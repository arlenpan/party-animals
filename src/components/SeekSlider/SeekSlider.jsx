import { useForm } from 'react-hook-form';

const SeekSlider = ({ value, onChange }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            position: value,
        },
    });

    const onFormSubmit = ({ position }) => {
        if (onChange) onChange(position);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            YOU&apos;RE A SEEKER HARRY
            <input {...register('position')} />
            <button type="submit">Set</button>
        </form>
    );
};

export default SeekSlider;
