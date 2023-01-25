# PloyConJS
A node JS lib to talk with [PloygonDB](https://github.com/JewishLewish/PolygonDB) simply<br/>
Example basic use
```js
const ploycon = require('ployconjs');

const db = new ploycon("localhost:8000","Better_Password");

main()
async function main(){
    console.log(await db.getschema('ExampleDB'))
}
```
Read our [WIKI](https://github.com/NekaouMike/PloyConJS/wiki) for all functions and usage