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
        const rows = data.split('\n');

        // Obtener los nombres de las columnas
        const header = rows.shift().split(',').map(col => col.trim()); // Obtener la primera fila como encabezado

        // Crear un mapa de nombres de columna a índices
        const columnMap = header.reduce((map, column, index) => {
            map[column] = index;
            return map;
        }, {});

        let encontrado = false;

        for (const row of rows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns.length) {
                const ANIO = columns[columnMap['ANIO']];
                const PRUEBA = columns[columnMap['PRUEBA']];
                const ID = columns[columnMap['ID']];
                const NOMBRE = columns[columnMap['NOMBRE']];
                const SEDE = columns[columnMap['SEDE']];
                const GRADO = columns[columnMap['GRADO']];
                const ARITMETICA = columns[columnMap['ARITMETICA']];
                const ESTADISTICA = columns[columnMap['ESTADISTICA']];
                const GEOMETRIA = columns[columnMap['GEOMETRIA']];
                const EDU_FISICA = columns[columnMap['EDU. FISICA']];
                const INGLES = columns[columnMap['INGLES']];
                const ETICA = columns[columnMap['ETICA']];
                const BIOLOGIA = columns[columnMap['BIOLOGIA']];
                const FISICA = columns[columnMap['FISICA']];
                const QUIMICA = columns[columnMap['QUIMICA']];
                const INFORMATICA = columns[columnMap['INFORMATICA']];
                const HISTORIA = columns[columnMap['HISTORIA']];
                const GEOGRAFIA = columns[columnMap['GEOGRAFIA']];
                const CONSTITUCION = columns[columnMap['CONSTITUCION']];
                const FILOSOFIA = columns[columnMap['FILOSOFIA']];
                const RELIGION = columns[columnMap['RELIGION']];
                const LENGUACASTELLANA = columns[columnMap['LENGUACASTELLANA']];
                const LECTURACRITICA = columns[columnMap['LECTURACRITICA']];
                const ARTISTICA = columns[columnMap['ARTISTICA']];

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    // Construir la tabla con las notas
                    const tablaNotas = `
                        <table border="1" style="border-collapse: collapse; width: 100%;">
                            <thead>
                                <tr>
                                    <th style="padding: 8px; text-align: left;">Asignatura</th>
                                    <th style="padding: 8px; text-align: left;">Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>ARITMETICA</td><td>${ARITMETICA}</td></tr>
                                <tr><td>ESTADISTICA</td><td>${ESTADISTICA}</td></tr>
                                <tr><td>GEOMETRIA</td><td>${GEOMETRIA}</td></tr>
                                <tr><td>EDU. FISICA</td><td>${EDU_FISICA}</td></tr>
                                <tr><td>INGLES</td><td>${INGLES}</td></tr>
                                <tr><td>ETICA</td><td>${ETICA}</td></tr>
                                <tr><td>BIOLOGIA</td><td>${BIOLOGIA}</td></tr>
                                <tr><td>FISICA</td><td>${FISICA}</td></tr>
                                <tr><td>QUIMICA</td><td>${QUIMICA}</td></tr>
                                <tr><td>INFORMATICA</td><td>${INFORMATICA}</td></tr>
                                <tr><td>HISTORIA</td><td>${HISTORIA}</td></tr>
                                <tr><td>GEOGRAFIA</td><td>${GEOGRAFIA}</td></tr>
                                <tr><td>CONSTITUCION</td><td>${CONSTITUCION}</td></tr>
                                <tr><td>FILOSOFIA</td><td>${FILOSOFIA}</td></tr>
                                <tr><td>RELIGION</td><td>${RELIGION}</td></tr>
                                <tr><td>LENGUACASTELLANA</td><td>${LENGUACASTELLANA}</td></tr>
                                <tr><td>LECTURACRITICA</td><td>${LECTURACRITICA}</td></tr>
                                <tr><td>ARTISTICA</td><td>${ARTISTICA}</td></tr>
                            </tbody>
                        </table>
                    `;

                    resultado.innerHTML = `
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
        resultado.innerHTML = 'Hubo un error al procesar la solicitud.';
    }
}

// Inicializar el año al cargar la página
window.onload = cargarAnios;
