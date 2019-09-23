<template>
    <v-app>
        <v-app-bar app flat>
            <v-toolbar-title>DDDNS</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container>
                <record-table v-model=records :saving=saving @reset=reset @save=save />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import RecordTable from '~/components/RecordTable';
import axios from 'axios';


class APIClient {
    constructor() {
        this.baseUrl = process.server ? 'http://localhost:3000' : '';
    }

    async getAll() {
        return (await axios.get(this.baseUrl + '/api/records')).data.data.map(x => ({
            id: Math.random(),
            domain: x.domain,
            value: x.value || '',
            port: `${x.port || ''}`,
        }));
    }

    async setAll(data) {
        await axios.put(this.baseUrl + '/api/records', data.filter(x => !!x.domain && !!x.value).map(x => ({
            domain: x.domain,
            value: x.value,
            port: x.port ? parseInt(x.port) : null,
        })));
    }
}


export default {
    components: {RecordTable},
    data: () => ({
        saving: false,
    }),
    computed: {
        api: () => new APIClient(),
    },
    async asyncData() {
        const api = new APIClient();
        const records = await api.getAll();
        return {
            records: records,
            backup: records,
        };
    },
    methods: {
        reset() {
            this.records = this.backup.map(x => Object.assign({}, x));
        },
        async save() {
            this.saving = true;
            await this.api.setAll(this.records);
            this.backup = this.records.map(x => Object.assign({}, x));
            this.saving = false;
        },
    },
}
</script>
