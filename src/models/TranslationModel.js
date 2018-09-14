export default class TranslationModel {
  static load (ayahIds, callback) {
    const query = `SELECT * FROM translations WHERE ayah_id IN(${ayahIds}) ORDER BY ayah_id ASC`;
    const results = window.data.db.exec ( query )[ 0 ] || { values: [] };

    callback(results.values.map ( object => this.buildTranslation( object ) ));
  }

  static buildTranslation ( obj ) {
    return new TranslationModel ( obj );
  }

  constructor ( obj ) {
    this.id = obj[0];
    this.ayahKey = obj[1];
    this.text = obj[2];
    this.surahId = obj[3];
  }
}
