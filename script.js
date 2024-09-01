async function cargarAniosYPruebas() {
    try {
        const response = await fetch('general.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo general: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        // Estructuras para almacenar años y pruebas únicos
        const anios = new Set();
        const pruebasPorAnio = {};

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 3) { // Verificar que al menos tenga 3 columnas
                const [ANIO, PRUEBA] = columns.slice(0, 2).map(col => col.trim());
                anios.add(ANIO);
                
                if (!pruebasPorAnio[ANIO]) {
                    pruebasPorAnio[ANIO] = new Set();
                }
                pruebasPorAnio[ANIO].add(PRUEBA);
            }
        });

        // Llenar selector de años
        const anoSelect = document.getElementById('ano');
        anios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            anoSelect.appendChild(option);
        });

        // Event listener para actualizar pruebas al cambiar de año
        anoSelect.addEventListener('change', () => {
            const selectedYear = anoSelect.value;
            const pruebaSelect = document.getElementById('prueba');
            pruebaSelect.innerHTML = '<option value="">Selecciona una prueba</option>'; // Limpiar opciones anteriores

            if (pruebasPorAnio[selectedYear]) {
                pruebasPorAnio[selectedYear].forEach(prueba => {
                    const option = document.createElement('option');
                    option.value = prueba;
                    option.textContent = prueba;
                    pruebaSelect.appendChild(option);
                });
            }

            document.getElementById('container-prueba').style.display = selectedYear ? 'block' : 'none';
        });

    } catch (error) {
        console.error('Error al cargar los años y pruebas:', error);
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
        // Buscar el archivo correspondiente en 'general.csv'
        const generalResponse = await fetch('general.csv');
        if (!generalResponse.ok) {
            throw new Error(`Error al cargar el archivo general: ${generalResponse.statusText}`);
        }
        const generalData = await generalResponse.text();
        const generalRows = generalData.split('\n').slice(1); // Saltar la cabecera

        let archivo = null;
        for (const row of generalRows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns[0] === anio && columns[1] === prueba) {
                archivo = columns[2]; // Asignar la columna ARCHIVO
                break;
            }
        }

        if (!archivo) {
            resultado.innerHTML = 'No se encontró el archivo correspondiente para la combinación de año y prueba seleccionada.';
            return;
        }

        // Realizar la búsqueda en el archivo correspondiente
        const response = await fetch(`${archivo}.csv`);
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo ${archivo}: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n');

        // Obtener los nombres de las columnas
        const header = rows.shift().split(',').map(col => col.trim());

        // Crear un mapa de nombres de columna a índices
        const columnMap = header.reduce((map, column, index) => {
            map[column] = index;
            return map;
        }, {});

        let encontrado = false;

        for (const row of rows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns.length) {
                const ID = columns[columnMap['ID']];
                const NOMBRE = columns[columnMap['NOMBRE']];
                const SEDE = columns[columnMap['SEDE']];
                const GRADO = columns[columnMap['GRADO']];
                const ARITMETICA = columns[columnMap['ARITMETICA']];
                const ESTADISTICA = columns[columnMap['ESTADISTICA']];
                const GEOMETRIA = columns[columnMap['GEOMETRIA']];
                const EDUFISICA = columns[columnMap['EDUFISICA']];
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

                if (ID === codigo) {
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
                                <tr><td>EDU. FISICA</td><td>${EDUFISICA}</td></tr>
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
                                <tr><td>LENGUA CASTELLANA</td><td>${LENGUACASTELLANA}</td></tr>
                                <tr><td>LECTURA CRITICA</td><td>${LECTURACRITICA}</td></tr>
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
                        <hr style="border: 3px solid red; margin: 20px 0;">
                        <h3>Notas</h3>
                        ${tablaNotas}
                    `;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.innerHTML = 'No se encontró el código en el archivo correspondiente.';
        }
    } catch (error) {
        console.error('Error al buscar el código:', error);
        resultado.innerHTML = 'Hubo un error al buscar el código.';
    }
}

// Llamar a la función para cargar los años y pruebas al inicio
document.addEventListener('DOMContentLoaded', cargarAniosYPruebas);
