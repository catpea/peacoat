#!/usr/bin/env -S node


import db from './db.js';

async function main(){


  let hello;

  if(! (await db.has('hello'))){
    hello = await db.add({ id: 'hello', email: 'user@example.com' });
  }else{
    hello = await db.get('hello');
  }

  console.log(hello);

  // hello.username = 'alice-smith';
  // await db.upd(hello);
  //
  // //const test = await db.get('test');
  // console.log(test);
}
main();
