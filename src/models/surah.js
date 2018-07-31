export default class Surah {
  static init ( callback ) {
    window.data = {};
    callback();
    /*
    var xhr = new XMLHttpRequest ();
    xhr.open ( 'GET', 'static/ohol.db', true );
    xhr.responseType = 'arraybuffer';

    xhr.onload = function ( e ) {
      var uInt8Array = new Uint8Array ( this.response );
      window.data.db = new SQL.Database ( uInt8Array );

      callback ();
    };
    xhr.send (); */
  }

  static load () {
    return [1,2,3,4];

    //return window.data.db.exec ( "select count(*) from objects" )[ 0 ].values[ 0 ][ 0 ];
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
    return new Surah ( obj );
  }

  constructor ( data ) {
    this.id = id;
    this.name = name;
    this.data = null;
    this.version = version;
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
