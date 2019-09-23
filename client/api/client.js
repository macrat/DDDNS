import {Etcd3} from 'etcd3';

import {guessValueType} from '../common/utils';


class IndexCounter {
    constructor() {
        this.counter = new Map();
    }

    count(domain) {
        if (!this.counter.has(domain)) {
            this.counter.set(domain, 1);
            return 1;
        } else {
            const val = this.counter.get(domain) + 1;
            this.counter.set(domain, val);
            return val;
        }
    }
}


export default class {
    constructor() {
        this.client = new Etcd3();
        this.dnsPath = '/skydns';
    }

    pathToDomain(path) {
        return path.replace(/\/x[0-9]+$/, '').slice(this.dnsPath.length + 1).split('/').reverse().join('.');
    }

    domainToPath(domain, idx) {
        return `${this.dnsPath}/${domain.split('.').reverse().join('/')}/${idx}`;
    }

    etcdToConsole(values) {
        const result = [];
        for (let key in values) {
            const val = JSON.parse(values[key]) || {};

            result.push({
                domain: this.pathToDomain(key),
                value: val.host || '',
                port: val.port || null,
            });
        }
        return result;
    }

    consoleToEtcd(values) {
        const indexes = new IndexCounter();
        const result = [];

        for (let r of values) {
            const idx = indexes.count(r.domain);

            const val = {};

            if (guessValueType(r) === 'TXT') {
                val.text = r.value;
            } else {
                val.host = r.value;
            };

            if (r.port) {
                val.port = r.port;
            }

            result.push({
                key: this.domainToPath(r.domain, idx),
                value: JSON.stringify(val),
            });
        }

        return result;
    }

    async getAll() {
        const records = await this.client.getAll().prefix('/skydns/').strings();
        return this.etcdToConsole(records);
    }

    async setAll(records) {
        const kvs = this.consoleToEtcd(records);

        await this.client.lock(this.dnsPath).do(async () => {
            await this.client.delete().prefix(this.dnsPath);

            for (let kv of kvs) {
                await this.client.put(kv.key).value(kv.value);
            }
        });
    }
}
