const {
  loadCsv
} = require('@amohajewellery/amohajewellery/src/lib/locale/translate/translate');

module.exports = async () => {
  await loadCsv();
};
