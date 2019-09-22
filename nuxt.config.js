import colors from 'vuetify/lib/util/colors';


export default {
    head: {
        title: 'DDDNS Console - Dummy Dynamic Domain Name System',
        meta: [
            {charset: 'utf-8'},
        ],
    },

    modules: ['@nuxtjs/vuetify'],

    vuetify: {
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.pink.darken2,
                    secondary: colors.red.darken4,
                },
            },
        },
    },
}
