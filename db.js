import { configuration } from './configuration.js';
import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { v4 as uuid } from 'uuid';

export default {
  add,
  upd,
  has,
  get,
};

async function add(o){
  await mkdir(path.join(configuration.db, o.id), {recursive: true});
  o.ver = `1-${uuid()}`;
  await writeFile(path.join(configuration.db, o.id, o.ver + '.json'), JSON.stringify(o,null,'  '))
  return o;
}

async function upd(o){
  await mkdir(path.join(configuration.db, o.id), {recursive: true});
  const ver = parseInt(o.ver.split('-')[0]);
  o.ver = `${ver+1}-${uuid()}`;
  await writeFile(path.join(configuration.db, o.id, o.ver + '.json'), JSON.stringify(o,null,'  '))
  return o;
}

async function has(id){
  await mkdir(path.join(configuration.db), {recursive: true});
  return existsSync(path.join(configuration.db, id));
}

async function get(id){
  const latest = (await readdir( path.join(configuration.db, id), { withFileTypes: true }) )
  .filter(o => o.isFile())
  .map(o => o.name)
  .filter(name => !name.match(/^\d+-[a-z0-9]+.json$/))
  .map(name => ({...name.match(/^(?<ver>.+).json/).groups, name}))
  .sort((a, b) => b.ver - a.ver)
  .reverse()
  .shift()
  .name;
  return JSON.parse((await readFile(path.join(configuration.db, id, latest))).toString());
}
