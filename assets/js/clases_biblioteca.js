// ==========================================
// CLASES DEFINIDAS CON CONSTRUCTOR Y MÉTODOS - MONGODB
// ==========================================

// Clase Usuario
class Usuario {
    constructor(_id, nombre, apellido, estado) {
        this._id = _id; // MongoDB usa _id en lugar de id
        this.nombre = nombre;
        this.apellido = apellido;
        this.estado = estado;
    }

    // Método para insertar usuario
    insertar(callback) {
        $.ajax({
            url: 'php/usuario.php',
            type: 'POST',
            data: {
                accion: 'insertar',
                nombre: this.nombre,
                apellido: this.apellido,
                estado: this.estado
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al insertar usuario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método para actualizar usuario
    actualizar(callback) {
        $.ajax({
            url: 'php/usuario.php',
            type: 'POST',
            data: {
                accion: 'actualizar',
                _id: this._id,
                nombre: this.nombre,
                apellido: this.apellido,
                estado: this.estado
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar usuario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para leer todos los usuarios
    static leerTodos(callback) {
        $.ajax({
            url: 'php/usuario.php',
            type: 'POST',
            data: { accion: 'leer' },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al leer usuarios:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para eliminar usuario
    static eliminar(_id, callback) {
        $.ajax({
            url: 'php/usuario.php',
            type: 'POST',
            data: {
                accion: 'eliminar',
                _id: _id
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar usuario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }
}

// Clase Libro
class Libro {
    constructor(_id, titulo, autor, isbn, categoria, ejemplares, descripcion) {
        this._id = _id;
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.categoria = categoria;
        this.ejemplares = ejemplares;
        this.descripcion = descripcion;
    }

    // Método para insertar libro
    insertar(callback) {
        $.ajax({
            url: 'php/libro.php',
            type: 'POST',
            data: {
                accion: 'insertar',
                titulo: this.titulo,
                autor: this.autor,
                isbn: this.isbn,
                categoria: this.categoria,
                ejemplares: this.ejemplares,
                descripcion: this.descripcion
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al insertar libro:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método para actualizar libro
    actualizar(callback) {
        $.ajax({
            url: 'php/libro.php',
            type: 'POST',
            data: {
                accion: 'actualizar',
                _id: this._id,
                titulo: this.titulo,
                autor: this.autor,
                isbn: this.isbn,
                categoria: this.categoria,
                ejemplares: this.ejemplares,
                descripcion: this.descripcion
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar libro:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para leer todos los libros
    static leerTodos(callback) {
        $.ajax({
            url: 'php/libro.php',
            type: 'POST',
            data: { accion: 'leer' },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al leer libros:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para eliminar libro
    static eliminar(_id, callback) {
        $.ajax({
            url: 'php/libro.php',
            type: 'POST',
            data: {
                accion: 'eliminar',
                _id: _id
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar libro:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }
}

// Clase Bibliotecario
class Bibliotecario {
    constructor(_id, nombre, apellido, email, telefono, usuario, rol, estado) {
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.usuario = usuario;
        this.rol = rol;
        this.estado = estado;
    }

    // Método para insertar bibliotecario
    insertar(callback) {
        $.ajax({
            url: 'php/bibliotecario.php',
            type: 'POST',
            data: {
                accion: 'insertar',
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                telefono: this.telefono,
                usuario: this.usuario,
                rol: this.rol,
                estado: this.estado
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al insertar bibliotecario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método para actualizar bibliotecario
    actualizar(callback) {
        $.ajax({
            url: 'php/bibliotecario.php',
            type: 'POST',
            data: {
                accion: 'actualizar',
                _id: this._id,
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                telefono: this.telefono,
                usuario: this.usuario,
                rol: this.rol,
                estado: this.estado
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar bibliotecario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para leer todos los bibliotecarios
    static leerTodos(callback) {
        $.ajax({
            url: 'php/bibliotecario.php',
            type: 'POST',
            data: { accion: 'leer' },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al leer bibliotecarios:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para eliminar bibliotecario
    static eliminar(_id, callback) {
        $.ajax({
            url: 'php/bibliotecario.php',
            type: 'POST',
            data: {
                accion: 'eliminar',
                _id: _id
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar bibliotecario:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para login
    static login(usuario, clave, callback) {
        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: {
                accion: 'login',
                usuario: usuario,
                clave: clave
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error en login:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }
}

// Clase Prestamo
class Prestamo {
    constructor(_id, usuarioId, libroId, fechaPrestamo, fechaDevolucion, estado, observaciones) {
        this._id = _id;
        this.usuarioId = usuarioId;
        this.libroId = libroId;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
        this.observaciones = observaciones;
    }

    // Método para insertar préstamo
    insertar(callback) {
        $.ajax({
            url: 'php/prestamo.php',
            type: 'POST',
            data: {
                accion: 'insertar',
                usuarioId: this.usuarioId,
                libroId: this.libroId,
                fechaPrestamo: this.fechaPrestamo,
                fechaDevolucion: this.fechaDevolucion,
                estado: this.estado,
                observaciones: this.observaciones
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al insertar préstamo:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método para actualizar préstamo
    actualizar(callback) {
        $.ajax({
            url: 'php/prestamo.php',
            type: 'POST',
            data: {
                accion: 'actualizar',
                _id: this._id,
                usuarioId: this.usuarioId,
                libroId: this.libroId,
                fechaPrestamo: this.fechaPrestamo,
                fechaDevolucion: this.fechaDevolucion,
                estado: this.estado,
                observaciones: this.observaciones
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar préstamo:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para leer todos los préstamos
    static leerTodos(callback) {
        $.ajax({
            url: 'php/prestamo.php',
            type: 'POST',
            data: { accion: 'leer' },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al leer préstamos:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }

    // Método estático para eliminar préstamo
    static eliminar(_id, callback) {
        $.ajax({
            url: 'php/prestamo.php',
            type: 'POST',
            data: {
                accion: 'eliminar',
                _id: _id
            },
            dataType: 'json',
            success: function(response) {
                callback(response);
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar préstamo:', error);
                callback({ success: false, mensaje: 'Error de conexión' });
            }
        });
    }
}

// ==========================================
// OBJETOS DE EJEMPLO
// ==========================================

// Objetos de la clase Usuario
const usuario1 = new Usuario(null, 'Juan', 'Pérez', 'activo');
const usuario2 = new Usuario(null, 'María', 'González', 'activo');
const usuario3 = new Usuario(null, 'Carlos', 'López', 'inactivo');

// Objetos de la clase Libro
const libro1 = new Libro(null, 'Cien años de soledad', 'Gabriel García Márquez', '9780307474728', 'ficcion', 5, 'Obra maestra del realismo mágico');
const libro2 = new Libro(null, 'El principito', 'Antoine de Saint-Exupéry', '9780156013926', 'ficcion', 3, 'Cuento poético sobre la amistad');
const libro3 = new Libro(null, 'Sapiens', 'Yuval Noah Harari', '9788499926223', 'no-ficcion', 2, 'Historia de la humanidad');

// Objetos de la clase Bibliotecario
const bibliotecario1 = new Bibliotecario(null, 'Ana', 'González', 'ana.gonzalez@biblioteca.cl', '+56 9 1234 5678', 'agonzalez', 'administrador', 'activo');
const bibliotecario2 = new Bibliotecario(null, 'Carlos', 'Muñoz', 'carlos.munoz@biblioteca.cl', '+56 9 8765 4321', 'cmunoz', 'bibliotecario', 'activo');

// Objetos de la clase Prestamo
const prestamo1 = new Prestamo(null, '507f1f77bcf86cd799439011', '507f191e810c19729de860ea', '2025-05-01', '2025-05-08', 'prestado', '');
const prestamo2 = new Prestamo(null, '507f1f77bcf86cd799439012', '507f191e810c19729de860eb', '2025-05-03', '2025-05-10', 'prestado', '');
