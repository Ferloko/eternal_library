# Biblioteca Digital - Instalación MongoDB

## Autores
**Rafa #22 y Yani #15 - 6to DAAI**

---

## 📋 Requisitos Previos

1. **PHP 7.4 o superior**
2. **MongoDB Community Server** instalado y corriendo
3. **Composer** (gestor de dependencias de PHP)
4. **Servidor web** (Apache/Nginx con PHP)

---

## 🚀 Instalación Paso a Paso

### 1. Instalar MongoDB

#### En Windows:
- Descarga MongoDB desde: https://www.mongodb.com/try/download/community
- Instala y ejecuta MongoDB como servicio
- Por defecto corre en `localhost:27017`

#### En Linux/Mac:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS con Homebrew
brew install mongodb-community
```

### 2. Verificar que MongoDB está corriendo

```bash
# En la terminal/cmd:
mongo --version

# O conectarte a MongoDB:
mongo
```

### 3. Instalar el Driver de MongoDB para PHP

En la carpeta raíz de tu proyecto, ejecuta:

```bash
composer require mongodb/mongodb
```

Esto creará una carpeta `vendor` con las dependencias necesarias.

### 4. Estructura de Carpetas del Proyecto

```
biblioteca-digital/
│
├── vendor/                  # Generado por Composer (no subir a Git)
├── php/
│   ├── conexion.php        # Conexión a MongoDB
│   ├── usuario.php         # CRUD Usuarios
│   ├── libro.php           # CRUD Libros
│   ├── bibliotecario.php   # CRUD Bibliotecarios
│   ├── prestamo.php        # CRUD Préstamos
│   └── login.php           # Sistema de Login
│
├── assets/
│   └── js/
│       └── clases.js       # Clases JavaScript POO
│
├── index.html
├── usuarios.html
├── libros.html
├── bibliotecarios.html
├── prestamos.html
├── composer.json           # Configuración de Composer
└── README.md
```

### 5. Configurar la Conexión

Edita el archivo `php/conexion.php` con tus credenciales:

```php
define('MONGO_HOST', 'localhost');
define('MONGO_PORT', '27017');
define('MONGO_DATABASE', 'biblioteca_digital');
define('MONGO_USER', ''); // Vacío si no usas auth
define('MONGO_PASS', '');
```

### 6. Crear Base de Datos e Insertar Datos de Prueba

Abre MongoDB Shell o MongoDB Compass y ejecuta:

```javascript
// Conectar a la base de datos
use biblioteca_digital

// Insertar usuarios de ejemplo
db.usuarios.insertMany([
  {
    nombre: "Juan",
    apellido: "Pérez",
    estado: "activo",
    fecha_registro: new Date()
  },
  {
    nombre: "María",
    apellido: "González",
    estado: "activo",
    fecha_registro: new Date()
  }
])

// Insertar libros de ejemplo
db.libros.insertMany([
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    isbn: "9780307474728",
    categoria: "ficcion",
    ejemplares: 5,
    descripcion: "Obra maestra del realismo mágico",
    fecha_registro: new Date()
  },
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    isbn: "9780156013926",
    categoria: "ficcion",
    ejemplares: 3,
    descripcion: "Cuento poético sobre la amistad",
    fecha_registro: new Date()
  }
])

// Insertar bibliotecarios de ejemplo
db.bibliotecarios.insertMany([
  {
    nombre: "Ana",
    apellido: "González",
    email: "ana.gonzalez@biblioteca.cl",
    telefono: "+56 9 1234 5678",
    usuario: "agonzalez",
    clave: "e10adc3949ba59abbe56e057f20f883e", // MD5 de "123456"
    rol: "administrador",
    estado: "activo",
    fecha_registro: new Date()
  },
  {
    nombre: "Carlos",
    apellido: "Muñoz",
    email: "carlos.munoz@biblioteca.cl",
    telefono: "+56 9 8765 4321",
    usuario: "cmunoz",
    clave: "e10adc3949ba59abbe56e057f20f883e", // MD5 de "123456"
    rol: "bibliotecario",
    estado: "activo",
    fecha_registro: new Date()
  }
])

