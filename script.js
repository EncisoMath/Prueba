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
        const asignaturas = ['ARITMETICA', 'ESTADISTICA', 'GEOMETRIA', "EDUFISICA", "INGLES", "ETICA", "BIOLOGIA", "FISICA", "QUIMICA", "RELIGION", "FILOSOFIA", "CONSTITUCION", "HISTORIA", "GEOGRAFIA", "INFORMATICA", "LENGUACASTELLANA", "LECTURACRITICA", "ARTISTICA"]; // Añadir más asignaturas si es necesario
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
                        <table border="1" style="border-collapse: collapse; width: 100%; font-size: 25px;">
                            <thead>
                                <tr>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Asignatura</th>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Aciertos</th>
                                    <th style="padding: 8px; text-align: center; font-size: 25px">Puntaje</th>
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

                    // Mostrar el mensaje y la imagen del examen
                    const imagenExamen = `
                        <h2>Aquí está tu examen</h2>
                        <img src="${codigo}.jpg" onerror="this.onerror=null; this.src='${codigo}.png';" alt="Examen ${codigo}" style="width: 100%; max-width: 600px; height: auto;">
                    `;

                    resultado.innerHTML = `
                        <h1>Resultados</h1>
                        <div class="resultados-container">
                            <!-- Bloque izquierdo -->
                            <div class="resultado-left">
                                <div class="resultado-item">
                                    <span class="bold-font" style="color: orange;font-size: 22px;">Alumno: </span>
                                    <span>${NOMBRE}</span>
                                </div>
                                <div class="resultado-item">
                                    <span class="bold-font" style="color: orange;font-size: 22px;">Grado y Sede: </span>
                                    <span>${GRADO} ${SEDE}</span>
                                </div>
                            </div>
                    
                            <!-- Bloque derecho -->
                            <div class="resultado-right">
                                <div class="bold-font" style="color: orange; font-size: 35px; margin-top: 0;">Ranking</div>
                                <div class="bold-font" style="font-size: 32px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                                    <img src="RANKING.png" style="width: 35px; height: 35px;">
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                        <hr class="linea-separadora">
                        <div class="tabla-notas">
                            ${tablaNotas}
                        </div>
                        ${imagenExamen}
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
