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

        // Definir las asignaturas y sus campos
        const asignaturas = [
            { nombre: 'ARITMETICA', Q: 'Q_ARITMETICA', R: 'R_ARITMETICA' },
            { nombre: 'ESTADISTICA', Q: 'Q_ESTADISTICA', R: 'R_ESTADISTICA' },
            { nombre: 'GEOMETRIA', Q: 'Q_GEOMETRIA', R: 'R_GEOMETRIA' },
            // Añade más asignaturas aquí
        ];

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
                    // Construir la tabla con las notas
                    let tablaNotas = `
                        <table border="1" style="border-collapse: collapse; width: 100%;">
                            <thead>
                                <tr>
                                    <th style="padding: 8px; text-align: center;">Asignatura</th>
                                    <th style="padding: 8px; text-align: center;">Respuestas Correctas</th>
                                    <th style="padding: 8px; text-align: center;">Resultados</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    // Usar un bucle para añadir filas para cada asignatura
                    for (const asignatura of asignaturas) {
                        const valor = columns[columnMap[asignatura.nombre]];
                        const valorQ = columns[columnMap[asignatura.Q]];
                        const valorR = columns[columnMap[asignatura.R]];

                        tablaNotas += `
                            <tr>
                                <td style="padding: 8px;">${asignatura.nombre}</td>
                                <td style="padding: 8px;">
                                    <span style="font-size: 25px;">${valor}</span>
                                    /
                                    <span style="font-size: 15px;">${valorQ}</span>
                                </td>
                                <td style="padding: 8px;">${valorR}</td>
                            </tr>
                        `;
                    }

                    tablaNotas += `
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
