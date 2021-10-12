const joinQueryParams = (params /** obj */) =>
    Object.keys(params)
        .map((key) => {
            const value = params[key];
            if (value) return `${key}=${value}`;
            return '';
        })
        .join('&');

export default joinQueryParams;
