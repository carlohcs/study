
import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { Paciente } from './pacientes/pacienteEntity.js'
import { Endereco } from './enderecos/enderecoEntity.js'
import { Especialista } from './especialistas/EspecialistaEntity.js'
import { Avaliacoes } from './avaliacoes/avaliacoesEntity.js'
import * as dotenv from 'dotenv'
import { Clinica } from './clinicas/clinicaEntity.js'
import { Consulta } from './consultas/consultaEntity.js'
dotenv.config({ path: '.env' })
console.log('|| process.env.DB_HOST: ', process.env.DB_HOST);
console.log('|| process.env.DB_USER: ', process.env.DB_USER);
console.log('|| process.env.DB_DATABASE: ', process.env.DB_DATABASE);
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Paciente, Endereco, Especialista, Avaliacoes, Clinica, Consulta],
  migrations: [],
  subscribers: []
})
