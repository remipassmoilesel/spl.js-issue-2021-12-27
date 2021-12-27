# spl.js typescript issue

## Description

When I try a simple example:  

```
import SPL from 'spl.js';

export async function splPlayground() {
    const db = await SPL().then(spl => spl.db(undefined));
    console.log(await db.exec('select spatialite_version()').get.first);
}

```

I got these errors:  
```
ERROR in src/splPlayground.ts:4:28

TS2339: Property 'then' does not exist on type 'ISPLSync'.
    2 |
    3 | export async function splPlayground() {
  > 4 |     const db = await SPL().then(spl => spl.db(undefined));
      |                            ^^^^
    5 |
```

Code can be found in this repository: https://github.com/remipassmoilesel/spl.js-issue-2021-12-27  
See `splPlayground.js`: https://github.com/remipassmoilesel/spl.js-issue-2021-12-27/blob/master/src/splPlayground.ts

In my opinion it is due to `spl.js` package.json structure:
```
    ...
    "main": "dist/spl.js",
    "browser": "dist/index.js",   <- Typescript does not seem to use that property
    ...
```

If I modify it like this, all works fine: 
```
    ...
    "main": "dist/index.js",
    ...
```

## Questions

- Is there something that I am doing wrong ?
- Could we only use index.ts without default export ? Since the types are named differently, it would then suffice to 
choose according to the target (node or browser)
```
    import {IAsyncSpl as Spl} from 'spl.js'
    import {ISyncSpl as Spl} from 'spl.js'
```
