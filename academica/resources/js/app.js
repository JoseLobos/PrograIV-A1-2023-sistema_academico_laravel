import './bootstrap';
import { createApp } from 'vue';
window.db = "";
import materia from './components/MateriaComponent.vue';
import alumno from './components/AlumnoComponent.vue';
import docente from './components/DocenteComponent.vue';
import matricula from './components/MatriculaComponent.vue';
import inscripcion from './components/InscripcionComponent.vue';


const app = createApp({
    components:{
        alumno,docente,materia,matricula,inscripcion
    },
    data(){
        return {
            forms:{
                docente     : {mostrar:false},
                alumno      : {mostrar:false},
                materia     : {mostrar:false},
                matricula   : {mostrar:false},
                inscripcion : {mostrar:false},
            }
        }
    },
    methods:{
        abrirFormulario(form){
            for (let key in this.forms){
                if(key !==form){
                    this.forms[key].mostrar=false;
                }
            }
            this.forms[form].mostrar = true;
            this.$refs[form].listar();
        },
        abrirBD(){
            let indexDB = indexedDB.open('db_sistema_academico',1);
            indexDB.onupgradeneeded=e=>{
                let req = e.target.result,
                tbldocente = req.createObjectStore('tbldocentes', {keyPath:'idDocente'}),
                tblalumno = req.createObjectStore('tblalumnos',{keyPath:'idAlumno'}),
                tblmateria = req.createObjectStore('tblmaterias',{keyPath:'idMateria'});
                tblmatricula = req.createObjectStore('tblmatriculas',{keyPath:'idMatricula'});
                tblinscripcion = req.createObjectStore('tblinscripciones',{keyPath:'idInscripcion'});
                

            tbldocente.createIndex('idDocente', 'idDocente', {unique:true});
            tblalumno.createIndex('idAlumno', 'idAlumno', {unique:true});
            tblmateria.createIndex('idMateria', 'idMateria', {unique:true});
            tblmatricula.createIndex('idMatricula', 'idMatricula', {unique:true});
            tblinscripcion.createIndex('idInscripcion', 'idInscripcion', {unique:true});
           
           
            };
            indexDB.onsuccess= e=>{
                db = e.target.result;
            };
            indexDB.onerror= e=>{
                console.error( e );
            };
        }, 
    },
    created() {
        this.abrirBD();
    }
});
app.mount("#app");