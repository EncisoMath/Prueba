async function cargarAnios() {
    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        // Extraer años únicos
        const anios = new Set();
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 4) {
                const [ANIO] = columns.map(col => col.trim()); // Extraer el valor de ANIO
                anios.add(ANIO);
            }
        });

        const anoSelect = document.getElementById('ano');
        anios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            anoSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar los años:', error);
    }
}

async function cargarPruebas() {
    const anio = document.getElementById('ano').value;
    if (!anio) return;

    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        // Extraer pruebas para el año seleccionado
        const pruebas = new Set();
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 4) {
                const [ANIO, PRUEBA] = columns.map(col => col.trim()); // Extraer valores de ANIO y PRUEBA
                if (ANIO === anio) {
                    pruebas.add(PRUEBA);
                }
            }
        });

        const pruebaSelect = document.getElementById('prueba');
        pruebaSelect.innerHTML = '<option value="">Selecciona una prueba</option>'; // Limpiar opciones anteriores
        pruebas.forEach(prueba => {
            const option = document.createElement('option');
            option.value = prueba;
            option.textContent = prueba;
            pruebaSelect.appendChild(option);
        });

        document.getElementById('container-prueba').style.display = 'block'; // Mostrar el campo de prueba

    } catch (error) {
        console.error('Error al cargar las pruebas:', error);
    }
}

function mostrarCampoCodigo() {
    const prueba = document.getElementById('prueba').value;
    if (prueba) {
        document.getElementById('busqueda').style.display = 'block'; // Mostrar el campo de código
    }
}

async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');
    const anio = document.getElementById('ano').value;
    const prueba = document.getElementById('prueba').value;

    if (codigo.length !== 4) {
        resultado.innerHTML = 'Por favor, ingresa un código de 4 dígitos.';
        return;
    }

    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 4) { // Asegurarse de que hay suficientes columnas
                const [ANIO, PRUEBA, ID, NOTAFINAL, PROMEDIO] = columns.map(col => col.trim()); // Eliminar espacios en blanco

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    resultado.innerHTML = `
                        <h1>Resultados</h1>
                        <h2>Alumno: </h2>${NOMBRE}
                        <div class="resultado-item">
                            <span class="resultado-label">NOTA FINAL</span><br>
                            <img src="https://cdn-icons-png.flaticon.com/512/7426/7426821.png" alt="Nota Final" class="resultado-icon">
                            <div class="separador"></div>
                            <span class="resultado-dato">${NOTAFINAL}/100</span>
                        </div>
                        <div class="linea-separadora"></div>
                        <div class="resultado-item">
                            <span class="resultado-label">PROMEDIO</span><br>
                            <img src="https://cdn-icons-png.flaticon.com/512/5331/5331680.png" alt="Promedio" class="resultado-icon">
                            <div class="separador"></div>
                            <span class="resultado-dato">${PROMEDIO}/100</span>
                        </div>
                    `;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.innerHTML = 'Código no encontrado.';
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        resultado.innerHTML = 'Hubo un error al procesar la solicitud. 431';
    }
}

// Inicializar el año al cargar la página
window.onload = cargarAnios;
