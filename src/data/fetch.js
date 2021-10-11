import joinQueryParams from '~/lib/joinQueryParams';

const appFetch = async (
    url,
    { method = 'GET', query, body, headers = { 'Content-Type': 'application/json' }, accessToken }
) => {
    let fetchUrl = url;

    // query params
    if (query && Object.keys(query).length) {
        fetchUrl += `?${joinQueryParams(query)}`;
    }

    // headers
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    const res = await fetch(fetchUrl, {
        method,
        body: JSON.stringify(body),
        headers,
    });

    if (res && res.ok) {
        const body = await res.json();
        return body;
    }

    // TODO: something went wrong - error handling
    return res;
};

export default appFetch;
