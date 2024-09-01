// Función para cargar los años únicos desde el archivo CSV
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
            if (columns.length) {
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

// Función para cargar las pruebas según el año seleccionado
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
            if (columns.length) {
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

// Función para mostrar el campo de código cuando se selecciona una prueba
function mostrarCampoCodigo() {
    const prueba = document.getElementById('prueba').value;
    if (prueba) {
        document.getElementById('busqueda').style.display = 'block'; // Mostrar el campo de código
    }
}

// Función para buscar y mostrar los resultados del alumno
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
        const rows = data.split('\n');

        // Obtener los nombres de las columnas
        const header = rows.shift().split(',').map(col => col.trim()); // Obtener la primera fila como encabezado

        // Crear un mapa de nombres de columna a índices
        const columnMap = header.reduce((map, column, index) => {
            map[column] = index;
            return map;
        }, {});

        let encontrado = false;
        const asignaturas = ['ARITMETICA', 'ESTADISTICA', 'GEOMETRIA', "INGLES"]; // Añadir más asignaturas si es necesario
        const datosAsignaturas = [];

        for (const row of rows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns.length) {
                const ANIO = columns[columnMap['ANIO']];
                const PRUEBA = columns[columnMap['PRUEBA']];
                const ID = columns[columnMap['ID']];
                const NOMBRE = columns[columnMap['NOMBRE']];
                const SEDE = columns[columnMap['SEDE']];
                const GRADO = columns[columnMap['GRADO']];

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    asignaturas.forEach(asignatura => {
                        datosAsignaturas.push({
                            nombre: asignatura,
                            respuestasCorrectas: columns[columnMap[asignatura]],
                            cantidadPreguntas: columns[columnMap[`Q_${asignatura}`]],
                            resultado: columns[columnMap[`R_${asignatura}`]]
                        });
                    });

                    // Construir la tabla con las notas
                    const tablaNotas = `
                        <table border="1" style="border-collapse: collapse; width: 100%; font-size: 25px;"> <!-- Establece tamaño de letra general -->
                            <thead>
                                <tr>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Asignatura</th>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Respuestas Correctas</th>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Resultados</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${datosAsignaturas.map(asignatura => `
                                    <tr>
                                        <td style="padding: 8px; text-align: center; font-size: 18px">
                                            <div style="display: flex; flex-direction: column; align-items: center;">
                                                ${(() => {
                                                    const Icon = `${asignatura.nombre}.png`;                                        
                                                    return `<img 
                                                        src="${Icon}"
                                                        style="width: 50px; height: 50px;"
                                                        onerror="this.src='https://via.placeholder.com/60';"
                                                        alt="${asignatura.nombre}">`;
                                                })()}
                                                <span>${asignatura.nombre}</span>
                                            </div>
                                        </td>
                                        <td class="numero-font" style="padding: 8px;">
                                            <span>${asignatura.respuestasCorrectas}</span>
                                            <span style="font-size: 15px;"> / </span> 
                                            <span style="font-size: 15px;">${asignatura.cantidadPreguntas}</span>
                                        </td>
                                        <td class="numero-font" style="padding: 8px;">${asignatura.resultado}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;


                    resultado.innerHTML = 
                        <h1>Resultados</h1>
                        <div class="resultado-item">
                            <span style="color: orange;">Alumno: </span>
                            <span>${NOMBRE}</span>
                        </div>
                        <div class="resultado-item">
                            <span style="color: orange;">Sede: </span>
                            <span>${SEDE}</span>
                        </div>
                        <div class="resultado-item">
                            <span style="color: orange;">Grado: </span>
                            <span>${GRADO}</span>
                        </div>
                        <hr style="border: 3px solid red; margin: 20px 0; width: 100%;">
                        ${tablaNotas}
                    ;
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
        resultado.innerHTML = 'Hubo un error al procesar la solicitud.';
    }
}

// Inicializar el año al cargar la página
window.onload = () => {
    cargarAnios();

    document.getElementById('prueba').addEventListener('change', mostrarCampoCodigo);
};
