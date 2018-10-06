export default class FootnoteModel {
  static find (id, callback) {
    const query = `SELECT * FROM footnotes WHERE id=${id}`;

    const results = window.data.db.exec ( query )[ 0 ] || { values: [] };
    callback(this.buildFootnote( results.values[0] ));
  }

  static buildFootnote ( obj ) {
    return new FootnoteModel ( obj );
  }

  constructor ( obj ) {
    this.id = obj[2];
    this.text = obj[1];
  }
}
