import * as fs from 'node:fs';

export const storage = {
  map: new Map(),
  async add(id, data) {
    if (this.map.get(id)) {
      throw new Error(`Entity with id ${id} exists`);
    }
    this.map.set(id, data);
    this.persist();
  },
  async update(id, data) {
    this.map.set(id, data);
    this.persist();
  },
  async delete(id) {
    this.map.delete(id);
    this.persist();
  },
  async get(id?: string) {
    if (id) {
      return this.map.get(id);
    }

    return Array.from(this.map.values());
  },
  async getBy(propKey, propVal) {
    for (const item of this.map.values()) {
      if (item[propKey] && item[propKey] === propVal) {
        return item;
      }
    }
  },
  async persist() {
    fs.writeFileSync('./db.json', JSON.stringify(await this.get()));
  },
}

export const init = () => {
  if (fs.existsSync('./db.json')) {
    try {
      const dataBuffer = fs.readFileSync('./db.json');
      const data = dataBuffer.toString();
      if (data.length > 0) {
        for (const item of JSON.parse(data)) {
          storage.add(item.id, item);
        }
      }
    } catch (err) {
      console.error('DB init error', err);
    }
  }
}
