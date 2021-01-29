export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_PATCH = 'PATCH';
export const METHOD_DELETE = 'DELETE';

export const API_ROOT = 'https://hiring-task-api.herokuapp.com/v1';
export const TYPE_JSON = 'json';
export const TYPE_FORM = 'form';

export default function fetchAPI(
    endpoint,
    method = METHOD_GET,
    actionData = {},
    requireAuth = false,
    type = TYPE_JSON,
) {
    let body;
    if (type === TYPE_FORM) {
        body = actionData.body;
    } else {
        body = typeof actionData === 'string' ? actionData : JSON.stringify(actionData);
    }

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            accept: 'application/json',
        },
        redirect: 'manual',
    };

    if (type === TYPE_FORM) {
        delete config.headers['Content-Type'];
    }

    if (requireAuth) {
        config.credentials = 'include';
    }

    // Request with GET/HEAD method cannot have body
    if (method !== METHOD_GET) {
        config.body = body;
    }

    return fetch(endpoint, config).then(async (res) => {
        try {
            const json = await res.json();
            return { res, json };
        } catch (e) {
            return { res, json: {} };
        }
    }).then(({
        json,
        res,
    }) => {
        if (!res.ok) {
            const {
                status,
            } = res;
            return Promise.reject({ status, res: json });
        }
        return json;
    });
}
