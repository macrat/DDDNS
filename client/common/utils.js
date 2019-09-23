export function guessValueType(record) {
    const value = record.value.trim();

    if (value === '' || record.domain.trim() === '') {
        return 'INVALID';
    }

    const suffix = (1 <= record.port && record.port <= 65535) ? ' + SRV' : '';

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
}
