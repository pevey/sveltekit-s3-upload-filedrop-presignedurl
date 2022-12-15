import db from '$lib/db'

export async function load() {
    let objects = await db.object.findMany()

    for (let object of objects) {
        object.created = shortDate(object.created)
    }
console.log(objects)
    return { objects }
}

function shortDate(date) {
    //takes ISO date format and returns yyyy-mm-dd
    if (!date) { return null }
    date = new Date(date)
    let day = date.getDate()
    let month = date.getMonth() + 1 // January = 0 because JS is weird
    let year = date.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return year + "-" + month + "-" + day
}