import { useForm, Controller } from "react-hook-form";
import {
  obtenerAnuncioPorId,
  actualizarAnuncio,
  uploadImage,
  obtenerCategorias,
} from "../services/firebaseServices";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Anuncio_Tipo, Categoria } from "../types";
import { capitalize } from "../utils/capitalize";
import { Loading } from "../components/common/Loading";

import "../styles/admin/crearAnuncio.css";

export const EditarAnuncio = () => {
  const { articuloId } = useParams<{ articuloId: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Anuncio_Tipo>();

  const [anuncio, setAnuncio] = useState<Anuncio_Tipo | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const posterInputRef = useRef<HTMLInputElement | null>(null);
  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const [posterToDelete, setPosterToDelete] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const anuncioData = await obtenerAnuncioPorId(articuloId!);
        const categoriasData = await obtenerCategorias();
        setAnuncio(anuncioData);
        setCategorias(categoriasData);

        Object.entries(anuncioData).forEach(([key, value]) => {
          setValue(key as keyof Anuncio_Tipo, value);
        });
      } catch (error) {
        setError("Error al obtener los datos");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (articuloId) {
      cargarDatos();
    }
  }, [articuloId, setValue]);

  useEffect(() => {
    if (anuncio) {
      if (anuncio.images) {
        setExistingFiles(anuncio.images); // Cargar los archivos existentes
      }
    }
  }, [anuncio]);

  const handleRemoveExistingPoster = () => {
    setPosterToDelete(anuncio?.poster || null); // Guardar la portada para eliminarla luego
    setAnuncio((prev) => (prev ? { ...prev, poster: "" } : null)); // Remover la portada del estado actual del anuncio
  };

  const handleRemoveExistingFile = (index: number) => {
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    const removedFile = existingFiles[index];

    setExistingFiles(updatedFiles); // Actualizar los archivos visualmente
    setFilesToDelete((prev) => [...prev, removedFile]); // Guardar los archivos que serán eliminados

    // Actualizar el estado del anuncio para reflejar el cambio visualmente
    setAnuncio((prev) => (prev ? { ...prev, images: updatedFiles } : null));
  };

  const onSubmit = async (data: Anuncio_Tipo) => {
    try {
      let updatedData: Partial<Anuncio_Tipo> = { ...data };

      // Si se seleccionó una nueva portada, subirla
      if (posterFile) {
        const posterUrl = await uploadImage(posterFile);
        if (posterUrl) {
          updatedData.poster = posterUrl;
        }
      } else if (posterToDelete) {
        // Si se eliminó la portada actual, establecerla como nula
        updatedData.poster = undefined;
      }

      // Subir nuevas imágenes y videos si se seleccionan
      let newFilesUrls: string[] = [];
      if (imagesFiles.length > 0) {
        newFilesUrls = (
          await Promise.all(
            imagesFiles.map(async (file) => await uploadImage(file))
          )
        ).filter((url): url is string => url !== null);
      }

      // Combinar archivos existentes y nuevos
      updatedData.images = [...existingFiles, ...newFilesUrls];

      // Si hay archivos a eliminar, actualiza el estado de la base de datos si es necesario
      if (filesToDelete.length > 0) {
        // Lógica para eliminar los archivos de la base de datos o almacenamiento
        // Ejemplo: await eliminarArchivos(filesToDelete);
      }

      // Lógica para eliminar la portada del almacenamiento si se eliminó
      if (posterToDelete) {
        // Lógica para eliminar la portada del almacenamiento
        // Ejemplo: await eliminarArchivo(posterToDelete);
      }

      updatedData.destacado = data.destacado === "true";

      await actualizarAnuncio(articuloId!, updatedData);
      toast.success("Anuncio actualizado con éxito", {
        style: { fontSize: "2.4rem" },
      });
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      toast.error("Error al actualizar el anuncio");
      console.error(error);
    }
  };

  const handlePosterChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPosterFile(e.target.files[0]);
    }
  };

  const handleRemovePoster = () => {
    setPosterFile(null);
    if (posterInputRef.current) {
      posterInputRef.current.value = "";
    }
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files) {
        setImagesFiles((prevFiles) => [
          ...prevFiles,
          ...Array.from(e.target.files ?? []),
        ]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagesFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      if (imagesInputRef.current) {
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file));
        imagesInputRef.current.files = dataTransfer.files;
      }

      return updatedFiles;
    });
  };

  const getMimeType = (fileUrl: string) => {
    const fileName = fileUrl.split("?")[0];

    if (fileName.endsWith(".mp4")) return "video/mp4";
    if (fileName.endsWith(".webm")) return "video/webm";
    if (fileName.endsWith(".ogg")) return "video/ogg";
    if (fileName.endsWith(".mov")) return "video/quicktime";
    if (fileName.endsWith(".m4v")) return "video/x-m4v";
    if (fileName.endsWith(".3gp")) return "video/3gpp";
    return "video/mp4"; // Fallback a video/mp4 por defecto si no hay coincidencia
  };

  // Función para determinar si es un video
  const isVideo = (file: string) => {
    // Dividir la URL por el símbolo "?" para ignorar los parámetros de consulta
    const fileName = file.split("?")[0];

    // Comprobar si la URL (sin parámetros) tiene una extensión de video
    return /\.(mp4|webm|ogg|mov|m4v|3gp)$/i.test(fileName);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="crear-container">
      <div className="crear-navbar container-box">
        <h1>Editar anuncio</h1>
        <Link to="/admin">
          <button className="back-button">Volver</button>
        </Link>
      </div>

      <div className="crear-content container-box">
        <form onSubmit={handleSubmit(onSubmit)} className="create-form">
          <div className="anuncio-container">
            <div>
              <label htmlFor="title">Título del Anuncio</label>
              <input
                type="text"
                placeholder="Ejemplo: Toyota Yaris 2015"
                defaultValue={anuncio?.title}
                {...register("title", {
                  required: "El título es requerido",
                  maxLength: {
                    value: 24,
                    message: "El título no puede tener más de 24 caracteres",
                  },
                })}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="description">Descripción del Anuncio</label>
              <textarea
                placeholder="Ejemplo: Vendo Toyota Yaris 2015 en buen estado"
                defaultValue={anuncio?.description}
                {...register("description", {
                  required: "La descripción es requerida",
                  maxLength: {
                    value: 76,
                    message: "El título no puede tener más de 76 caracteres",
                  },
                })}
              />
              {errors.description && (
                <span className="error">{errors.description.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="price">Precio</label>
              <input
                type="text"
                placeholder="Ejemplo: 4.000.000"
                defaultValue={anuncio?.price}
                {...register("price", { required: "El precio es requerido" })}
              />
              {errors.price && (
                <span className="error">{errors.price.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="category">Categoría del Anuncio</label>
              <select
                {...register("category", {
                  required: "La categoría es requerida",
                })}
              >
                <option disabled>-- Seleccionar --</option>
                {categorias.map((category) => (
                  <option key={category.id} value={category.id}>
                    {capitalize(category.name)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error">{errors.category.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="details">Detalles del Anuncio</label>
              <textarea
                placeholder="Escribir todos los detalles del anuncio"
                {...register("details", {
                  required: "Los detalles son requeridos",
                })}
                defaultValue={anuncio?.details}
              />
              {errors.details && (
                <span className="error">{errors.details.message}</span>
              )}
            </div>
          </div>

          <div className="anunciante-container">
            <div>
              <label htmlFor="anunciante.name">Nombre del Anunciante</label>
              <input
                type="text"
                placeholder="Ejemplo: Juan Pérez"
                {...register("anunciante.name", {
                  required: "El nombre del anunciante es requerido",
                })}
                defaultValue={anuncio?.anunciante.name}
              />
              {errors.anunciante?.name && (
                <span className="error">{errors.anunciante.name.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="anunciante.email">Correo del Anunciante</label>
              <input
                type="email"
                placeholder="Ejemplo: juan.perez@example.com"
                {...register("anunciante.email", {
                  required: "El correo electrónico es requerido",
                })}
                defaultValue={anuncio?.anunciante.email}
              />
              {errors.anunciante?.email && (
                <span className="error">{errors.anunciante.email.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="anunciante.tlf">Teléfono del Anunciante</label>
              <input
                type="tel"
                placeholder="Ejemplo: 123456789"
                {...register("anunciante.tlf", {
                  required: "El teléfono es requerido",
                })}
                defaultValue={anuncio?.anunciante.tlf}
              />
              {errors.anunciante?.tlf && (
                <span className="error">{errors.anunciante.tlf.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="destacado">Destacar Anuncio</label>
              <select
                {...register("destacado", {
                  required: "Seleccionar si es destacado es requerido",
                })}
              >
                <option disabled>-- Seleccionar --</option>
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
              {errors.destacado && (
                <span className="error">{errors.destacado.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="poster">Portada del Anuncio</label>
              {anuncio?.poster && !posterFile && (
                <div className="file-list">
                  <img
                    className="media-item"
                    src={anuncio.poster}
                    alt="Portada actual del anuncio"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <button type="button" onClick={handleRemoveExistingPoster}>
                    Eliminar Portada
                  </button>
                </div>
              )}

              <Controller
                control={control}
                name="poster"
                rules={{
                  required: !anuncio?.poster && "La portada es requerida",
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={posterInputRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handlePosterChange(e);
                      }}
                    />
                    {posterFile && (
                      <div className="file-list">
                        {posterFile !== null && (
                          <span className="file-item">{posterFile.name}</span>
                        )}
                        <button type="button" onClick={handleRemovePoster}>
                          Eliminar Portada
                        </button>
                      </div>
                    )}
                  </>
                )}
              />
              {errors.poster && (
                <span className="error">{errors.poster.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="images">Fotos o videos del Anuncio</label>
              <Controller
                control={control}
                name="images"
                rules={{
                  required:
                    !(anuncio?.images?.length ?? 0) &&
                    "Al menos una imagen es requerida",
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      ref={imagesInputRef}
                      multiple
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleImagesChange(e);
                      }}
                    />
                    {imagesFiles.length > 0 && (
                      <div className="fileList-container">
                        {imagesFiles.map((file, index) => (
                          <div key={index} className="file-list">
                            {imagesFiles.length > 0 && (
                              <span className="file-item">{file.name}</span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                            >
                              Eliminar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              />
              {errors.images && (
                <span className="error">{errors.images.message}</span>
              )}

              {(anuncio?.images ?? []).length > 0 && (
                <div className="fileList-container">
                  {anuncio?.images?.map((fileUrl, index) => (
                    <div key={index} className="file-list">
                      {isVideo(fileUrl) ? (
                        <video className="media-item" controls>
                          <source src={fileUrl} type={getMimeType(fileUrl)} />
                          Tu navegador no soporta la reproducción de videos.
                        </video>
                      ) : (
                        <img
                          className="media-item"
                          src={fileUrl}
                          alt={`media-${index}`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingFile(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-break"></div>
          <div className="form-button">
            <button type="submit" className="register-button">
              Actualizar
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
