export default class AyahModel {
  static load (surahId, limit, callback) {
    const query = `SELECT * FROM ayah WHERE surah_id=${surahId} ORDER BY id ASC limit(${limit})`;

    const results = window.data.db.exec ( query )[ 0 ] || { values: [] };
    callback(results.values.map ( object => this.buildAyah( object ) ));
  }

  static buildAyah ( obj ) {
    return new AyahModel ( obj );
  }

  constructor ( obj ) {
    this.ayahNumber = obj[0];
    this.surahId = obj[1];
    this.pageNumber = obj[2];
    this.text = obj[3];
    this.ayahKey = obj[4];
    this.ayahId = obj[5];
  }
}
