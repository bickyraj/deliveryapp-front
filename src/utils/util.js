export const capitalize = string => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getQueryStringValue = (key) => {
    const value = decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                '^(?:.*[&\\?]' +
                    encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
                    '(?:\\=([^&]*))?)?.*$',
                'i'
            ),
            '$1'
        )
    );
    return value ? value : null;
}