import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Configuración de la conexión a MongoDB
const uri = process.env.MONGODB_URI as string;
const dbName = 'biblioteca';
const collectionName = 'usuarios';

// Obtener todos los usuarios
export async function GET() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    const usuarios = await collection.find({}).toArray();
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// Crear un nuevo usuario
export async function POST(request: Request) {
  const usuario = await request.json();
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Validación básica
    if (!usuario.nombre || !usuario.email) {
      return NextResponse.json(
        { error: 'Nombre y email son campos requeridos' },
        { status: 400 }
      );
    }
    
    // Añadir fecha de creación
    usuario.fechaCreacion = new Date();
    
    const result = await collection.insertOne(usuario);
    return NextResponse.json({
      id: result.insertedId,
      ...usuario
    }, { status: 201 });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
