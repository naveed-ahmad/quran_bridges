export default class SurahModel {
  static init ( callback ) {
    window.data = {};
    var xhr = new XMLHttpRequest ();
    xhr.open ( 'GET', 'static/bridges.db', true );
    xhr.responseType = 'arraybuffer';

    xhr.onload = function ( e ) {
      var uInt8Array = new Uint8Array ( this.response );
      window.data.db = new SQL.Database ( uInt8Array );

      callback ();
    };
    xhr.send ();
  }

  static load (limit) {
    const query = `select * from surah limit(${limit})`;
    const results = window.data.db.exec ( query )[ 0 ] || { values: [] };

    return results.values.map ( object => this.buildSurah( object ) );
  }

  static find ( id ) {
    const _id = parseInt ( id )
    if (! _id || _id <= 0 || _id > 114) return;

    const query = `select id, name, version, badges, properties from  objects_properties where id=${String ( id ).split ( "-" )[ 0 ]}`;
    const result = window.data.db.exec ( query )[ 0 ] || { values: [] };

    if (result.values[ 0 ]) {
      return this.buildSurah ( result.values[ 0 ] );
    }
  }

  static buildSurah ( obj ) {
    return new SurahModel ( obj );
  }

  constructor ( obj ) {
    this.surahNumber = String(obj[0]);
    this.nameEnglish = obj[1];
    this.nameArabic = obj[2];
    this.enTranslatedName = obj[3];
    this.ayahCount = obj[4];
    this.revelationPlace = obj[5];
    this.revelationOrder = obj[6];
    this.bismillahPre = obj[7];
    this.pages = obj[8];

    window.data1=this;
 }

  baseName () {
    return this.name.split ( ' - ' )[ 0 ];
  }

  subName () {
    return this.name.split ( ' - ' )[ 1 ];
  }

  url ( ) {
    return `/${this.id}/`;
  }
}