// Crear índices para mejor rendimiento
db.usuarios.createIndex({ "nombre": 1, "apellido": 1 })
db.libros.createIndex({ "isbn": 1 }, { unique: true })
db.libros.createIndex({ "titulo": 1 })
db.bibliotecarios.createIndex({ "usuario": 1 }, { unique: true })
db.bibliotecarios.createIndex({ "email": 1 }, { unique: true })
db.prestamos.createIndex({ "usuario_id": 1 })
db.prestamos.createIndex({ "libro_id": 1 })
db.prestamos.createIndex({ "estado": 1 })
```

### 7. Incluir las Clases JavaScript

En cada HTML, incluye el archivo de clases antes del cierre del `</body>`:

```html
<!-- Tus otros scripts -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/clases.js"></script>

<script>
// Ejemplo de uso
document.addEventListener("DOMContentLoaded", function() {
    // Cargar usuarios
    Usuario.leerTodos(function(response) {
        if (response.success) {
            console.log("Usuarios:", response.datos);
            // Cargar en tabla...
        }
    });
});
</script>
```

---

## 🧪 Probar el Sistema

### 1. Probar Login
```javascript
Bibliotecario.login('agonzalez', '123456', function(response) {
    if (response.success) {
        console.log('Login exitoso:', response.datos);
    } else {
        console.log('Error:', response.mensaje);
    }
});
```

### 2. Probar Inserción de Usuario
```javascript
const nuevoUsuario = new Usuario(null, 'Pedro', 'López', 'activo');
nuevoUsuario.insertar(function(response) {
    if (response.success) {
        console.log('Usuario creado con ID:', response.datos._id);
    }
});
```

### 3. Probar Lectura de Libros
```javascript
Libro.leerTodos(function(response) {
    if (response.success) {
        console.log('Libros encontrados:', response.datos.length);
        response.datos.forEach(libro => {
            console.log(`- ${libro.titulo} por ${libro.autor}`);
        });
    }
});
```

---

## 📝 Características Implementadas

✅ **1pt** - Clases definidas con constructor y métodos en JS  
✅ **1pt** - Objetos de cada clase definidas en JS  
✅ **1pt** - Formularios con método inserción en JS  
✅ **1pt** - Reportes con método de lectura en JS  
✅ **1pt** - Reportes con método de eliminación en JS  
✅ **1pt** - Inicio de sesión usando Ajax PHP  
✅ **1pt** - Ajax en método de insertación (MongoDB)  
✅ **1pt** - Ajax en método de lectura (MongoDB)  
✅ **1pt** - Ajax en método de eliminación (MongoDB)

---

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Este código es para propósitos educativos.

En producción deberías:
- Usar `password_hash()` y `password_verify()` en lugar de MD5
- Implementar tokens CSRF
- Validar y sanitizar todos los inputs en el servidor
- Usar HTTPS
- Implementar rate limiting
- Agregar autenticación JWT para APIs

---

## 🐛 Solución de Problemas

### Error: "Class 'MongoDB\Client' not found"
**Solución**: Ejecuta `composer install` en la carpeta del proyecto

### Error: "Connection refused to localhost:27017"
**Solución**: Verifica que MongoDB esté corriendo:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### Error: "Call to undefined function MongoDB\BSON\UTCDateTime()"
**Solución**: Instala la extensión de MongoDB para PHP:
```bash
pecl install mongodb
```

Y agrega a tu `php.ini`:
```ini
extension=mongodb.so
```

---

## 📚 Documentación Adicional

- MongoDB PHP Library: https://www.mongodb.com/docs/php-library/
- MongoDB Manual: https://www.mongodb.com/docs/manual/
- Composer: https://getcomposer.org/

---

## 👥 Créditos

**Biblioteca Raíces Eternas**  
Creado por: **Rafa #22 y Yani #15 - 6to DAAI**  
Año: 2025
