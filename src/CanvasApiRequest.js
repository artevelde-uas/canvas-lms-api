import Cookies from 'js-cookie';
import { buildQueryString } from './util';

/**
 * Extends normal Request object
 *
 *   - Extra required headers will be added for the Canvas REST API
 *   - The query parameters will be correctly serialized
 */
export default class CanvasApiRequest extends Request {

    /**
     * @constructor
     *
     * @param  {string} path - A url or Canvas API request object
     * @param  {object} [init] - Settings that you want to apply to the request
     * @param  {string} init.method - The request method (e.g. GET, POST)
     * @param  {object} [init.queryParams] - The data to be serialized to a valid query string
     * @param  {object} [init.data] - The JSON data to be sent as the request body
     */
    constructor(path, { method, queryParams, data } = {}) {
        const url = new URL('/api/v1' + path, window.location);
        const init = {
            method,
            // Add headers required for the Canvas REST API
            headers: new Headers({
                'Accept': 'application/json+canvas-string-ids, application/json+canvas-string-ids, application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-CSRF-Token': Cookies.get('_csrf_token'),
                'X-Requested-With': 'XMLHttpRequest'
            })
        };
        // Get the search params from the url
        const searchParams = Object.fromEntries((new URLSearchParams(url.search)).entries());

        // Add the serialized query parameters to the url
        url.search = '?' + buildQueryString({
            per_page: 100,
            ...searchParams,
            ...queryParams
        });

        // Convert the data to JSON string
        if (data) {
            init.body = JSON.stringify(data);
        }

        super(url, init);

        // Fix for extending native objects in Safari
        Object.setPrototypeOf(this, CanvasApiRequest.prototype);
    }

}
