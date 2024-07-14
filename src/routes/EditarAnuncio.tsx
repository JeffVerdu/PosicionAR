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

  useEffect(() => {
    console.log(articuloId);
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

  const onSubmit = async (data: Anuncio_Tipo) => {
    try {
      let updatedData: Partial<Anuncio_Tipo> = { ...data };

      if (posterFile) {
        const posterUrl = await uploadImage(posterFile);
        if (posterUrl) {
          updatedData.poster = posterUrl;
        }
      }

      if (imagesFiles.length > 0) {
        const imagesUrls = await Promise.all(
          imagesFiles.map(async (file) => await uploadImage(file))
        );
        updatedData.images = imagesUrls.filter(
          (url): url is string => url !== null
        );
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
              <Controller
                control={control}
                name="poster"
                {...{ required: "La portada es requerida" }}
                render={({ field }) => (
                  <>
                    <input
                      required
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
                          Eliminar
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
              <label htmlFor="images">Fotos del Anuncio</label>
              <Controller
                control={control}
                name="images"
                {...{ required: "Al menos una foto es requerida" }}
                render={({ field }) => (
                  <>
                    <input
                      required
                      type="file"
                      accept="image/*"
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
