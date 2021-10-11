import { useForm } from 'react-hook-form';

const Search = ({ onSearch, placeholder = 'Search' }) => {
    const { register, handleSubmit } = useForm();

    const onFormSubmit = ({ search }) => {
        if (onSearch) onSearch(search);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input {...register('search')} placeholder={placeholder} />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
