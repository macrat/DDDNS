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
            const value = this.value.value.trim();

            if (value === '' || this.value.domain.trim() === '') {
                return 'INVALID';
            }

            const suffix = (1 <= this.value.port && this.value.port <= 65535) ? ' + SRV' : '';

            if (value.match(/^(?:25[0-5]?|2[0-4][0-9]?|1[0-9]{2}|[1-9][0-9]?|0)(?:.(?:25[0-5]?|2[0-4][0-9]?|1[0-9]{2}|[1-9][0-9]?|0)){3}$/)) {
                return 'A' + suffix;
            }

            if (value.match(/^(::|(?:[0-9a-fA-F]{1,4}:){1,7}:|:(?::[0-9a-fA-F]{1,4}){1,7}|(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/)) {
                return 'AAAA' + suffix;
            }

            if (value.match(/^([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}\.?$/)) {
                return 'CNAME' + suffix;
            }

            return 'TXT';
        },
    },
    methods: {
        remove() {
            this.$emit('remove');
        },
    },
}
</script>
