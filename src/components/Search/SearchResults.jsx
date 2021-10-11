const SearchResults = ({ results = [], onClickResult }) => {
    const handleClickResult = (item) => {
        if (onClickResult) onClickResult(item);
    };

    return (
        <div>
            {results.map((item) => {
                return (
                    <div key={item.id}>
                        <button onClick={() => handleClickResult(item)}>{item.name}</button>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResults;
