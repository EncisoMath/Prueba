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
                // Obtener valores usando el mapa de columnas
                const ANIO = columns[columnMap['ANIO']];
                const PRUEBA = columns[columnMap['PRUEBA']];
                const ID = columns[columnMap['ID']];
                const NOMBRE = columns[columnMap['NOMBRE']];
                const SEDE = columns[columnMap['SEDE']];
                const GRADO = columns[columnMap['GRADO']];
                const ARITMETICA = columns[columnMap['ARITMETICA']];
                const ESTADISTICA = columns[columnMap['ESTADISTICA']];
                const GEOMETRIA = columns[columnMap['GEOMETRIA']];
                const EDU_FISICA = columns[columnMap['EDUFISICA']];
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
                
                // Obtener valores de cantidad de preguntas y resultados
                const Q_ARITMETICA = columns[columnMap['Q_ARITMETICA']];
                const Q_ESTADISTICA = columns[columnMap['Q_ESTADISTICA']];
                const Q_GEOMETRIA = columns[columnMap['Q_GEOMETRIA']];
                const Q_EDUFISICA = columns[columnMap['Q_EDUFISICA']];
                const Q_INGLES = columns[columnMap['Q_INGLES']];
                const Q_ETICA = columns[columnMap['Q_ETICA']];
                const Q_BIOLOGIA = columns[columnMap['Q_BIOLOGIA']];
                const Q_FISICA = columns[columnMap['Q_FISICA']];
                const Q_QUIMICA = columns[columnMap['Q_QUIMICA']];
                const Q_INFORMATICA = columns[columnMap['Q_INFORMATICA']];
                const Q_HISTORIA = columns[columnMap['Q_HISTORIA']];
                const Q_GEOGRAFIA = columns[columnMap['Q_GEOGRAFIA']];
                const Q_CONSTITUCION = columns[columnMap['Q_CONSTITUCION']];
                const Q_FILOSOFIA = columns[columnMap['Q_FILOSOFIA']];
                const Q_RELIGION = columns[columnMap['Q_RELIGION']];
                const Q_LENGUACASTELLANA = columns[columnMap['Q_LENGUACASTELLANA']];
                const Q_LECTURACRITICA = columns[columnMap['Q_LECTURACRITICA']];
                const Q_ARTISTICA = columns[columnMap['Q_ARTISTICA']];

                const R_ARITMETICA = columns[columnMap['R_ARITMETICA']];
                const R_ESTADISTICA = columns[columnMap['R_ESTADISTICA']];
                const R_GEOMETRIA = columns[columnMap['R_GEOMETRIA']];
                const R_EDUFISICA = columns[columnMap['R_EDUFISICA']];
                const R_INGLES = columns[columnMap['R_INGLES']];
                const R_ETICA = columns[columnMap['R_ETICA']];
                const R_BIOLOGIA = columns[columnMap['R_BIOLOGIA']];
                const R_FISICA = columns[columnMap['R_FISICA']];
                const R_QUIMICA = columns[columnMap['R_QUIMICA']];
                const R_INFORMATICA = columns[columnMap['R_INFORMATICA']];
                const R_HISTORIA = columns[columnMap['R_HISTORIA']];
                const R_GEOGRAFIA = columns[columnMap['R_GEOGRAFIA']];
                const R_CONSTITUCION = columns[columnMap['R_CONSTITUCION']];
                const R_FILOSOFIA = columns[columnMap['R_FILOSOFIA']];
                const R_RELIGION = columns[columnMap['R_RELIGION']];
                const R_LENGUACASTELLANA = columns[columnMap['R_LENGUACASTELLANA']];
                const R_LECTURACRITICA = columns[columnMap['R_LECTURACRITICA']];
                const R_ARTISTICA = columns[columnMap['R_ARTISTICA']];

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    // Construir la tabla con las notas
const tablaNotas = `
    <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="width: 20px; padding: 8px; text-align: center;">Asignatura</th>
                <th style="width: 12px; padding: 8px; text-align: center;">Respuestas Correctas</th>
                <th style="width: 12px; padding: 8px; text-align: center;">Resultado</th>
            </tr>
        </thead>
        <tbody>
            <tr style="height: 30px;">
                <td>Aritmética</td>
                <td>
                    <span style="font-size: 25px;">${ARITMETICA}</span> /
                    <span style="font-size: 12px;">${Q_ARITMETICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_ARITMETICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Estadística</td>
                <td>
                    <span style="font-size: 25px;">${ESTADISTICA}</span> /
                    <span style="font-size: 12px;">${Q_ESTADISTICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_ESTADISTICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Geometría</td>
                <td>
                    <span style="font-size: 25px;">${GEOMETRIA}</span> /
                    <span style="font-size: 12px;">${Q_GEOMETRIA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_GEOMETRIA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Educación Física</td>
                <td>
                    <span style="font-size: 25px;">${EDU_FISICA}</span> /
                    <span style="font-size: 12px;">${Q_EDUFISICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_EDUFISICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Inglés</td>
                <td>
                    <span style="font-size: 25px;">${INGLES}</span> /
                    <span style="font-size: 12px;">${Q_INGLES}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_INGLES}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Ética</td>
                <td>
                    <span style="font-size: 25px;">${ETICA}</span> /
                    <span style="font-size: 12px;">${Q_ETICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_ETICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Biología</td>
                <td>
                    <span style="font-size: 25px;">${BIOLOGIA}</span> /
                    <span style="font-size: 12px;">${Q_BIOLOGIA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_BIOLOGIA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Física</td>
                <td>
                    <span style="font-size: 25px;">${FISICA}</span> /
                    <span style="font-size: 12px;">${Q_FISICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_FISICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Química</td>
                <td>
                    <span style="font-size: 25px;">${QUIMICA}</span> /
                    <span style="font-size: 12px;">${Q_QUIMICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_QUIMICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Informática</td>
                <td>
                    <span style="font-size: 25px;">${INFORMATICA}</span> /
                    <span style="font-size: 12px;">${Q_INFORMATICA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_INFORMATICA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Historia</td>
                <td>
                    <span style="font-size: 25px;">${HISTORIA}</span> /
                    <span style="font-size: 12px;">${Q_HISTORIA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_HISTORIA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Geografía</td>
                <td>
                    <span style="font-size: 25px;">${GEOGRAFIA}</span> /
                    <span style="font-size: 12px;">${Q_GEOGRAFIA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_GEOGRAFIA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Constitución</td>
                <td>
                    <span style="font-size: 25px;">${CONSTITUCION}</span> /
                    <span style="font-size: 12px;">${Q_CONSTITUCION}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_CONSTITUCION}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Filosofía</td>
                <td>
                    <span style="font-size: 25px;">${FILOSOFIA}</span> /
                    <span style="font-size: 12px;">${Q_FILOSOFIA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_FILOSOFIA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Religión</td>
                <td>
                    <span style="font-size: 25px;">${RELIGION}</span> /
                    <span style="font-size: 12px;">${Q_RELIGION}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_RELIGION}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Lengua Castellana</td>
                <td>
                    <span style="font-size: 25px;">${LENGUACASTELLANA}</span> /
                    <span style="font-size: 12px;">${Q_LENGUACASTELLANA}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_LENGUACASTELLANA}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
            <tr style="height: 30px;">
                <td>Matemáticas</td>
                <td>
                    <span style="font-size: 25px;">${MATEMATICAS}</span> /
                    <span style="font-size: 12px;">${Q_MATEMATICAS}</span>
                </td>
                <td>
                    <span style="font-size: 25px;">${R_MATEMATICAS}</span> /
                    <span style="font-size: 12px;">10</span>
                </td>
            </tr>
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
            resultado.innerHTML = 'No se encontraron resultados.';
        }

    } catch (error) {
        console.error('Error al buscar el código:', error);
    }
}

// Cargar años al inicio
document.addEventListener('DOMContentLoaded', cargarAnios);

// Manejar cambio de selección de año
document.getElementById('ano').addEventListener('change', cargarPruebas);

// Manejar cambio de selección de prueba
document.getElementById('prueba').addEventListener('change', mostrarCampoCodigo);

// Manejar búsqueda
document.getElementById('buscar').addEventListener('click', buscar);
