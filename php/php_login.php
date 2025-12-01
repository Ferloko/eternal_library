<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
require_once 'conexion.php';

// Colección de bibliotecarios
$coleccionBibliotecarios = $db->bibliotecarios;
$coleccionLogsLogin = $db->logs_login;

$accion = isset($_POST['accion']) ? limpiarDatos($_POST['accion']) : '';

switch ($accion) {
    case 'login':
        realizarLogin();
        break;
    
    case 'logout':
        realizarLogout();
        break;
    
    case 'verificarSesion':
        verificarSesion();
        break;
    
    default:
        enviarRespuesta(false, 'Acción no válida');
        break;
}

/**
 * Realizar inicio de sesión con MongoDB
 */
function realizarLogin() {
    global $coleccionBibliotecarios, $coleccionLogsLogin;
    
    $usuario = limpiarDatos($_POST['usuario']);
    $clave = limpiarDatos($_POST['clave']);
    
    if (empty($usuario) || empty($clave)) {
        enviarRespuesta(false, 'Por favor ingrese usuario y contraseña');
    }
    
    try {
        // Buscar el bibliotecario por nombre de usuario
        // En producción, usar password_hash() y password_verify()
        $claveHash = md5($clave); // Solo para demostración
        
        $bibliotecario = $coleccionBibliotecarios->findOne([
            'usuario' => $usuario,
            'clave' => $claveHash,
            'estado' => 'activo'
        ]);
        
        if ($bibliotecario === null) {
            enviarRespuesta(false, 'Usuario o contraseña incorrectos');
        }
        
        // Convertir a array
        $bibliotecarioArray = documentoAArray($bibliotecario);
        
        // Crear sesión
        $_SESSION['usuario_id'] = $bibliotecarioArray['_id'];
        $_SESSION['usuario_nombre'] = $bibliotecarioArray['nombre'];
        $_SESSION['usuario_apellido'] = $bibliotecarioArray['apellido'];
        $_SESSION['usuario_email'] = $bibliotecarioArray['email'];
        $_SESSION['usuario_usuario'] = $bibliotecarioArray['usuario'];
        $_SESSION['usuario_rol'] = $bibliotecarioArray['rol'];
        $_SESSION['usuario_logueado'] = true;
        
        // Registrar el login en MongoDB
        $logLogin = [
            'bibliotecario_id' => $bibliotecarioArray['_id'],
            'fecha_login' => new MongoDB\BSON\UTCDateTime(),
            'ip_address' => $_SERVER['REMOTE_ADDR']
        ];
        
        $coleccionLogsLogin->insertOne($logLogin);
        
        enviarRespuesta(true, 'Inicio de sesión exitoso', [
            'nombre' => $bibliotecarioArray['nombre'],
            'apellido' => $bibliotecarioArray['apellido'],
            'rol' => $bibliotecarioArray['rol']
        ]);
        
    } catch (Exception $e) {
        enviarRespuesta(false, 'Error al iniciar sesión: ' . $e->getMessage());
    }
}

/**
 * Cerrar sesión
 */
function realizarLogout() {
    // Destruir todas las variables de sesión
    $_SESSION = array();
    
    // Destruir la sesión
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    session_destroy();
    
    enviarRespuesta(true, 'Sesión cerrada correctamente');
}

/**
 * Verificar si hay una sesión activa
 */
function verificarSesion() {
    if (isset($_SESSION['usuario_logueado']) && $_SESSION['usuario_logueado'] === true) {
        enviarRespuesta(true, 'Sesión activa', [
            'nombre' => $_SESSION['usuario_nombre'],
            'apellido' => $_SESSION['usuario_apellido'],
            'rol' => $_SESSION['usuario_rol']
        ]);
    } else {
        enviarRespuesta(false, 'No hay sesión activa');
    }
}
?>
