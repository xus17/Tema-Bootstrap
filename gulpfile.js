require("gulp");
//const{series, parallel}=require("gulp");
const rename=require("gulp-rename");
const concat=require("gulp-concat");
const gulpif=require("gulp-if");
const pleeease=require("gulp-pleeease");
const sass=require("gulp-dart-sass");
const processhtml=require("gulp-processhtml");
const{series, parallel, src, dest, watch}=require("gulp");

function concatenar(){
    return src("css/*.css")
    .pipe(concat("final.css"))
    .pipe(dest("dist/css/"))
}

var options={
    minimize:true,
    rename:true
}

function min_and_rename(){
    return src("./dist/css/final.css")
    .pipe(gulpif(options.minimize,pleeease()))
    .pipe(gulpif(options.rename,
        rename({suffix:".min", extname:".css"})))
    .pipe(dest("dist/css/"));
}

function generar(){
    return src("scss/main.scss")
    .pipe(sass())
    .pipe(pleeease())
    .pipe(rename(
        {suffix:".min",
        extname:".css"}
    ))
    .pipe(dest("proyecto/css/"))
}

function moverLibrerias(){
    return src("./node_modules/bootstrap/dist/js/*").pipe(dest("./proyecto/js"));
}

var options2={
    overwrite:true
}
function procesar_html(){
    return src("./proyecto/index.html")
    .pipe(processhtml())
    .pipe(dest("./proyecto",options2));
}

exports.moverLibrerias=moverLibrerias;
exports.generar=generar;

exports.concatenar=concatenar;
exports.min_and_rename=min_and_rename;
exports.generar=generar;
exports.procesar_html=procesar_html;
exports.default=parallel(generar, moverLibrerias, procesar_html);