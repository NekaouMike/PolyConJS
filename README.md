# PolyConJS
A node JS lib to talk with [PolygonDB](https://github.com/JewishLewish/PolygonDB) simply<br/>
Example basic use
```js
const ploycon = require('polyconjs');

const db = new ploycon("localhost:8000","Better_Password");

main()
async function main(){
    await db.open()
    console.log(await db.getschema('ExampleDB'))
}
```
Read our [WIKI](https://github.com/NekaouMike/PolyConJS/wiki) for all functions and usage