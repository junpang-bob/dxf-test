const DxfParser = require('dxf-parser');
const dxfParser = new DxfParser();
const fs = require('fs');

const layers = [
  'topographic',
  'noumenon',
  'protection scope',
  'development control area',
  'cut',
  'facade_0.25b',
  'facade_0.5b',
  'facade_0.75b',
  'facade_1.5b',
  'green',
  'projection',
  'partition',
  'parting',
  'furni',
  'area',
  'pub_hatch',
  'pub_solid',
  'dote',
  'axis',
  'axis_text',
  'pub_dim',
  'dim_symb',
  'pub_text',
  'dim_lead',
  'dim_iden',
  'dim_elev',
  'pub_title',
];

const transformKeyToSet = obj => new Set(Object.keys(obj).map(key => key.toLowerCase()));

/**
 * 根据dxf文件路径解析dxf内容
 * @param {string} path - 文件路径
 */
function parser(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (err, data) => {
      if (err) return reject(err);
      const { entities, tables } = await dxfParser.parseSync(data.toString());
      const totalLayers = transformKeyToSet(tables.layer.layers);
      const totalContents = new Set(entities.map(entity => entity.layer.toLowerCase()));
      const filteredLayers = layers.filter(layer => totalLayers.has(layer));
      const res = Object.fromEntries(filteredLayers.map(layer => [layer, totalContents.has(layer)]));
      resolve(res);
    });
  });
}

module.exports = parser;
