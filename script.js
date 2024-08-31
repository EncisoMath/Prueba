async function cargarAno() {
    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        const anoSelect = document.getElementById('ano');
        const anios = new Set();

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 2) {  // Asegurarse de que hay suficientes columnas
                const anio = columns[0].trim(); // Leer el valor de ANIO
                anios.add(anio);
            }
        }

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
    const pruebaSelect = document.getElementById('prueba');
    pruebaSelect.innerHTML = '<option value="">Selecciona una prueba</option>'; // Resetear opciones

    if (!anio) {
        document.getElementById('container-prueba').style.display = 'none';
        document.getElementById('busqueda').style.display = 'none';
        return;
    }

    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        const pruebas = new Set();

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 3) {  // Asegurarse de que hay suficientes columnas
                const anioRow = columns[0].trim(); // Leer el valor de ANIO
                const prueba = columns[1].trim(); // Leer el valor de PRUEBA
                if (anioRow === anio) {
                    pruebas.add(prueba);
                }
            }
        }

        pruebas.forEach(prueba => {
            const option = document.createElement('option');
            option.value = prueba;
            option.textContent = prueba;
            pruebaSelect.appendChild(option);
        });

        document.getElementById('container-prueba').style.display = 'block';
    } catch (error) {
        console.error('Error al cargar las pruebas:', error);
    }
}

function mostrarCampoCodigo() {
    const prueba = document.getElementById('prueba').value;
    if (prueba) {
        document.getElementById('busqueda').style.display = 'block';
    } else {
        document.getElementById('busqueda').style.display = 'none';
    }
}

async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');

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
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        // Depuración: Verificar qué se está leyendo del CSV
        console.log('Contenido del CSV:', rows);

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 4) {  // Asegurarse de que hay suficientes columnas
                const [anioRow, pruebaRow, LLAVE, NOTAFINAL, PROMEDIO] = columns.map(col => col.trim()); // Eliminar espacios en blanco

                if (LLAVE === codigo) {
                    resultado.innerHTML = `
                        <img src="https://cdn-icons-png.flaticon.com/512/7426/7426821.png" alt="Nota Final" style="width: 20px; height: 20px; vertical-align: middle;"> 
                        NOTA FINAL: ${NOTAFINAL} <br>
                        <img src="https://cdn-icons-png.flaticon.com/512/5331/5331680.png" alt="Promedio" style="width: 20px; height: 20px; vertical-align: middle;"> 
                        PROMEDIO: ${PROMEDIO} <br>
                        <img src="https://cdn-icons-png.flaticon.com/512/7426/7426821.png" alt="Nota Final" style="width: 20px; height: 20px; vertical-align: middle;"> 
                        NOTA FINAL: ${NOTAFINAL} <br>
                        <img src="https://cdn-icons-png.flaticon.com/512/5331/5331680.png" alt="Promedio" style="width: 20px; height: 20px; vertical-align: middle;"> 
                        PROMEDIO: ${PROMEDIO}
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
        resultado.innerHTML = 'Hubo un error al procesar la solicitud. 431';
    }
}

// Inicializar el selector de años al cargar la página
document.addEventListener('DOMContentLoaded', cargarAno);
