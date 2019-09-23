<template>
    <v-app>
        <v-app-bar app flat>
            <v-toolbar-title>DDDNS</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container>
                <record-table v-model=records />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import RecordTable from '~/components/RecordTable';


export default {
    components: {RecordTable},
    data: () => ({
        records: [{
            id: Math.random(),
            domain: 'blanktar.jp',
            value: '192.168.11.20',
            port: '80',
        }, {
            id: Math.random(),
            domain: 'www.shidax.co.jp',
            value: 'hoge.fuga.amazonaws.com',
            port: '',
        }],
    }),
}
</script>
