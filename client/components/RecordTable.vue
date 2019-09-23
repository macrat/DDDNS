<template>
    <v-card flat>
        <v-card-title>records</v-card-title>

        <v-simple-table>
            <thead>
                <tr>
                    <th>domain</th>
                    <th>type</th>
                    <th>value</th>
                    <th>port <small>(optional)</small></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <record-table-row
                    v-for="r in value"
                    :key=r.id
                    :value=r
                    @remove="removeRecord(r)"
                    />
            </tbody>
        </v-simple-table>

        <v-card-actions>
            <v-btn depressed block color="grey darken-2" @click="newRecord">new record</v-btn>
        </v-card-actions>

        <v-card-actions>
            <div class="flex-grow-1" />

            <v-btn @click=reset :disabled="!edited || saving">reset</v-btn>
            <v-btn color=primary @click=save :disabled="!edited || saving" :loading=saving>save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import RecordTableRow from '~/components/RecordTableRow';


export default {
    props: ['value'],
    components: {RecordTableRow},
    data: () => ({
        edited: false,
        saving: false,  // for debuging
    }),
    watch: {
        value: {
            handler() {
                this.edited = true;
            },
            deep: true,
        },
    },
    methods: {
        newRecord() {
            this.$emit('input', [...this.value, {
                id: Math.random(),
                domain: '',
                value: '',
                port: '',
            }]);
        },
        removeRecord(record) {
            this.$emit('input', this.value.filter(x => {
                return x !== record;
            }));
        },
        reset() {
            this.$emit('reset');
        },
        save() {
            this.$emit('save');

            /** for debuging **/
            this.saving = true;
            setTimeout(() => {
                this.saving = false; 
                this.edited = false;
            }, 500);
        },
    },
}
</script>
