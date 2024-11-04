import * as url from 'url';


const config = {
    PORT: 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // getter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    MONGODB_URI: 'mongodb://127.0.0.1:27017/coder70275',
      USERS_COLLECTION: 'users_indexing',
    CARTS_COLLECTION: 'carts',
    PRODUCTS_COLLECTION: 'products',
    ORDERS_COLLECTION: 'orders',
    ITEMS_PER_PAGE: 10
};


export default config;