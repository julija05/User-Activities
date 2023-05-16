import moment from 'moment';

export const formatTimeSpent = (time) => {
    const t = moment.utc(time * 1000).format('HH:mm');
    if (t) {
        const st = t.split(":")
        if (st && st.length > 1) {
            return st[0] + " hours " + st[1] + " minutes"
        }
    }
    return ""
}