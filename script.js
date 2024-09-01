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
            const columns = row.split(',').map(col => col.trim());
            if (columns[0]) { // Asegurarse de que hay al menos una columna
                anios.add(columns[0]); // Asumir que la primera columna es ANIO
            }
        });

        const anoSelect = document.getElementById('ano');
        anoSelect.innerHTML = ''; // Limpiar opciones anteriores
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
            const columns = row.split(',').map(col => col.trim());
            if (columns[0] === anio) { // Asumir que la primera columna es ANIO
                pruebas.add(columns[1]); // Asumir que la segunda columna es PRUEBA
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
    document.getElementById('busqueda').style.display = prueba ? 'block' : 'none'; // Mostrar u ocultar el campo de código
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
        const header = rows.shift().split(',').map(col => col.trim());
        const columnMap = header.reduce((map, column, index) => {
            map[column] = index;
            return map;
        }, {});

        let encontrado = false;

        for (const row of rows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns.length) {
                const values = header.map(h => columns[columnMap[h]]);
                const [ANIO, PRUEBA, ID, NOMBRE, SEDE, GRADO, ARITMETICA, ESTADISTICA, GEOMETRIA, EDU_FISICA, INGLES, ETICA, BIOLOGIA, FISICA, QUIMICA, INFORMATICA, HISTORIA, GEOGRAFIA, CONSTITUCION, FILOSOFIA, RELIGION, LENGUACASTELLANA, LECTURACRITICA, ARTISTICA, Q_ARITMETICA, Q_ESTADISTICA, Q_GEOMETRIA, Q_EDUFISICA, Q_INGLES, Q_ETICA, Q_BIOLOGIA, Q_FISICA, Q_QUIMICA, Q_INFORMATICA, Q_HISTORIA, Q_GEOGRAFIA, Q_CONSTITUCION, Q_FILOSOFIA, Q_RELIGION, Q_LENGUACASTELLANA, Q_LECTURACRITICA, Q_ARTISTICA, R_ARITMETICA, R_ESTADISTICA, R_GEOMETRIA, R_EDUFISICA, R_INGLES, R_ETICA, R_BIOLOGIA, R_FISICA, R_QUIMICA, R_INFORMATICA, R_HISTORIA, R_GEOGRAFIA, R_CONSTITUCION, R_FILOSOFIA, R_RELIGION, R_LENGUACASTELLANA, R_LECTURACRITICA, R_ARTISTICA] = values;

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    // Construir la tabla con las notas
                    const tablaNotas = `
                        <table border="1" style="border-collapse: collapse; width: 100%;">
                            <thead>
                                <tr>
                                    <th style="padding: 8px; text-align: left;">Asignatura</th>
                                    <th style="padding: 8px; text-align: left;">Nota</th>
                                    <th style="padding: 8px; text-align: left;">Preguntas</th>
                                    <th style="padding: 8px; text-align: left;">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Aritmética</td><td>${ARITMETICA}</td><td>${Q_ARITMETICA}</td><td>${R_ARITMETICA}</td></tr>
                                <tr><td>Estadística</td><td>${ESTADISTICA}</td><td>${Q_ESTADISTICA}</td><td>${R_ESTADISTICA}</td></tr>
                                <tr><td>Geometría</td><td>${GEOMETRIA}</td><td>${Q_GEOMETRIA}</td><td>${R_GEOMETRIA}</td></tr>
                                <tr><td>Educación Física</td><td>${EDU_FISICA}</td><td>${Q_EDUFISICA}</td><td>${R_EDUFISICA}</td></tr>
                                <tr><td>Inglés</td><td>${INGLES}</td><td>${Q_INGLES}</td><td>${R_INGLES}</td></tr>
                                <tr><td>Ética</td><td>${ETICA}</td><td>${Q_ETICA}</td><td>${R_ETICA}</td></tr>
                                <tr><td>Biología</td><td>${BIOLOGIA}</td><td>${Q_BIOLOGIA}</td><td>${R_BIOLOGIA}</td></tr>
                                <tr><td>Física</td><td>${FISICA}</td><td>${Q_FISICA}</td><td>${R_FISICA}</td></tr>
                                <tr><td>Química</td><td>${QUIMICA}</td><td>${Q_QUIMICA}</td><td>${R_QUIMICA}</td></tr>
                                <tr><td>Informática</td><td>${INFORMATICA}</td><td>${Q_INFORMATICA}</td><td>${R_INFORMATICA}</td></tr>
                                <tr><td>Historia</td><td>${HISTORIA}</td><td>${Q_HISTORIA}</td><td>${R_HISTORIA}</td></tr>
                                <tr><td>Geografía</td><td>${GEOGRAFIA}</td><td>${Q_GEOGRAFIA}</td><td>${R_GEOGRAFIA}</td></tr>
                                <tr><td>Constitución</td><td>${CONSTITUCION}</td><td>${Q_CONSTITUCION}</td><td>${R_CONSTITUCION}</td></tr>
                                <tr><td>Filosofía</td><td>${FILOSOFIA}</td><td>${Q_FILOSOFIA}</td><td>${R_FILOSOFIA}</td></tr>
                                <tr><td>Religión</td><td>${RELIGION}</td><td>${Q_RELIGION}</td><td>${R_RELIGION}</td></tr>
                                <tr><td>Lengua Castellana</td><td>${LENGUACASTELLANA}</td><td>${Q_LENGUACASTELLANA}</td><td>${R_LENGUACASTELLANA}</td></tr>
                                <tr><td>Lectura Crítica</td><td>${LECTURACRITICA}</td><td>${Q_LECTURACRITICA}</td><td>${R_LECTURACRITICA}</td></tr>
                                <tr><td>Artística</td><td>${ARTISTICA}</td><td>${Q_ARTISTICA}</td><td>${R_ARTISTICA}</td></tr>
                            </tbody>
                        </table>
                    `;

                    resultado.innerHTML = tablaNotas;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.innerHTML = 'No se encontró el código ingresado para el año y prueba seleccionados.';
        }

    } catch (error) {
        console.error('Error al buscar los datos:', error);
    }
}
