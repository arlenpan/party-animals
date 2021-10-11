import { useForm } from 'react-hook-form';

const Search = ({ onSearch }) => {
    const { register, handleSubmit } = useForm();

    const onFormSubmit = ({ search }) => {
        if (onSearch) onSearch(search);
    };

    return (
        <div>
            <div>Search</div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input {...register('search')} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
