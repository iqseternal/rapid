

import Pako from 'pako';

import * as fs from 'fs';

const serialize = (value: any) => {
  const data = Pako.deflate(JSON.stringify(value));
        return Buffer.from(data).toString('binary');
}

const deserialize = (text: string) => {
  const compressed = Buffer.from(text, 'binary');
        const decompressed = Pako.inflate(compressed, { to: 'string' });
        return JSON.parse(decompressed);
}

const data = {
  name: 'name',
  age: 18,
  address: {
    street: 'street',
    city: 'city',
  },
}

const t = serialize(data);

fs.writeFileSync('./a', t, 'binary');

const d = deserialize(fs.readFileSync('./a', 'binary'));

console.log(d);
