//Funcion para validar el form del login
function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("contraseña").value;
  const errorMessage = document.getElementById("errorMessage");

  if (email === "" || password === "") {
    errorMessage.textContent = "Por favor, complete ambos campos.";
    return false;
  }

  // Si la validación es exitosa, el formulario puede ser enviado.
  errorMessage.textContent = "";
  return true;
}

//Funcion para obtener datos de API
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contenedor = document.getElementById("contenedor");

let pagina = 1;

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`
    );
    

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      

      let peliculas = [];

      datos.results.forEach((pelicula) => {
        peliculas += `
            <div class="card pelicula" style="width: 20rem;">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title titulos">${pelicula.title} </h5>
                    <p class="card-text descripcion">${pelicula.overview} </p>
                </div>
            </div>
            `;
      });

      contenedor.innerHTML = peliculas;
    }
  } catch (error) {
    console.log(error.message);
  }
};

cargarPeliculas();
