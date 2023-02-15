const mongoose = require('mongoose');
const {config} = require('./config');
const {Share} = require('./models/share.model');

async function connect (db = 'rehal') {
    try {
        const start = new Date().getTime();
        await mongoose.connect(config.databaseURL || '', {
            dbName: db
        }, null);
        const end = new Date().getTime();
        console.log('Connection time :', end - start, 'milliseconds');
    } catch (e) {
        console.error('Connection error :', e);
        throw e;
    }
}

/**
 *
 * @param options {{sort?: string, pageSize?: number, page?: number}}
 *
 * @returns {{limit: number, skip: number, sort: string}}
 */
function prepareOptions (options) {
    let skip = 0, limit = 25, sort = '-_id';
    if (options.sort) {
        sort = options.sort.toString();
    }
    if (options.pageSize) {
        const inputLimit = parseInt(options.pageSize.toString());
        if (inputLimit > 0 && inputLimit <= 500) {
            limit = inputLimit
        }
    }
    if (options.page) {
        const page = parseInt(options.page.toString());
        if (page > 0) {
            skip = (page - 1) * limit;
        }
    }
    return {sort, limit, skip};
}

/**
 *
 * @param data {object}
 * @returns {Promise<HydratedDocument<any, {}, {}>[]>}
 */
exports.create = async function (data) {
    try {
        await connect();
        return await Share.create(data);
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param props {{
 *      filter?: object,
 *      projection?: string,
 *      opts?: {sort: string, pageSize: number, page: number}
 * }}
 * @returns {
 *      Promise<{count: Query<number, any, {}, any>,
 *      list: Query<LeanDocument<Array<HydratedDocument<any, {}, {}>>[number]>[] | any[], any, {}, any>}>
 * }
 */
exports.readMany = async function (props) {
    try {
        const {
            filter = {},
            projection = '',
            opts = {}
        } = props;
        const options = prepareOptions(opts);
        await connect();
        const count = await Share.countDocuments(filter);
        const list = await Share.find(filter, projection, options).lean();
        return {count, list};
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param props {{filter?: object, projection?: string}}
 * @returns {Promise<{item: Query<any, any, {}, any>}>}
 */
exports.readOne = async function (props) {
    try {
        const {
            filter = {},
            projection = ''
        } = props;
        await connect();
        const item = await Share.findOne(filter, projection).lean();
        return {item}
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param props {{filter; object, update: object}}
 * @returns {Promise<void>}
 */
exports.updateOne = async function (props) {
    try {
        const {
            filter,
            update
        } = props;
        if (filter && Object.keys(filter).length > 0 && update) {
            await connect();
            await Share.updateOne(filter, update);
        }
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param filter {object}
 * @returns {Promise<void>}
 */
exports.deleteOne = async function (filter) {
    try {
        if (filter && Object.keys(filter).length > 0) {
            await connect();
            await Share.deleteOne(filter);
        }
    } catch (e) {
        throw e;
    }
}
