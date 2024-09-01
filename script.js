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
                                    <th style="padding: 8px; text-align: left;">Asignatura</th>
                                    <th style="padding: 8px; text-align: left;">Nota</th>
                                    <th style="padding: 8px; text-align: left;">÷</th>
                                    <th style="padding: 8px; text-align: left;">Preguntas</th>
                                    <th style="padding: 8px; text-align: left;">=</th>
                                    <th style="padding: 8px; text-align: left;">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Aritmética</td><td>${ARITMETICA}</td><td>÷</td><td>${Q_ARITMETICA}</td><td>=</td><td>${R_ARITMETICA}</td></tr>
                                <tr><td>Estadística</td><td>${ESTADISTICA}</td><td>÷</td><td>${Q_ESTADISTICA}</td><td>=</td><td>${R_ESTADISTICA}</td></tr>
                                <tr><td>Geometría</td><td>${GEOMETRIA}</td><td>÷</td><td>${Q_GEOMETRIA}</td><td>=</td><td>${R_GEOMETRIA}</td></tr>
                                <tr><td>Educación Física</td><td>${EDU_FISICA}</td><td>÷</td><td>${Q_EDUFISICA}</td><td>=</td><td>${R_EDUFISICA}</td></tr>
                                <tr><td>Inglés</td><td>${INGLES}</td><td>÷</td><td>${Q_INGLES}</td><td>=</td><td>${R_INGLES}</td></tr>
                                <tr><td>Ética</td><td>${ETICA}</td><td>÷</td><td>${Q_ETICA}</td><td>=</td><td>${R_ETICA}</td></tr>
                                <tr><td>Biología</td><td>${BIOLOGIA}</td><td>÷</td><td>${Q_BIOLOGIA}</td><td>=</td><td>${R_BIOLOGIA}</td></tr>
                                <tr><td>Física</td><td>${FISICA}</td><td>÷</td><td>${Q_FISICA}</td><td>=</td><td>${R_FISICA}</td></tr>
                                <tr><td>Química</td><td>${QUIMICA}</td><td>÷</td><td>${Q_QUIMICA}</td><td>=</td><td>${R_QUIMICA}</td></tr>
                                <tr><td>Informática</td><td>${INFORMATICA}</td><td>÷</td><td>${Q_INFORMATICA}</td><td>=</td><td>${R_INFORMATICA}</td></tr>
                                <tr><td>Historia</td><td>${HISTORIA}</td><td>÷</td><td>${Q_HISTORIA}</td><td>=</td><td>${R_HISTORIA}</td></tr>
                                <tr><td>Geografía</td><td>${GEOGRAFIA}</td><td>÷</td><td>${Q_GEOGRAFIA}</td><td>=</td><td>${R_GEOGRAFIA}</td></tr>
                                <tr><td>Constitución</td><td>${CONSTITUCION}</td><td>÷</td><td>${Q_CONSTITUCION}</td><td>=</td><td>${R_CONSTITUCION}</td></tr>
                                <tr><td>Filosofía</td><td>${FILOSOFIA}</td><td>÷</td><td>${Q_FILOSOFIA}</td><td>=</td><td>${R_FILOSOFIA}</td></tr>
                                <tr><td>Religión</td><td>${RELIGION}</td><td>÷</td><td>${Q_RELIGION}</td><td>=</td><td>${R_RELIGION}</td></tr>
                                <tr><td>Lengua Castellana</td><td>${LENGUACASTELLANA}</td><td>÷</td><td>${Q_LENGUACASTELLANA}</td><td>=</td><td>${R_LENGUACASTELLANA}</td></tr>
                                <tr><td>Lectura Crítica</td><td>${LECTURACRITICA}</td><td>÷</td><td>${Q_LECTURACRITICA}</td><td>=</td><td>${R_LECTURACRITICA}</td></tr>
                                <tr><td>Artística</td><td>${ARTISTICA}</td><td>÷</td><td>${Q_ARTISTICA}</td><td>=</td><td>${R_ARTISTICA}</td></tr>
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
            resultado.innerHTML = 'No se encontró el código en los datos.';
        }
    } catch (error) {
        console.error('Error al procesar el CSV:', error);
        resultado.innerHTML = 'Error al procesar los datos.';
    }
}
