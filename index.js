import { configuration } from './configuration.js';
import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { v4 as uuid } from 'uuid';

export default {
  create,
  update,
  has,
  get,

  list,
};

async function create(o){
  await mkdir(path.join(configuration.db, o.id), {recursive: true});
  o.ver = `1-${uuid()}`;
  await writeFile(path.join(configuration.db, o.id, o.ver + '.json'), JSON.stringify(o,null,'  '))
  return o;
}

async function update(o){
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

async function list(id){
  await mkdir(path.join(configuration.db), {recursive: true});
  const list = (await readdir( path.join(configuration.db, id), { withFileTypes: true }) )
  .filter(o => o.isFile()).map(o => o.name)
  .filter(name => !name.match(/^\d+-[a-z0-9]+.json$/)).map(name => ({...name.match(/^(?<ver>.+).json/).groups, name}))
  .sort((a, b) => b.ver - a.ver)
  return list;
}

async function get(id){
  const latest = (await list(id)).reverse().shift().name;
  return JSON.parse((await readFile(path.join(configuration.db, id, latest))).toString());
}
