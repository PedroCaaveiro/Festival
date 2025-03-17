import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js(done) {
  src('src/js/script.js')
    .pipe(dest('dist/js'));
  done();
}

export function css(done) {
  src('src/scss/app.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css', { sourcemaps: true }));
  done();
}

// Nueva tarea para copiar los archivos HTML
export function html(done) {
  src('src/*.html')  // Ajusta la ruta si tienes una estructura diferente
    .pipe(dest('dist/'));  // Copia los archivos HTML a la carpeta 'dist'
  done();
}

export function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', js);
  watch('src/*.html', html);  // Observa los cambios en los archivos HTML
}

export function build(done) {
  series(js, css, html)(done); // Ejecuta js, css y html
}

export default series(build, dev);
