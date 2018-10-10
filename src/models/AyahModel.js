export default class AyahModel {
  static load (surahId, grpStart, grpEnd, callback) {
    const query = `SELECT * FROM ayah WHERE surah_id=${surahId} AND ayah_group BETWEEN ${grpStart} AND ${grpEnd} ORDER BY id ASC`;

    const results = window.data.db.exec ( query )[ 0 ] || { values: [] };
    callback(results.values.map ( object => this.buildAyah( object ) ));
  }

  static buildAyah ( obj ) {
    return new AyahModel ( obj );
  }

  constructor ( obj ) {
    window.obj=obj;
    this.ayahNumber = String(obj[0]).padStart(3,'0');
    this.surahId = obj[1];
    this.pageNumber = obj[2];
    this.textUthmani = obj[3];
    this.textIndopak = obj[4];
    this.ayahKey = obj[5];
    this.ayahId = obj[6];
    this.ayahGroup = obj[7];
  }
}
