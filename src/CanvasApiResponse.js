import { canvasApiFetch } from './util';


/**
 * Extends normal Response object
 *
 *   - The result has "while(1);" prepended which will be stripped
 */
export default class CanvasApiResponse extends Response {

    /**
     * Gets a list of link headers from the response
     */
    get links() {
        let linkHeader = this.headers.get('Link');

        if (linkHeader === null) return null;

        return linkHeader.split(',').reduce((links, value) => {
            let match = value.match(/^<https:\/\/.+\/api\/v1\/(.+)>; rel="(\w+)"$/);

            if (match !== null) {
                let type = match[2];
                let url = '/' + match[1];

                links[type] = url;
            }

            return links;
        }, {});
    }

    constructor(response) {
        super(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });

        // Fix for extending native objects in Safari
        Object.setPrototypeOf(this, CanvasApiResponse.prototype);
    }

    /**
     * Takes a Response stream and reads it to completion
     *
     * If the result has "while(1);" prepended, it will be stripped
     *
     * @override
     * @returns {string} A Promise that resolves with a USVString
     */
    async text() {
        return (await super.text()).replace(/^while\(1\);/, '');
    }

    /**
     * Takes a Response stream and reads it to completion
     *
     * @override
     * @returns {string} A Promise that resolves to a JavaScript object
     */
    async json() {
        return JSON.parse(await this.text());
    }

    /**
     * Iterator which loops over all the items from the response
     *
     * Will make additional requests to the API if needed
     *
     * @yields {object} The next object from the JSON response
     */
    async * iterator() {
        let response = this;

        do {
            let data = await response.json();

            if (!(data instanceof Array)) {
                data = [data];
            }

            for (let item of data) {
                yield item;
            }

            response = (this.links === null || response.links.next === undefined) ? null : await canvasApiFetch(response.links.next);
        } while (response !== null);
    }

    /**
     * Returns an array of objects from the response
     *
     * The resulting array is not paged and will contain ALL the objects
     * Will make additional requests to the API if needed
     *
     * @returns {Object[]} An array of objects
     */
    async array() {
        let array = [];

        for await (let item of this.iterator()) {
            array.push(item);
        }

        return array;
    }

}
