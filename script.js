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
                                    <th style="width: 12px; padding: 8px; text-align: center;"></th>
                                    <th style="width: 12px; padding: 8px; text-align: center;">Preguntas</th>
                                    <th style="width: 12px; padding: 8px; text-align: center;"></th>
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
                                    <td>÷</td>
                                    <td>${Q_ARITMETICA}</td>
                                    <td>=</td>
                                    <td>${R_ARITMETICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Estadística</td>
                                    <td>${ESTADISTICA}</td>
                                    <td>÷</td>
                                    <td>${Q_ESTADISTICA}</td>
                                    <td>=</td>
                                    <td>${R_ESTADISTICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Geometría</td>
                                    <td>${GEOMETRIA}</td>
                                    <td>÷</td>
                                    <td>${Q_GEOMETRIA}</td>
                                    <td>=</td>
                                    <td>${R_GEOMETRIA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Educación Física</td>
                                    <td>${EDU_FISICA}</td>
                                    <td>÷</td>
                                    <td>${Q_EDUFISICA}</td>
                                    <td>=</td>
                                    <td>${R_EDUFISICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Inglés</td>
                                    <td>${INGLES}</td>
                                    <td>÷</td>
                                    <td>${Q_INGLES}</td>
                                    <td>=</td>
                                    <td>${R_INGLES}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Ética</td>
                                    <td>${ETICA}</td>
                                    <td>÷</td>
                                    <td>${Q_ETICA}</td>
                                    <td>=</td>
                                    <td>${R_ETICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Biología</td>
                                    <td>${BIOLOGIA}</td>
                                    <td>÷</td>
                                    <td>${Q_BIOLOGIA}</td>
                                    <td>=</td>
                                    <td>${R_BIOLOGIA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Física</td>
                                    <td>${FISICA}</td>
                                    <td>÷</td>
                                    <td>${Q_FISICA}</td>
                                    <td>=</td>
                                    <td>${R_FISICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Química</td>
                                    <td>${QUIMICA}</td>
                                    <td>÷</td>
                                    <td>${Q_QUIMICA}</td>
                                    <td>=</td>
                                    <td>${R_QUIMICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Informática</td>
                                    <td>${INFORMATICA}</td>
                                    <td>÷</td>
                                    <td>${Q_INFORMATICA}</td>
                                    <td>=</td>
                                    <td>${R_INFORMATICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Historia</td>
                                    <td>${HISTORIA}</td>
                                    <td>÷</td>
                                    <td>${Q_HISTORIA}</td>
                                    <td>=</td>
                                    <td>${R_HISTORIA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Geografía</td>
                                    <td>${GEOGRAFIA}</td>
                                    <td>÷</td>
                                    <td>${Q_GEOGRAFIA}</td>
                                    <td>=</td>
                                    <td>${R_GEOGRAFIA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Constitución</td>
                                    <td>${CONSTITUCION}</td>
                                    <td>÷</td>
                                    <td>${Q_CONSTITUCION}</td>
                                    <td>=</td>
                                    <td>${R_CONSTITUCION}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Filosofía</td>
                                    <td>${FILOSOFIA}</td>
                                    <td>÷</td>
                                    <td>${Q_FILOSOFIA}</td>
                                    <td>=</td>
                                    <td>${R_FILOSOFIA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Religión</td>
                                    <td>${RELIGION}</td>
                                    <td>÷</td>
                                    <td>${Q_RELIGION}</td>
                                    <td>=</td>
                                    <td>${R_RELIGION}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Lengua Castellana</td>
                                    <td>${LENGUACASTELLANA}</td>
                                    <td>÷</td>
                                    <td>${Q_LENGUACASTELLANA}</td>
                                    <td>=</td>
                                    <td>${R_LENGUACASTELLANA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Lectura Crítica</td>
                                    <td>${LECTURACRITICA}</td>
                                    <td>÷</td>
                                    <td>${Q_LECTURACRITICA}</td>
                                    <td>=</td>
                                    <td>${R_LECTURACRITICA}</td>
                                </tr>
                                <tr style="height: 30px;">
                                    <td>Artística</td>
                                    <td>${ARTISTICA}</td>
                                    <td>÷</td>
                                    <td>${Q_ARTISTICA}</td>
                                    <td>=</td>
                                    <td>${R_ARTISTICA}</td>
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
