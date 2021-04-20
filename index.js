import {readObject, writeObject} from "./fsx.js";

export {
  readObject,
  writeObject
}

// async function save(name, object){
//
//   const latest = JSON.parse(readdir().sort().pop())
//   if (object.ver <= latest.ver){
//     log('another user has updated this content, go to conflicts to merge your version');
//     // your version was commited to history,
//     // vist the lasterst version of the page, and attempt to add your content again.
//   }
//
//   object.ver++
//   object.instance = uuid()
//   await mkdir( path.join('db', name), {recursive: true})
//   await writeFile(id);
//
// }
