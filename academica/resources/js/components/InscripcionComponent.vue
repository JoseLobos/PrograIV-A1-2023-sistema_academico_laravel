<template>
    <div id="appInscripcion">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                            
                            <div class="row p-1">
                                <div class="col-4 col-md-4">
                                    <label for="txtNombreInscripcion">NOMBRE:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="inscripcion.nombre" type="text" class="form-control" name="txtNombreInscripcion" id="txtNombreInscripcion">
                                </div>
                            </div>
                            
                            <div class="row p-1">
                                <div class="col-4 col-md-4">
                                    <label for="txtMateriaInscripcion">Materia:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="inscripcion.materia" type="text" class="form-control" name="txtMateriaInscripcion" id="txtMateriaInscripcion">
                                </div>
                            </div>
                          
                      
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE INSCRIPCIONES</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar "></th>
                                </tr>
                                <tr>
                                    
                                    <th>NOMBRE</th>
                                    <th>MATERIA</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                    <td>{{ inscripcion.materia }}</td>
                                    <td>{{ inscripcion.nombre }}</td>
                                    
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default{
        props:['form'],
        data(){
            return {
                accion:'nuevo',
                buscar: '',
                inscripciones: [],
                inscripcion:{
                    idInscripcion  : '',
                    
                    nombre    : '',
                    materia    : '',
                  
                }
            }
        },
        methods:{
            async guardarInscripcion(){
                this.listar();
                let method = 'POST';
                if(this.accion==='nuevo'){
                    this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                    this.inscripciones.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
                    method = 'POST';
                }else if(this.accion==='modificar'){
                    let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                    this.inscripciones[index] = JSON.parse( JSON.stringify(this.inscripcion) );
                    method='PUT';
                }else if(this.accion==='eliminar'){
                    let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                    this.inscripciones.splice(index,1);
                    method = 'DELETE';
                }
                localStorage.setItem("inscripciones", JSON.stringify(this.inscripciones) );
                await axios({
                    url:'/inscripciones',
                    method,
                    data: this.inscripcion
                }).then(resp=>{
                    console.log('exito', resp);
                }).catch(err=>{
                    console.log('error', err);
                });
                this.nuevoInscripcion();
            },
            eliminarInscripcion(inscripcion){
                if( confirm(`Esta seguro de eliminar a ${inscripcion.nombre}?`) ){
                    this.accion='eliminar';
                    this.inscripcion=inscripcion;
                    this.guardarInscripcion();
                }
            },
            nuevoInscripcion(){
                this.accion = 'nuevo';
                this.inscripcion.idInscripcion = '';
                this.inscripcion.materia = '';
                this.inscripcion.nombre = '';
               
            },
            modificarInscripcion(inscripcion){
                this.accion = 'modificar';
                this.inscripcion = inscripcion;
            },
            listar(){
                this.inscripciones = JSON.parse( localStorage.getItem('inscripciones') || "[]" )
                .filter(inscripcion=>inscripcion.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1||
               
                inscripcion.materia.indexOf(this.buscar)>-1
                )
                    
            }
        }
    }
</script>