const SearchResults = ({ results = [], onClickResult }) => {
    const handleClickResult = (item) => {
        if (onClickResult) onClickResult(item);
    };

    return (
        <div>
            {results.map((item) => (
                <div key={item.id}>
                    <button type="button" onClick={() => handleClickResult(item)}>
                        {item.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
