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
                                    <th style="padding: 8px; text-align: center; font-size: 18px;">Asignatura</th>
                                    <th style="padding: 8px; text-align: center; font-size: 18px;">Nota</th>
                                    <th style="padding: 8px; text-align: center; font-size: 18px;">Preguntas</th>
                                    <th style="padding: 8px; text-align: center; font-size: 18px;">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td style="text-align: center;">Aritmética</td><td style="text-align: center;">${ARITMETICA}</td><td style="text-align: center;">${Q_ARITMETICA}</td><td style="text-align: center;">${R_ARITMETICA}</td></tr>
                                <tr><td style="text-align: center;">Estadística</td><td style="text-align: center;">${ESTADISTICA}</td><td style="text-align: center;">${Q_ESTADISTICA}</td><td style="text-align: center;">${R_ESTADISTICA}</td></tr>
                                <tr><td style="text-align: center;">Geometría</td><td style="text-align: center;">${GEOMETRIA}</td><td style="text-align: center;">${Q_GEOMETRIA}</td><td style="text-align: center;">${R_GEOMETRIA}</td></tr>
                                <tr><td style="text-align: center;">Educación Física</td><td style="text-align: center;">${EDU_FISICA}</td><td style="text-align: center;">${Q_EDUFISICA}</td><td style="text-align: center;">${R_EDUFISICA}</td></tr>
                                <tr><td style="text-align: center;">Inglés</td><td style="text-align: center;">${INGLES}</td><td style="text-align: center;">${Q_INGLES}</td><td style="text-align: center;">${R_INGLES}</td></tr>
                                <tr><td style="text-align: center;">Ética</td><td style="text-align: center;">${ETICA}</td><td style="text-align: center;">${Q_ETICA}</td><td style="text-align: center;">${R_ETICA}</td></tr>
                                <tr><td style="text-align: center;">Biología</td><td style="text-align: center;">${BIOLOGIA}</td><td style="text-align: center;">${Q_BIOLOGIA}</td><td style="text-align: center;">${R_BIOLOGIA}</td></tr>
                                <tr><td style="text-align: center;">Física</td><td style="text-align: center;">${FISICA}</td><td style="text-align: center;">${Q_FISICA}</td><td style="text-align: center;">${R_FISICA}</td></tr>
                                <tr><td style="text-align: center;">Química</td><td style="text-align: center;">${QUIMICA}</td><td style="text-align: center;">${Q_QUIMICA}</td><td style="text-align: center;">${R_QUIMICA}</td></tr>
                                <tr><td style="text-align: center;">Informática</td><td style="text-align: center;">${INFORMATICA}</td><td style="text-align: center;">${Q_INFORMATICA}</td><td style="text-align: center;">${R_INFORMATICA}</td></tr>
                                <tr><td style="text-align: center;">Historia</td><td style="text-align: center;">${HISTORIA}</td><td style="text-align: center;">${Q_HISTORIA}</td><td style="text-align: center;">${R_HISTORIA}</td></tr>
                                <tr><td style="text-align: center;">Geografía</td><td style="text-align: center;">${GEOGRAFIA}</td><td style="text-align: center;">${Q_GEOGRAFIA}</td><td style="text-align: center;">${R_GEOGRAFIA}</td></tr>
                                <tr><td style="text-align: center;">Constitución</td><td style="text-align: center;">${CONSTITUCION}</td><td style="text-align: center;">${Q_CONSTITUCION}</td><td style="text-align: center;">${R_CONSTITUCION}</td></tr>
                                <tr><td style="text-align: center;">Filosofía</td><td style="text-align: center;">${FILOSOFIA}</td><td style="text-align: center;">${Q_FILOSOFIA}</td><td style="text-align: center;">${R_FILOSOFIA}</td></tr>
                                <tr><td style="text-align: center;">Religión</td><td style="text-align: center;">${RELIGION}</td><td style="text-align: center;">${Q_RELIGION}</td><td style="text-align: center;">${R_RELIGION}</td></tr>
                                <tr><td style="text-align: center;">Lengua Castellana</td><td style="text-align: center;">${LENGUACASTELLANA}</td><td style="text-align: center;">${Q_LENGUACASTELLANA}</td><td style="text-align: center;">${R_LENGUACASTELLANA}</td></tr>
                                <tr><td style="text-align: center;">Lectura Crítica</td><td style="text-align: center;">${LECTURACRITICA}</td><td style="text-align: center;">${Q_LECTURACRITICA}</td><td style="text-align: center;">${R_LECTURACRITICA}</td></tr>
                                <tr><td style="text-align: center;">Artística</td><td style="text-align: center;">${ARTISTICA}</td><td style="text-align: center;">${Q_ARTISTICA}</td><td style="text-align: center;">${R_ARTISTICA}</td></tr>
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
