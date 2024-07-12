import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  startAfter,
  limit,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebaseConfig";
import { Anuncio_Tipo, Categoria } from "../types";

export const obtenerAnuncios = async (): Promise<Anuncio_Tipo[]> => {
  const querySnapshot = await getDocs(collection(db, "anuncios"));

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as Anuncio_Tipo;
  });
};

export const obtenerAnuncioPorId = async (
  id: string
): Promise<Anuncio_Tipo> => {
  const docRef = doc(db, "anuncios", id);
  const docSnap = await getDoc(docRef);

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Anuncio_Tipo;
};

export const agregarAnuncio = async (anuncio: Anuncio_Tipo) => {
  const newAnuncioRef = collection(db, "anuncios");

  try {
    await addDoc(newAnuncioRef, anuncio);
    console.log("Anuncio creado con éxito");
  } catch (err) {
    console.error("Error al crear el anuncio", err);
  }
};

export const actualizarAnuncio = async (
  id: string,
  anuncio: Partial<Anuncio_Tipo>
) => {
  const anuncioRef = doc(db, "anuncios", id);

  try {
    await updateDoc(anuncioRef, anuncio);
    console.log("Anuncio actualizado con éxito");
  } catch (err) {
    console.error("Error al actualizar el anuncio", err);
    throw err;
  }
};

export const eliminarAnuncio = async (id: string) => {
  const anuncioRef = doc(db, "anuncios", id);

  try {
    await deleteDoc(anuncioRef);
    console.log("Anuncio eliminado con éxito");
  } catch (err) {
    console.error("Error al eliminar el anuncio", err);
    throw err;
  }
};

export const obtenerAnunciosPaginados = async (
  lastVisible: any = null,
  itemsPerPage: number = 15
): Promise<{ anuncios: Anuncio_Tipo[]; lastVisible: any }> => {
  let q;
  if (lastVisible) {
    q = query(
      collection(db, "anuncios"),
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(itemsPerPage)
    );
  } else {
    q = query(
      collection(db, "anuncios"),
      orderBy("date", "desc"),
      limit(itemsPerPage)
    );
  }

  const querySnapshot = await getDocs(q);
  const anuncios = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Anuncio_Tipo)
  );

  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { anuncios, lastVisible: newLastVisible };
};

export const buscarAnuncios = async (
  searchTerm: string,
  lastVisible: any = null,
  itemsPerPage: number = 15
): Promise<{ anuncios: Anuncio_Tipo[]; lastVisible: any }> => {
  let q;
  if (lastVisible) {
    q = query(
      collection(db, "anuncios"),
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
      orderBy("title"),
      startAfter(lastVisible),
      limit(itemsPerPage)
    );
  } else {
    q = query(
      collection(db, "anuncios"),
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
      orderBy("title"),
      limit(itemsPerPage)
    );
  }

  const querySnapshot = await getDocs(q);
  const anuncios = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Anuncio_Tipo)
  );

  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { anuncios, lastVisible: newLastVisible };
};

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const querySnapshot = await getDocs(collection(db, "categorias"));

  return querySnapshot.docs.map((doc) => {
    const { key, name, image } = doc.data();
    return {
      id: doc.id,
      key,
      name,
      image,
    } as Categoria;
  });
};

export const uploadImage = async (file: File | Blob) => {
  if (!file) return null;

  const storageRef = ref(storage, `images/${(file as File).name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return null;
  }
};

// FUNCIÓN PARA INSERTAR LOS ANUNCIOS DE EJEMPLO
// export const insertarAnuncios = async () => {
//   const anunciosCollection = collection(db, "anuncios");

//   for (const anuncio of articulos) {
//     try {
//       const docRef = await addDoc(anunciosCollection, anuncio);
//       console.log(`Anuncio añadido con ID ${docRef.id}`);
//     } catch (error) {
//       console.error(`Error añadiendo un anuncio:`, error);
//     }
//   }
// };
