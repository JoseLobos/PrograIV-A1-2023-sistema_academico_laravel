<template>
    <div id="appMatricula">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATRICULA</div>
                    <div class="card-body">
                        <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                            <div class="row p-1">
                                <div class="col-3 col-md-4">
                                    <label for="txtNombreMatricula">Matricula alumno:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="matricula.nombre" type="text" class="form-control" name="txtNombreMatricula" id="txtNombreMatricula">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-4">
                                    <label for="txtFechaMatricula">Fecha de matricula :</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required 
                                        v-model="matricula.fechadematri" type="date" class="form-control" name="txtFechadematriMatricula" id="txtFechadematriMatricula">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-4">
                                    <label for="txtCorreoMatricula">Correo:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú-@ ]{3,75}"
                                        v-model="matricula.correo" type="text" class="form-control" name="txtCorreoMatricula" id="txtCorreoMatricula">
                                </div>
                            </div>
                            
                            <div class="row p-1">
                            <div class="col-3 col-md-4">
                              <label for="carrera">Carrera:</label>
                            </div>
                            <div class="col-6 col-md-6">
                              <select required v-model="matricula.carrera" name="txtCarreraMatricula" id="txtCarreraMatricula">
                                <option value="" disabled>Selecciona tu carrera</option>
                                <option value="Derecho">Derecho</option>
                                <option value="Relaciones Internacionales">Relaciones Internacionales</option>
                                <option value="Comunicación y Periodismo">Comunicación y Periodismo</option>
                                <option value="Mercadotecnia">Mercadotecnia</option>
                                <option value="Ingenieria en Sistema y Redes Informaticas">Ingenieria en Sistema y Redes Informaticas</option>
                                
                              </select>
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
                    <div class="card-header">LISTADO DE MATRICULAS</div>
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
                                    <th>FECHA DE MATRICULA</th>
                                    <th>CORREO</th>
                                    <th>CARRERA</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                    <td>{{ matricula.nombre }}</td>
                                    <td>{{ matricula.fechadematri }}</td>
                                    <td>{{ matricula.correo }}</td>
                                    <td>{{ matricula.carrera }}</td>
                                   
                                    <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
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
                matriculas: [],
                matricula:{
                    idMatricula  : '',
                    nombre    : '',
                    fechadematri    : '',
                    correo : '',
                    carrera : '',
                    
                }
            }
        },
        methods:{
            async guardarMatricula(){
                this.listar();
                let method = 'POST';
                if(this.accion==='nuevo'){
                    this.matricula.idMatricula = new Date().getTime().toString(16);
                    this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
                    method = 'POST';
                }else if(this.accion==='modificar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
                    method='PUT';
                }else if(this.accion==='eliminar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas.splice(index,1);
                    method = 'DELETE';
                }
                localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
                await axios({
                    url:'/matriculas',
                    method,
                    data: this.matricula
                }).then(resp=>{
                    console.log('exito', resp);
                }).catch(err=>{
                    console.log('error', err);
                });
                this.nuevoMatricula();
            },
            eliminarMatricula(matricula){
                if( confirm(`Esta seguro de eliminar a ${matricula.nombre}?`) ){
                    this.accion='eliminar';
                    this.matricula=matricula;
                    this.guardarMatricula();
                }
            },
            nuevoMatricula(){
                this.accion = 'nuevo';
                this.matricula.idMatricula = '';
                this.matricula.nombre = '';
                this.matricula.fechadematri = '';
                this.matricula.correo = '';
                this.matricula.carrera = '';
               
            },
            modificarMatricula(matricula){
                this.accion = 'modificar';
                this.matricula = matricula;
            },
            listar(){
                this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(matricula=>matricula.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1||
                matricula.fechadematri.indexOf(this.buscar)>-1 ||
                matricula.correo.indexOf(this.buscar)>-1 ||
                matricula.carrera.indexOf(this.buscar)>-1 
              
                    )
            }
        }
    }
</script>