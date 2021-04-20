#!/usr/bin/env -S node

import db from './inxed.js';

async function main(){
  let hello;
  if(!(await db.has('hello'))){
    hello = await db.create({ id: 'hello', email: 'user@example.com' });
  }else{
    hello = await db.get('hello');
  }
  console.log(hello);
}
main();
