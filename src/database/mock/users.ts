export const users = [
  {
    id: 1,
    username: "superadmin",
    email: "superadmin@superadmin.com",
    password: "$2a$10$VOgrC0a88s8yW1BHjnnpFeSeLN.bwqHYDO7wl5n1IHv.YNNHILq9i",
    telefono: "23423442",
    nombre: "Lucas",
    apellido: "Moretti",
    provincia: null,
    localidad: null,
    avatar: null,
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 1, role: "SUPERADMIN" }], // "ADMIN","USUARIO","EMPLEADO","INVITADO"
    modulos: [
      { id: 5, modulo: "ESTADISTICAS_A" },  
      { id: 1, modulo: "USUARIOS_A" },    //  id: 1, 
      { id: 11, modulo: "PAGOS_A" },       //  id: 11,
      { id: 16, modulo: "MOVIMIENTOS_A" },   //  id: 16,
    ],
  },
  {
    id: 2,
    username: "admin",
    email: "admin@admin.com",
    password: "$2a$10$AaceRZKE9LaIDAvBofHVMuVOk05YnQI26zu4fH3Pu0RBx3MR6x1Rm",
    telefono: "23423442",
    nombre: "Lucas",
    apellido: "Moretti",
    provincia: null,
    localidad: null,
    avatar: null,
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 2, role: "ADMIN" }], // "ADMIN","USUARIO","EMPLEADO","INVITADO"
    modulos: [
      { id: 5, modulo: "ESTADISTICAS_A" },  
      { id: 1, modulo: "USUARIOS_A" },    //  id: 1, 
      { id: 11, modulo: "PAGOS_A" },       //  id: 11,
      { id: 16, modulo: "MOVIMIENTOS_A" },   //  id: 16,
    ],
  },
  {
    id: 3,
    username: "tester",
    email: "tester@tester.com",
    password: "$2a$10$sNXyjLyZl0nxUbP9CCH9oeleJrrszAE0lvbIhFhevku598F02uJMC",
    telefono: "3452344",
    nombre: "Test",
    apellido: "User",
    provincia: null,
    localidad: null,
    avatar: null,
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 8, role: "TESTER" }],
    modulos: [
      { id: 5, modulo: "ESTADISTICAS_A" },  
      { id: 1, modulo: "USUARIOS_A" },    //  id: 1, 
      { id: 11, modulo: "PAGOS_A" },       //  id: 11,
      { id: 16, modulo: "MOVIMIENTOS_A" },   //  id: 16,
    ],
  },
  {
    id: 4,
    username: "empleado",
    email: "empleado@empleado.com",
    password: "$2a$10$MD5JKXU5J1k9JGYSjK0EGO53QXUFoAplPyUWQhQbiFxZIT3/QpngK",
    telefono: "3452344",
    nombre: "empleado",
    apellido: "empleado",
    provincia: null,
    localidad: null,
    avatar: null,
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 5, role: "EMPLEADO" }],
    modulos: [
      { id: 5, modulo: "ESTADISTICAS_A" },  
      { id: 1, modulo: "USUARIOS_A" },    //  id: 1, 
      { id: 11, modulo: "PAGOS_A" },       //  id: 11,
      { id: 16, modulo: "MOVIMIENTOS_A" },   //  id: 16,
    ],
  },
  {
    id: 4,
    username: "usuario",
    email: "usuario@usuario.com",
    password: "$2a$10$T7O1.ho.b9nG2hq6fdQ3i.2VUgQKLdmVVOfO.jFlOV2oUMa8Wn4o2",
    telefono: "3452344",
    nombre: "usuario",
    apellido: "usuario",
    provincia: null,
    localidad: null,
    avatar: null,
    domicilio: null,
    recpass: null,
    activo: true,
    roles: [{ id: 6, role: "USUARIO" }],
    modulos: [
      { id: 5, modulo: "ESTADISTICAS_A" },  
      { id: 1, modulo: "USUARIOS_A" },    //  id: 1, 
      { id: 11, modulo: "PAGOS_A" },       //  id: 11,
      { id: 16, modulo: "MOVIMIENTOS_A" },   //  id: 16,
    ],
  },
];
