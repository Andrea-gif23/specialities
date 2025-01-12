const express = require('express');
const app = express();
const port = 3000;


const usersData = [
  { id: 1, name: 'Alice', age: 28, specialty: 'marketing' },
  { id: 2, name: 'Bob', age: 35, specialty: 'developers' },
  { id: 3, name: 'Charlie', age: 30, specialty: 'developers' },
  { id: 4, name: 'David', age: 25, specialty: 'QAs' },
  { id: 5, name: 'Emma', age: 32, specialty: 'ventas' },
  
];


function filtrarPorEspecialidad(especialidad) {
  return usersData.filter(user => user.specialty === especialidad);
}


app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenido al Listado de Usuarios</h1>
    <p>Selecciona una especialidad:</p>
    <ul>
      <li><a href="/marketing">Marketing</a></li>
      <li><a href="/developers">Developers</a></li>
      <li><a href="/QAs">QAs</a></li>
      <li><a href="/ventas">Ventas</a></li>
    </ul>
  `);
});


app.get('/:especialidad', (req, res) => {
  const { especialidad } = req.params;
  const usuarios = filtrarPorEspecialidad(especialidad);

  if (usuarios.length === 0) {
    return res.status(404).send(`
      <h1>404 - No se encontraron usuarios</h1>
      <p>No hay usuarios en la especialidad: ${especialidad}</p>
      <a href="/">Volver al inicio</a>
    `);
  }

  const usuariosHTML = usuarios
    .map(user => `<li>${user.name}, ${user.age} años</li>`)
    .join('');

  res.send(`
    <h1>Especialidad: ${especialidad}</h1>
    <p>Hay ${usuarios.length} usuarios en esta especialidad:</p>
    <ul>${usuariosHTML}</ul>
    <a href="/">Volver al inicio</a>
  `);
});


app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <a href="/">Volver al inicio</a>
  `);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
