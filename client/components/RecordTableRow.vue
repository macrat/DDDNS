<template>
    <tr>
        <td><v-text-field v-model=value.domain :rules="[rules.required]" /></td>
        <td><v-chip outlined :color="type === 'INVALID' ? 'error' : null">{{ type }}</v-chip></td>
        <td><v-text-field v-model=value.value :rules="[rules.required]" /></td>
        <td><v-text-field v-model=value.port type=number :rules="[rules.portNumber]" /></td>
        <td><v-btn icon @click=remove><v-icon>mdi-delete</v-icon></v-btn></td>
    </tr>
</template>

<script>
import {guessValueType} from '../common/utils';


export default {
    props: ['value'],
    data: () => ({
        rules: {
            required: value => (!!value && value.trim() !== '') || 'Required',
            portNumber: value => {
                if (!value) {
                    return true;
                }
                const port = parseInt(value);
                if (port < 1) {
                    return 'Must 1 or larger';
                }
                if (65535 < port) {
                    return 'Must 65535 or smaller';
                }
                return true;
            },
        },
    }),
    computed: {
        type() {
            return guessValueType(this.value);
        },
    },
    methods: {
        remove() {
            this.$emit('remove');
        },
    },
}
</script>
