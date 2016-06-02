import del      from 'del';
import gulp     from 'gulp';
import jasmine  from 'gulp-jasmine';
import run      from 'run-sequence';
import shell    from 'gulp-shell';
import jsdoc    from 'gulp-jsdoc3'

const paths = {

    js:     [ './src/**/*.js' ],
    spec:   [ './src/**/*.spec.js' ],
    dist:   './app',
    src:    './src',
    doc:    './doc'
};

gulp.task( 'default', cb => {

    run( 'test', 'build', 'docs', cb );
});

gulp.task( 'build', cb => {

    run( 'clean', 'babel', cb );
});

gulp.task( 'docs', cb => {

    run( 'clean-doc', 'build-doc', cb );
});

gulp.task( 'clean-doc', cb => {

    return del( [ paths.doc ] );
});

gulp.task( 'build-doc', cb => {

    let config = { opts: { destination: paths.doc } };

    gulp.src( [ 'README.md', './src/**/*.js' ], { read: false } )
        .pipe( jsdoc( config, cb ) )
    ;
});

gulp.task( 'clean', cb => {

    return del( [ paths.dist ] );
});

gulp.task( 'babel', shell.task([

    'babel src --out-dir app'
]));

gulp.task( 'test', () => {

    gulp.src( paths.spec )
        .pipe( jasmine( { verbose: true } ) )
    ;
});
