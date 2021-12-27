import SPL from 'spl.js';

export async function splPlayground() {
    const db = await SPL().then(spl => spl.db(undefined));
    console.log(await db.exec('select spatialite_version()').get.first);
}
