const constraints = {
    firstname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            minimum: 3,
            message: 'on Metastra can\'t be too short. Enter at least 3 characters'
        },
        format: {
            pattern: '[A-Za-z]+$',
            message: 'This name contains certain characters that aren\'t permitted. Enter only letters'
        }

    },

    surname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            minimum: 3,
            message: 'on Metastra can\'t be too short. Enter at least 3 characters'
        },
        format: {
            pattern: '[A-Za-z]+$',
            message: 'contains certain characters that aren\'t permitted. Enter only letters'
        }

    }
}

export default constraints;