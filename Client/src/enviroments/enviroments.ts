export const enviroment = {
    apiURL: 'http://localhost:3001',
    isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
    production: false
}

export const publicKey = {
    isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
    keyPublic: 'TEST-d40f6edb-174f-4da2-b99c-6c8b4d676233'
  };

export const accesToken = {
    isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
    token: 'TEST-175874241100805-050815-a3242323713da8a5666799071a319883-1501134427'
};

export const enviroment1 = {
    production: false,
    isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null
}